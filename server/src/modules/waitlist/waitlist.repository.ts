import prismaClient from "../../config/prismaClient";

export class WaitListRepository {
  public async createEntry(email: string) {
    return prismaClient.waitlist.create({
      data: {
        email,
      },
    });
  }
}
