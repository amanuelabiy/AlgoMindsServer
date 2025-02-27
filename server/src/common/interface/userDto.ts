import { User, UserPreferences } from "@prisma/client";

export interface FindByIdAndUpdateDto {
  id: string;
  data: Partial<User>;
}

export interface UpdateUserPreferencesDto {
  userId: string;
  data: Partial<UserPreferences>;
}
