import { ErrorCode } from "../../common/enums/error-code.enum";
import { BadRequestException } from "../../common/utils/catch-errors";
import { config } from "../../config/app.config";
import { sendEmail } from "../../mailers/mailer";
import { waitListTemplate } from "../../mailers/templates/templates";
import { UserService } from "../user/user.service";
import { WaitListRepository } from "./waitlist.repository";

export class WaitListService {
  private waitListRepository: WaitListRepository;
  private userService: UserService;

  constructor(
    waitListRepository: WaitListRepository,
    userService: UserService
  ) {
    this.userService = userService;
    this.waitListRepository = waitListRepository;
  }

  /*Email That is Adding To WaitList is the email that adding the waitlist.
  If it is null that means that the email is filling out the form that asks for just the email.
  This means there is no corresponding account that is adding the email to the waitlist.
  */
  public async addToWaitList(
    emailBeingAddedToWaitList: string,
    emailThatIsAddingToWaitList: string | null
  ) {
    const existingUser = await this.waitListRepository.findByEmail(
      emailBeingAddedToWaitList
    );

    if (existingUser) {
      throw new BadRequestException(
        "Unable to add user to waitlist. User already exists with this email",
        ErrorCode.WAITLIST_EMAIL_ALREADY_EXISTS
      );
    }

    // Check an account is already created with this email
    const accountExists = await this.userService.findByEmail(
      emailBeingAddedToWaitList
    );

    const accountAddingToWaitListIsItSelf =
      emailBeingAddedToWaitList === emailThatIsAddingToWaitList;

    if (accountExists && !accountAddingToWaitListIsItSelf) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    // Send email to user
    await sendEmail({
      to: emailBeingAddedToWaitList,
      ...waitListTemplate(config.APP_ORIGIN),
    });

    return await this.waitListRepository.createEntry(emailBeingAddedToWaitList);
  }

  public async findWaitListEmail(email: string) {
    return await this.waitListRepository.findByEmail(email);
  }
}
