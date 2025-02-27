/*
  Warnings:

  - The primary key for the `problems` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "problems" DROP CONSTRAINT "problems_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "problems_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "problems_id_seq";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days';

-- CreateTable
CREATE TABLE "submissions" (
    "problem_id" TEXT NOT NULL,
    "submissionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submission" TEXT NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("userId","submissionId")
);

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
