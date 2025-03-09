/*
  Warnings:

  - The primary key for the `problems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer_cplusplus` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `answer_java` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `answer_javascript` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `answer_python` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `explanation` on the `problems` table. All the data in the column will be lost.
  - The `id` column on the `problems` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `problem_id` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `submission` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `submissionId` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `submissions` table. All the data in the column will be lost.
  - Added the required column `solutions` to the `problems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `problems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `problems` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `difficulty` on the `problems` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `code` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `submissions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `language` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passed` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemId` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProblemDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_ATTEMPTED', 'ATTEMPTED', 'SOLVED');

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_problem_id_fkey";

-- AlterTable
ALTER TABLE "problems" DROP CONSTRAINT "problems_pkey",
DROP COLUMN "answer_cplusplus",
DROP COLUMN "answer_java",
DROP COLUMN "answer_javascript",
DROP COLUMN "answer_python",
DROP COLUMN "explanation",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "solutions" JSONB NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "testCases" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "ProblemDifficulty" NOT NULL,
ADD CONSTRAINT "problems_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days';

-- AlterTable
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_pkey",
DROP COLUMN "problem_id",
DROP COLUMN "submission",
DROP COLUMN "submissionId",
DROP COLUMN "submittedAt",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "passed" BOOLEAN NOT NULL,
ADD COLUMN     "problemId" INTEGER NOT NULL,
ADD CONSTRAINT "submissions_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "user_problems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_ATTEMPTED',
    "lastAttempt" TEXT,
    "passedTests" INTEGER NOT NULL DEFAULT 0,
    "totalTests" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_problems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_problems_userId_problemId_key" ON "user_problems"("userId", "problemId");

-- AddForeignKey
ALTER TABLE "user_problems" ADD CONSTRAINT "user_problems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_problems" ADD CONSTRAINT "user_problems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
