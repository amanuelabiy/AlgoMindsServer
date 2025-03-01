import crypto from "crypto";

const generateSixDigitCode = (): string => {
  return crypto.randomInt(100000, 1000000).toString();
};

export default generateSixDigitCode;
