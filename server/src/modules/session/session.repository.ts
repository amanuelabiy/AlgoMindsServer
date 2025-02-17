import { CreateSessionDto } from "../../common/interface/sessionDto";
import prismaClient from "../../config/prismaClient";

export class SessionRepository {
  async createSession(data: CreateSessionDto) {
    return prismaClient.session.create({
      data,
    });
  }

  async findBySessionId(sessionId: string) {
    return prismaClient.session.findUnique({ where: { id: sessionId } });
  }

  async updateExpiresAtById(sessionId: string, expiresAt: Date) {
    return prismaClient.session.update({
      where: { id: sessionId },
      data: { expiresAt },
    });
  }
}
