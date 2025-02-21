import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { SessionService } from "./session.service";
import { NotFoundException } from "../../common/utils/catch-errors";

export class SessionController {
  private readonly sessionService: SessionService;

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  public getAllSessions = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userId = req.user?.id;

      if (!userId) {
        throw new NotFoundException("User not found");
      }

      const sessionId = req.sessionId;

      const { sessions } = await this.sessionService.getAllSessions(userId);

      const modifySessions = sessions.map((session) => {});
    }
  );
}
