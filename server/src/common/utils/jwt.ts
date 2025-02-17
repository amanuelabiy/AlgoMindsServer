import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import {
  config,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "../../config/app.config";

export type AccessTPayload = {
  userId: string;
  sessionId: string;
};

export type RefreshTPayload = {
  sessionId: string;
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: JWT_EXPIRES_IN,
  secret: config.JWT.SECRET,
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: JWT_REFRESH_EXPIRES_IN,
  secret: config.JWT.REFRESH_SECRET,
};

export const signJwtToken = (
  payload: AccessTPayload | RefreshTPayload,
  options?: SignOptsAndSecret
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};

export const verifiyJwtToken = <TPayload extends object = AccessTPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...opts,
    }) as TPayload;

    return { payload };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
