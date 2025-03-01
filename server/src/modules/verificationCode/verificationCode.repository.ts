import { VerificationCode } from "@prisma/client";
import prismaClient from "../../config/prismaClient";
import {
  CreateVerificationCodeDto,
  FindByCodeAndTypeDto,
  CountRecentCodesDto,
  FindPasswordResetVerificationDto,
} from "../../common/interface/verificationCode";

export class VerificationCodeRepository {
  public async createVerificationCode(
    data: CreateVerificationCodeDto
  ): Promise<VerificationCode> {
    return prismaClient.verificationCode.create({
      data,
    });
  }

  public async createPasswordResetVerificationCode(
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

  public async findByCodeAndType({
    id,
    type,
    expiresAt,
  }: FindByCodeAndTypeDto) {
    return prismaClient.verificationCode.findFirst({
      where: {
        id,
        type,
        expiresAt: { gt: expiresAt },
      },
    });
  }

  public async findPasswordResetVerification({
    code,
    expiresAt,
    type,
  }: FindPasswordResetVerificationDto) {
    return prismaClient.verificationCode.findFirst({
      where: {
        code,
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

  public async countRecentCodes({
    userId,
    type,
    timeAgo,
  }: CountRecentCodesDto) {
    return prismaClient.verificationCode.count({
      where: {
        userId,
        type,
        createdAt: { gte: timeAgo },
      },
    });
  }
}
