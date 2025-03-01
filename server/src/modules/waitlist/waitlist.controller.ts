import { WaitListService } from "./waitlist.service";

export class WaitListController {
  private waitListService: WaitListService;

  constructor(waitListService: WaitListService) {
    this.waitListService = waitListService;
  }

  public async addToWaitList(email: string) {
    return await this.waitListService.addToWaitList(email);
  }
}
