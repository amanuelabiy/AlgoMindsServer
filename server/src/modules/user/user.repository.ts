import { RegisterDto } from "../../common/interface/auth.interface";
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

  async create(data: RegisterDto): Promise<User> {
    return prismaClient.user.create({
      data,
    });
  }
}
