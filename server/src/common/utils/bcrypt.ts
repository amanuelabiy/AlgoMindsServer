import bcrypt from "bcrypt";

export const hashValue = async (
  value: string,
  saltRounds: number = 10
): Promise<string> => await bcrypt.hash(value, saltRounds);

export const compareValue = async (
  value: string,
  hashdValue: string
): Promise<boolean> => await bcrypt.compare(value, hashdValue);
