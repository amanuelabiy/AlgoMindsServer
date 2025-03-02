import { User } from "@prisma/client";
import { ErrorCode } from "../../common/enums/error-code.enum";
import {
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "../../common/interface/authDto";
import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import {
  anHourFromNow,
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
  threeMinutesAgo,
} from "../../common/utils/date-time";
import { UserService } from "../user/user.service";
import { VerificationCodeService } from "../verificationCode/verificationCode.service";
import { SessionService } from "../session/session.service";
import { config, JWT_REFRESH_EXPIRES_IN } from "../../config/app.config";
import {
  refreshTokenSignOptions,
  RefreshTPayload,
  signJwtToken,
  verifiyJwtToken,
} from "../../common/utils/jwt";
import { VerficationEnum } from "@prisma/client";
import { sendEmail } from "../../mailers/mailer";
import {
  passwordResetTemplate,
  verifyEmailTemplate,
} from "../../mailers/templates/templates";
import { WaitListService } from "../waitlist/waitlist.service";
import generateSixDigitCode from "../../common/utils/generateSixDigitCode";

export class AuthService {
  private userService: UserService;
  private verificationCodeService: VerificationCodeService;
  private sessionService: SessionService;
  private waitListService: WaitListService;

  constructor(
    userService: UserService,
    verificationCodeService: VerificationCodeService,
    sessionService: SessionService,
    waitListService: WaitListService
  ) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.verificationCodeService = verificationCodeService;
    this.waitListService = waitListService;
  }

  public async register(registerData: RegisterDto): Promise<{ user: User }> {
    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(registerData.email);

    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    // Check if the username is already taken
    const userNameMatch = await this.userService.findByUsername(
      registerData.username
    );

    if (userNameMatch) {
      throw new BadRequestException(
        "Username is already taken",
        ErrorCode.AUTH_USERNAME_ALREADY_EXISTS
      );
    }

    // Check if the email is claimed by a waitlist user
    const waitListUser = await this.waitListService.findWaitListEmail(
      registerData.email
    );

    if (waitListUser) {
      throw new BadRequestException(
        "Email is already claimed by a waitlist user",
        ErrorCode.WAITLIST_EMAIL_ALREADY_EXISTS
      );
    }

    // Create user (password is hashed in the service)
    const newUser = await this.userService.createUser(registerData);

    const userId = newUser.id;

    // Create a verification token

    const verificationCode =
      await this.verificationCodeService.createVerificationCode({
        userId,
        type: VerficationEnum.EMAIL_VERIFICATION,
        expiresAt: fortyFiveMinutesFromNow(),
      });

    // Send the verification email link
    const verificationUrl = `${config.APP_ORIGIN}/confirm-account?code=${verificationCode.id}`;
    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verificationUrl),
    });

    return {
      user: newUser,
    };
  }

  public async login(loginData: LoginDto) {
    const { email, password, userAgent } = loginData;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const isPasswordValid = await this.userService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    //TODO: Check if the user enable 2fa return user= null
    const userWithPreferences =
      await this.userService.getUserWithPreferencesById(user.id);
    if (userWithPreferences?.userPreferences?.enable2FA) {
      return {
        user: null,
        mfaRequired: true,
        accessToken: "",
        refreshToken: "",
      };
    }

    const session = await this.sessionService.createSession({
      userId: user.id,
      userAgent,
    });

    // Using default accessTokenSignOptions
    const accessToken = signJwtToken({
      userId: user.id,
      sessionId: session.id,
    });

    const refreshToken = signJwtToken(
      {
        sessionId: session.id,
      },
      refreshTokenSignOptions
    );

    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false,
    };
  }

  public async refreshToken(refreshToken: string) {
    const { payload } = verifiyJwtToken<RefreshTPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    if (!payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const session = await this.sessionService.findBySessionId(
      payload.sessionId
    );

    const now = Date.now();

    if (!session) {
      throw new UnauthorizedException("Session does not exist");
    }

    if (session.expiresAt.getTime() <= now) {
      throw new UnauthorizedException("Session has expired");
    }

    const sessionRequireRefresh =
      session.expiresAt.getTime() - now <= ONE_DAY_IN_MS;

    if (sessionRequireRefresh) {
      const newExpiresAt = calculateExpirationDate(JWT_REFRESH_EXPIRES_IN);
      await this.sessionService.updateExpiresAtById(session.id, newExpiresAt);
    }

    const newRefreshToken = sessionRequireRefresh
      ? signJwtToken(
          {
            sessionId: session.id,
          },
          refreshTokenSignOptions
        )
      : undefined;

    const accessToken = signJwtToken({
      userId: session.userId,
      sessionId: session.id,
    });

    return { accessToken, newRefreshToken };
  }

  public async verifyEmail(code: string) {
    const validCode = await this.verificationCodeService.findByCodeAndType({
      id: code,
      type: VerficationEnum.EMAIL_VERIFICATION,
      expiresAt: new Date(),
    });

    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }

    const user = await this.userService.findById(validCode.userId);

    if (!user) {
      throw new BadRequestException(
        "Unable to verify email address",
        ErrorCode.VALIDATION_ERROR
      );
    }

    const updatedUser = await this.userService.findByIdAndUpdate({
      id: validCode.userId,
      data: { isEmailVerified: true },
    });

    // This should not get hit, but just in case since prisma throws its own exception if the user is not found when trying to update
    if (!updatedUser) {
      throw new BadRequestException(
        "Unable to verify email address",
        ErrorCode.VALIDATION_ERROR
      );
    }

    // Delete the verification code
    await this.verificationCodeService.deleteVerificationCodeById(validCode.id);

    // Add User to the WaitList

    const waitListData = await this.waitListService.addToWaitList(
      updatedUser.email,
      updatedUser.email
    );

    // return updated user

    return {
      user: updatedUser,
      waitListData,
    };
  }

  public async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return;
    }

    // check mail rate limit is 2 emails per 3 or 10 minutes

    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;

    const count = await this.verificationCodeService.countRecentCodes({
      userId: user.id,
      type: VerficationEnum.PASSWORD_RESET,
      timeAgo,
    });

    if (count >= maxAttempts) {
      return;
    }

    const expiresAt = anHourFromNow();

    const validCode =
      await this.verificationCodeService.createPasswordResetVerificationCode({
        userId: user.id,
        type: VerficationEnum.PASSWORD_RESET,
        code: generateSixDigitCode(),
        expiresAt,
      });

    if (!validCode.code) {
      return;
    }

    const { data, error } = await sendEmail({
      to: user.email,
      ...passwordResetTemplate(validCode.code),
    });

    if (!data?.id) {
      throw new InternalServerException(`${error?.name} ${error?.message}`);
    }

    return {
      emailId: data.id,
    };
  }

  public async resendVerificationEmail(code: string) {
    const validCode = await this.verificationCodeService.findByIdAndType({
      id: code,
      type: VerficationEnum.EMAIL_VERIFICATION,
    });

    if (!validCode) {
      throw new NotFoundException("Invalid verification code");
    }

    const user = await this.userService.findById(validCode.userId);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    // check mail rate limit is 2 emails per 3 or 10 minutes

    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;

    const count = await this.verificationCodeService.countRecentCodes({
      userId: user.id,
      type: VerficationEnum.EMAIL_VERIFICATION,
      timeAgo,
    });

    if (count >= maxAttempts) {
      throw new BadRequestException("Too many requests");
    }

    // Delete the verification code
    await this.verificationCodeService.deleteVerificationCodeById(validCode.id);

    // Create a verification token

    const verificationCode =
      await this.verificationCodeService.createVerificationCode({
        userId: user.id,
        type: VerficationEnum.EMAIL_VERIFICATION,
        expiresAt: fortyFiveMinutesFromNow(),
      });

    // Send the verification email link

    const verificationUrl = `${config.APP_ORIGIN}/confirm-account?code=${verificationCode.id}`;
    await sendEmail({
      to: user.email,
      ...verifyEmailTemplate(verificationUrl),
    });

    return {
      message: "Verification email sent successfully",
    };
  }

  public async resetPassword({ password, verificationCode }: ResetPasswordDto) {
    const validCode =
      await this.verificationCodeService.findPasswordResetVerification({
        code: verificationCode,
        type: VerficationEnum.PASSWORD_RESET,
        expiresAt: new Date(),
      });

    if (!validCode) {
      throw new NotFoundException("Invalid or expired verification code");
    }

    const user = await this.userService.findById(validCode.userId);

    if (!user) {
      throw new BadRequestException("Failed to reset password");
    }

    const isPasswordCurrentPassword = await this.userService.comparePassword(
      password,
      user.password
    );

    if (isPasswordCurrentPassword) {
      throw new BadRequestException(
        "Your new password must be different from your current password."
      );
    }

    const saltRounds = 10;
    const hashedPassword = await this.userService.hashPassword(
      password,
      saltRounds
    );

    const updatedUser = await this.userService.findByIdAndUpdate({
      id: validCode.userId,
      data: { password: hashedPassword },
    });

    if (!updatedUser) {
      throw new BadRequestException("Failed to reset password");
    }

    // Delete the verification code
    await this.verificationCodeService.deleteVerificationCodeById(validCode.id);

    // Delete all sessions for the user
    await this.sessionService.deleteManySessionsByUserId(validCode.userId);

    return {
      user: updatedUser,
    };
  }

  public async logout(sessionId: string) {
    return await this.sessionService.deleteSessionById(sessionId);
  }
}
