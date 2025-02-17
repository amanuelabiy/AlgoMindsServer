import { CreateSessionDto } from "../../common/interface/sessionDto";
import { SessionRepository } from "./session.repository";

export class SessionService {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
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
}
