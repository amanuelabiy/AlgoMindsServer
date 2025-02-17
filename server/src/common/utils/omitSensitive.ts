// Omit senseitive fields from an object, ex. password and 2fa code
/*

omitSensitive(user, ["password"]); // ✅ Allowed (password exists in user)
omitSensitive(user, ["email", "id"]); // ✅ Allowed
omitSensitive(user, ["notAKey"]); // ❌ TypeScript error (invalid key)
omitSensitive(user, ["password", "userPreferences.twoFactorSecret"]); // ✅ Allowed (nested key)

*/
export const omitSensitive = <T extends Record<string, any>>(
  object: T,
  fields: (keyof T)[]
): Omit<T, keyof T> => {
  const newObj = { ...object };
  for (const field of fields) {
    delete newObj[field];
  }
  return newObj;
};
