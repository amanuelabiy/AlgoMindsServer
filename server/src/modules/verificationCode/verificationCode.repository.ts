import { VerificationCode } from "@prisma/client";
import prismaClient from "../../config/prismaClient";
import {
  CreateVerificationCodeDto,
  FindByCodeAndTypeDto,
} from "../../common/interface/verificationCode";

export class VerificationCodeRepository {
  public async createVerificationCode(
    data: CreateVerificationCodeDto
  ): Promise<VerificationCode> {
    return prismaClient.verificationCode.create({
      data,
    });
  }

  public async findVerificationTokenById(
    id: string
  ): Promise<VerificationCode | null> {
    return prismaClient.verificationCode.findUnique({ where: { id } });
  }

  public async findByCodeAndType(data: FindByCodeAndTypeDto) {
    const { id, type, expiresAt } = data;

    return prismaClient.verificationCode.findFirst({
      where: {
        id,
        type,
        expiresAt: { gt: expiresAt },
      },
    });
  }

  public async deleteVerificationCodeById(
    id: string
  ): Promise<VerificationCode> {
    return prismaClient.verificationCode.delete({ where: { id } });
  }
}
