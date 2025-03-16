/*
  Warnings:

  - You are about to drop the column `testCases` on the `problems` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TestcaseEnum" AS ENUM ('ARRAY_AND_TARGET', 'ARRAY_ONLY', 'SINGLE_INTEGER', 'DOUBLE_INTEGER', 'SINGLE_STRING', 'DOUBLE_STRING', 'ARRAY_AND_STRING', 'TWO_ARRAYS', 'LINKED_LIST', 'TREE');

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "testCases";

-- CreateTable
CREATE TABLE "testcases" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "type" "TestcaseEnum" NOT NULL,
    "input" JSONB NOT NULL,
    "output" TEXT NOT NULL,

    CONSTRAINT "testcases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testcases" ADD CONSTRAINT "testcases_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
