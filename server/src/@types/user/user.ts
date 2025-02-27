import { User, UserPreferences } from "@prisma/client";

export interface UserWithPreferences extends User {
  userPreferences: UserPreferences | null;
}
