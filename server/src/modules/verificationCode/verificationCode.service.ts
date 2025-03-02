import { VerificationCode } from "@prisma/client";
import {
  CountRecentCodesDto,
  CreatePasswordResetVerificationCodeDto,
  CreateVerificationCodeDto,
  FindByCodeAndTypeDto,
  FindByIdAndTypeDto,
  FindPasswordResetVerificationDto,
} from "../../common/interface/verificationCode";
import { VerificationCodeRepository } from "./verificationCode.repository";

export class VerificationCodeService {
  private readonly verificationCodeRepository: VerificationCodeRepository;

  constructor(verificationCodeRepository: VerificationCodeRepository) {
    this.verificationCodeRepository = verificationCodeRepository;
  }

  public async createVerificationCode(
    verificationCodeData: CreateVerificationCodeDto
  ): Promise<VerificationCode> {
    return this.verificationCodeRepository.createVerificationCode(
      verificationCodeData
    );
  }

  public async createPasswordResetVerificationCode(
    verificationCodeData: CreatePasswordResetVerificationCodeDto
  ) {
    return this.verificationCodeRepository.createPasswordResetVerificationCode(
      verificationCodeData
    );
  }

  public async findByCodeAndType(
    data: FindByCodeAndTypeDto
  ): Promise<VerificationCode | null> {
    return this.verificationCodeRepository.findByCodeAndType(data);
  }

  public async findPasswordResetVerification(
    data: FindPasswordResetVerificationDto
  ): Promise<VerificationCode | null> {
    return this.verificationCodeRepository.findPasswordResetVerification(data);
  }

  public async findByIdAndType(data: FindByIdAndTypeDto) {
    return this.verificationCodeRepository.findByIdAndType(data);
  }

  public async deleteVerificationCodeById(
    id: string
  ): Promise<VerificationCode> {
    return this.verificationCodeRepository.deleteVerificationCodeById(id);
  }

  public countRecentCodes(data: CountRecentCodesDto): Promise<number> {
    return this.verificationCodeRepository.countRecentCodes(data);
  }
}
