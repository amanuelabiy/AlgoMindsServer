import { User } from "@prisma/client";

export interface JoinBetaDto {
  key: string;
  user: User;
}
