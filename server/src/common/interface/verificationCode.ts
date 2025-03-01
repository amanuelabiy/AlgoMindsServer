import { VerficationEnum } from "@prisma/client";

export interface CreateVerificationCodeDto {
  userId: string;
  type: VerficationEnum;
  expiresAt: Date;
}

export interface CreatePasswordResetVerificationCodeDto {
  userId: string;
  type: VerficationEnum;
  expiresAt: Date;
  code: string;
}

export interface FindByCodeAndTypeDto {
  id: string;
  type: VerficationEnum;
  expiresAt: Date;
}

export interface CountRecentCodesDto {
  userId: string;
  type: VerficationEnum;
  timeAgo: Date;
}
