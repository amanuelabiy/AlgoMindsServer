import prismaClient from "../../config/prismaClient";
import { User } from "@prisma/client";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }
}
