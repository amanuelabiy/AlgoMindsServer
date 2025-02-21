import { CreateSessionDto } from "../../common/interface/sessionDto";
import { NotFoundException } from "../../common/utils/catch-errors";
import { SessionRepository } from "./session.repository";

export class SessionService {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  public async getAllSessions(userId: string) {
    const sessions = await this.sessionRepository.findActiveSessionsByUserId(
      userId
    );

    return { sessions };
  }

  public async getUserFromSession(sessionId: string) {
    const session = await this.sessionRepository.getUserFromSession(sessionId);

    if (!session) {
      throw new NotFoundException("Session not found");
    }

    const { user } = session;

    return { user };
  }

  public async createSession(data: CreateSessionDto) {
    return this.sessionRepository.createSession(data);
  }

  public async findBySessionId(sessionId: string) {
    return this.sessionRepository.findBySessionId(sessionId);
  }

  public async updateExpiresAtById(sessionId: string, expiresAt: Date) {
    return this.sessionRepository.updateExpiresAtById(sessionId, expiresAt);
  }

  public async deleteManySessionsByUserId(userId: string) {
    return this.sessionRepository.deleteManySessionsByUserId(userId);
  }

  public async deleteSessionById(sessionId: string) {
    return this.sessionRepository.deleteSessionById(sessionId);
  }

  public async deleteSessionByIdAndUserId(sessionid: string, userId: string) {
    const deletedSession =
      await this.sessionRepository.findBySessionIdAndUserId(sessionid, userId);

    if (!deletedSession) {
      throw new NotFoundException("Session not found");
    }

    await this.sessionRepository.deleteSessionByIdAndUserId(sessionid, userId);

    return deletedSession;
  }
}
