import { User } from "@prisma/client";
import { ErrorCode } from "../../common/enums/error-code.enum";
import { LoginDto, RegisterDto } from "../../common/interface/authDto";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import {
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
} from "../../common/utils/date-time";
import { UserService } from "../user/user.service";
import { VerificationCodeService } from "../verificationCode/verificationCode.service";
import { SessionService } from "../session/session.service";
import {
  config,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "../../config/app.config";
import {
  refreshTokenSignOptions,
  RefreshTPayload,
  signJwtToken,
  verifiyJwtToken,
} from "../../common/utils/jwt";
import { VerficationEnum } from "@prisma/client";

export class AuthService {
  private userService: UserService;
  private verificationCodeService: VerificationCodeService;
  private sessionService: SessionService;

  constructor(
    userService: UserService,
    verificationCodeService: VerificationCodeService,
    sessionService: SessionService
  ) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.verificationCodeService = verificationCodeService;
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

    // Create user (password is hashed in the service)
    const newUser = await this.userService.createUser(registerData);

    const userId = newUser.id;

    // Create a verification token

    const verificationCode =
      await this.verificationCodeService.createVerificationCode({
        userId,
        type: "EMAIL_VERIFICATION",
        expiresAt: fortyFiveMinutesFromNow(),
      });

    // Send the verification email link

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

    //#TODO: Delete the verification code
    //#TODO: Return updatedUser
  }
}
