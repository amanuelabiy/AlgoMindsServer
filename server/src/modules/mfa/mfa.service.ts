import { Request } from "express";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { UserService } from "../user/user.service";
import { config } from "../../config/app.config";
import { refreshTokenSignOptions, signJwtToken } from "../../common/utils/jwt";
import { SessionService } from "../session/session.service";

export class MfaService {
  private readonly userService: UserService;
  private readonly sessionService: SessionService;

  constructor(userService: UserService, sessionService: SessionService) {
    this.userService = userService;
    this.sessionService = sessionService;
  }

  public async generateMFASetup(req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("User not authorized");
    }

    const userWithPreferences =
      await this.userService.getUserWithPreferencesById(user.id);

    if (!userWithPreferences || !userWithPreferences.userPreferences) {
      throw new NotFoundException("User preferences not found");
    }

    if (userWithPreferences.userPreferences.enable2FA) {
      return {
        message: "2FA already enabled",
      };
    }

    let secretKey = userWithPreferences.userPreferences.twoFactorSecret;

    if (!secretKey) {
      // If the user does not have a secret key, generate one
      const secret = speakeasy.generateSecret({
        name: config.APPLICATION_NAME || "AlgoRivals",
      });
      secretKey = secret.base32;
      // Update the user's preferences with the secret key
      userWithPreferences.userPreferences.twoFactorSecret = secretKey;
      await this.userService.updateUserPreferencesByUserId({
        userId: user.id,
        data: {
          twoFactorSecret: secretKey,
        },
      });
    }

    const url = speakeasy.otpauthURL({
      secret: secretKey,
      label: `${user.email}`,
      issuer: config.APPLICATION_NAME || "AlgoRivals",
      encoding: "base32",
    });

    const qrImageUrl = await qrcode.toDataURL(url);

    return {
      message: "Scan the QR code or use the setup key",
      secret: secretKey,
      qrImageUrl,
    };
  }

  public async verifyMFASetup(req: Request, code: string, secretKey: string) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("User not authorized");
    }

    const userWithPreferences =
      await this.userService.getUserWithPreferencesById(user.id);

    if (!userWithPreferences || !userWithPreferences.userPreferences) {
      throw new NotFoundException("User preferences not found");
    }

    if (userWithPreferences.userPreferences.enable2FA) {
      return {
        message: "MFA already enabled",
        userPrefrences: {
          enable2FA: userWithPreferences.userPreferences.enable2FA,
        },
      };
    }

    const isValid = speakeasy.totp.verify({
      secret: secretKey,
      encoding: "base32",
      token: code,
    });

    if (!isValid) {
      throw new BadRequestException("Invalid MFA code. Please try again.");
    }

    // Update the user's preferences to enable 2FA
    userWithPreferences.userPreferences.enable2FA = true;
    await this.userService.updateUserPreferencesByUserId({
      userId: user.id,
      data: {
        enable2FA: true,
      },
    });

    return {
      message: "MFA setup completed successfully",
      userPreferences: {
        enable2FA: userWithPreferences.userPreferences.enable2FA,
      },
    };
  }

  public async revokeMFA(req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("User not authorized");
    }

    const userWithPreferences =
      await this.userService.getUserWithPreferencesById(user.id);

    if (!userWithPreferences || !userWithPreferences.userPreferences) {
      throw new NotFoundException("User preferences not found");
    }

    if (!userWithPreferences.userPreferences.enable2FA) {
      return {
        message: "MFA is not enabled",
        userPreferences: {
          enable2FA: userWithPreferences.userPreferences.enable2FA,
        },
      };
    }

    // Update the user's preferences to disable 2FA

    const updatedUsersPreferences =
      await this.userService.updateUserPreferencesByUserId({
        userId: user.id,
        data: {
          twoFactorSecret: null,
          enable2FA: false,
        },
      });

    return {
      message: "MFA revoked successfully",
      userPreferences: {
        enable2FA: updatedUsersPreferences.enable2FA,
      },
    };
  }

  public async verifyMFAForLogin(
    code: string,
    email: string,
    userAgent: string | undefined
  ) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const userWithPreferences =
      await this.userService.getUserWithPreferencesById(user.id);

    if (!userWithPreferences || !userWithPreferences.userPreferences) {
      throw new NotFoundException("User preferences not found");
    }

    if (
      !userWithPreferences.userPreferences.enable2FA &&
      !userWithPreferences.userPreferences.twoFactorSecret
    ) {
      throw new UnauthorizedException("MFA not enabled for this user");
    }

    const isValid = speakeasy.totp.verify({
      secret: userWithPreferences.userPreferences.twoFactorSecret!,
      encoding: "base32",
      token: code,
    });

    if (!isValid) {
      throw new BadRequestException("Invalid MFA code. Please try again.");
    }

    // sign access token and refresh token
    const session = await this.sessionService.createSession({
      userId: user.id,
      userAgent,
    });

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
    };
  }
}
