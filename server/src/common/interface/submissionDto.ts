import { TestCase } from "@prisma/client";

export interface CodeSubmissionDto {
  sourceCode: string;
  languageId: number;
  problemId: number;
  testCases?: TestCase[];
}
