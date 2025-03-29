import { User } from "@prisma/client";

export interface RegisterDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userAgent?: string;
}

export interface RegisterResponseDto {
  user: Partial<User>;
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string;
}

export interface LoginResponseDto {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  mfaRequired: boolean;
}

export interface ResetPasswordDto {
  password: string;
  verificationCode: string;
}
