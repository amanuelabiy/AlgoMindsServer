import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { SessionService } from "./session.service";
import { NotFoundException } from "../../common/utils/catch-errors";
import { HTTPSTATUS } from "../../config/http.config";
import { z } from "zod";

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

      const modifySessions = sessions.map((session) => ({
        ...session,
        ...(session.id === sessionId && {
          isCurrent: true,
        }),
      }));

      return res.status(HTTPSTATUS.OK).json({
        message: "Retrieved all sessions successfully",
        sessions: modifySessions,
      });
    }
  );

  public getSession = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = req?.sessionId;

    if (!sessionId) {
      throw new NotFoundException("Session ID not found. Please login again");
    }

    const { user } = await this.sessionService.getUserFromSession(sessionId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Session retrieved successfully",
      user,
    });
  });

  public deleteSession = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = z.string().parse(req.params.id);
    console.log("sessionId", sessionId);

    const userId = req.user?.id;

    if (!userId) {
      throw new NotFoundException("User not found");
    }

    await this.sessionService.deleteSessionByIdAndUserId(sessionId, userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Session removed successfully",
    });
  });
}
