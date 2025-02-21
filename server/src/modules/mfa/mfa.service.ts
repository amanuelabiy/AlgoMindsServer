import { Request } from "express";
import { UnauthorizedException } from "../../common/utils/catch-errors";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { UserService } from "../user/user.service";
import { config } from "../../config/app.config";

export class MfaService {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async generateMFASetup(req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("User not authorized");
    }

    const userWithPreferences =
      await this.userService.getUserWithPreferencesById(user.id);

    console.log("userWithPreferences", userWithPreferences);

    if (!userWithPreferences || !userWithPreferences.userPreferences) {
      throw new UnauthorizedException("User preferences not found");
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
}
