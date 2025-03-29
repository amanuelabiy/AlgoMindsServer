import { BetaKey } from "@prisma/client";
import prismaClient from "../../config/prismaClient";

export class KeysRepository {
  public async getBetaKey(key: string): Promise<BetaKey | null> {
    return prismaClient.betaKey.findUnique({
      where: { key },
    });
  }

  public async setBetaKeyAsUsed(id: string): Promise<BetaKey> {
    return prismaClient.betaKey.update({
      where: { id },
      data: {
        isUsed: true,
      },
    });
  }
}
