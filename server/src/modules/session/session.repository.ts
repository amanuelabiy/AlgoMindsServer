import { CreateSessionDto } from "../../common/interface/sessionDto";
import prismaClient from "../../config/prismaClient";

export class SessionRepository {
  public async createSession(data: CreateSessionDto) {
    return prismaClient.session.create({
      data,
    });
  }

  public async findBySessionId(sessionId: string) {
    return prismaClient.session.findUnique({ where: { id: sessionId } });
  }

  public async updateExpiresAtById(sessionId: string, expiresAt: Date) {
    return prismaClient.session.update({
      where: { id: sessionId },
      data: { expiresAt },
    });
  }

  public async deleteManySessionsByUserId(userId: string) {
    return prismaClient.session.deleteMany({ where: { userId } });
  }
}
