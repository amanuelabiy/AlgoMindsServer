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

  public async findBySessionIdAndUserId(sessionId: string, userId: string) {
    return prismaClient.session.findUnique({
      where: {
        id: sessionId,
        userId,
      },
    });
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

  public async deleteSessionById(sessionId: string) {
    return prismaClient.session.delete({ where: { id: sessionId } });
  }

  public async findActiveSessionsByUserId(userId: string) {
    return prismaClient.session.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        userId: true,
        userAgent: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public async getUserFromSession(sessionId: string) {
    return await prismaClient.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });
  }

  public async deleteSessionByIdAndUserId(sessionId: string, userId: string) {
    return prismaClient.session.delete({
      where: {
        id: sessionId,
        userId,
      },
    });
  }
}
