import { Request, Response } from "express";
import { KeysService } from "./keys.service";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { HTTPSTATUS } from "../../config/http.config";
import { NotFoundException } from "../../common/utils/catch-errors";

export class KeysController {
  private keysService: KeysService;

  constructor(keysService: KeysService) {
    this.keysService = keysService;
  }

  public joinBeta = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const key = req.body.key;
      const user = req.user;

      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (!key) {
        throw new NotFoundException("Beta Key is Required");
      }

      const result = await this.keysService.joinBeta({ key, user });

      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "User Joined Beta Successfully", data: result });
    }
  );
}
