import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationEmailSchema,
} from "../../common/validators/auth.validator";
import { omitSensitive } from "../../common/utils/omitSensitive";
import {
  clearAuthenticationCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthenticationCookies,
} from "../../common/utils/cookie";
import {
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from "../../common/utils/catch-errors";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const userAgent = req.headers["user-agent"];
      // Validate the request body
      const body = registerSchema.parse({
        ...req.body,
        userAgent,
      });

      const { user, accessToken, refreshToken } =
        await this.authService.register(body);

      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.CREATED)
        .json({
          message: "Registered successfully",
          data: omitSensitive(user, ["password"]),
        });
    }
  );

  public login = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userAgent = req.headers["user-agent"];
      const body = loginSchema.parse({
        ...req.body,
        userAgent,
      });

      /* Inside of Auth Service we are doing password and if the user exists
       So if the second if(!user) gets hit there was an error in receiving the user from the service
      That is why its a NotFoundException and not n UnauthorizedException
      */
      const { user, accessToken, refreshToken, mfaRequired } =
        await this.authService.login(body);

      if (mfaRequired && !user) {
        return res.status(HTTPSTATUS.OK).json({
          message: "Verify MFA authentication",
          mfaRequired,
          data: user,
        });
      }

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.OK)
        .json({
          message: "User login successfully",
          mfaRequired,
          data: omitSensitive(user, ["password"]),
        });
    }
  );

  public refreshToken = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const refreshToken = req.cookies.refreshToken as string | undefined;

      // If the refresh token is not present, throw an error. Refresh token is required to get a new access token
      if (!refreshToken) {
        throw new UnauthorizedException("Missing refresh token");
      }

      const { accessToken, newRefreshToken } =
        await this.authService.refreshToken(refreshToken);

      if (newRefreshToken) {
        res.cookie(
          "refreshToken",
          newRefreshToken,
          getRefreshTokenCookieOptions()
        );
      }

      return res
        .status(HTTPSTATUS.OK)
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .json({
          message: "Refreshed access token successfully",
        });
    }
  );

  public verifyEmail = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code } = verificationEmailSchema.parse(req.body);
      const { user, waitListData } = await this.authService.verifyEmail(code);

      if (!user) {
        throw new NotFoundException("Invalid verification code");
      }

      if (!waitListData && user) {
        throw new UnprocessableEntityException(
          "Email was verified, but user was not added to the waitlist"
        );
      }

      return res.status(HTTPSTATUS.OK).json({
        message:
          "Email verified successfully. You have been added to the waitlist",
      });
    }
  );

  public resendVerificationEmail = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code } = verificationEmailSchema.parse(req.body);
      await this.authService.resendVerificationEmail(code);

      return res.status(HTTPSTATUS.OK).json({
        message: "Verification email resent successfully",
      });
    }
  );

  public forgotPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const email = emailSchema.parse(req.body.email);
      await this.authService.forgotPassword(email);

      return res.status(HTTPSTATUS.OK).json({
        message:
          "If an account with that email exists, you will receive a password reset email shortly.",
      });
    }
  );

  public resetPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = resetPasswordSchema.parse(req.body);

      await this.authService.resetPassword(body);

      return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
        message: "Reset Password Successfully",
      });
    }
  );

  public logout = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const sessionId = req.sessionId;
      if (!sessionId) {
        throw new NotFoundException("Session is invalid");
      }
      await this.authService.logout(sessionId);
      return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
        message: "User logged out successfully",
      });
    }
  );
}
