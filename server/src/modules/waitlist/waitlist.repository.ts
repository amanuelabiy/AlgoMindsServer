import prismaClient from "../../config/prismaClient";

export class WaitListRepository {
  public async createEntry(email: string) {
    return prismaClient.waitlist.create({
      data: {
        email,
        updatedAt: new Date()
      },
    });
  }

  public async findByEmail(email: string) {
    return prismaClient.waitlist.findUnique({
      where: {
        email,
      },
    });
  }
}
