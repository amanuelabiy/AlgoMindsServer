import { VerficationEnum } from "@prisma/client";

export interface CreateVerificationCodeDto {
  userId: string;
  type: VerficationEnum;
  expiresAt: Date;
}

export interface FindByCodeAndTypeDto {
  id: string;
  type: VerficationEnum;
  expiresAt: Date;
}
