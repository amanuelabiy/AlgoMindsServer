import { VerficationEnum, VerificationCode } from "@prisma/client";
import prismaClient from "../../config/prismaClient";
import {
  CreateVerificationCodeDto,
  FindByCodeAndTypeDto,
} from "../../common/interface/verificationCode";

export class VerificationCodeRepository {
  async createVerificationCode(
    data: CreateVerificationCodeDto
  ): Promise<VerificationCode> {
    return prismaClient.verificationCode.create({
      data,
    });
  }

  async findVerificationTokenById(
    id: string
  ): Promise<VerificationCode | null> {
    return prismaClient.verificationCode.findUnique({ where: { id } });
  }

  async deleteVerificationTokenById(id: string): Promise<void> {
    await prismaClient.verificationCode.delete({ where: { id } });
  }

  async findByCodeAndType(data: FindByCodeAndTypeDto) {
    const { id, type, expiresAt } = data;

    return await prismaClient.verificationCode.findFirst({
      where: {
        id,
        type,
        expiresAt: { gt: expiresAt },
      },
    });
  }
}
