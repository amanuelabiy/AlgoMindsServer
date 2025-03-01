import { WaitListRepository } from "./waitlist.repository";

export class WaitListService {
  private waitListRepository: WaitListRepository;

  constructor(waitListRepository: WaitListRepository) {
    this.waitListRepository = waitListRepository;
  }

  public async addToWaitList(email: string) {
    return await this.waitListRepository.createEntry(email);
  }
}
