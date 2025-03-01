import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { WaitListService } from "./waitlist.service";
import { UnauthorizedException } from "../../common/utils/catch-errors";
import { emailSchema } from "../../common/validators/auth.validator";
import { HTTPSTATUS } from "../../config/http.config";

export class WaitListController {
  private waitListService: WaitListService;

  constructor(waitListService: WaitListService) {
    this.waitListService = waitListService;
  }

  public addToWaitList = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const email = emailSchema.parse(req.body);
      console.log("email", email);

      if (!email) {
        throw new UnauthorizedException("Email is required");
      }

      const userWaitListData = await this.waitListService.addToWaitList(email);

      return res.status(HTTPSTATUS.CREATED).json(userWaitListData);
    }
  );
}
