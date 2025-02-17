import { User } from "@prisma/client";

export interface FindByIdAndUpdateDto {
  id: string;
  data: Partial<User>;
}
