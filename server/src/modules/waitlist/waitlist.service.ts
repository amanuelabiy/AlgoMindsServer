import { ErrorCode } from "../../common/enums/error-code.enum";
import { BadRequestException } from "../../common/utils/catch-errors";
import { WaitListRepository } from "./waitlist.repository";

export class WaitListService {
  private waitListRepository: WaitListRepository;

  constructor(waitListRepository: WaitListRepository) {
    this.waitListRepository = waitListRepository;
  }

  public async addToWaitList(email: string) {
    const existingUser = await this.waitListRepository.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.WAITLIST_EMAIL_ALREADY_EXISTS
      );
    }

    return await this.waitListRepository.createEntry(email);
  }
}
