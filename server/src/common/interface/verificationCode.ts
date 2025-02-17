import { VerficationEnum } from "@prisma/client";

export interface CreateVerificationCodeDto {
  userId: string;
  type: VerficationEnum;
}
