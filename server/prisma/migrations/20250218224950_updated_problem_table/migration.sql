/*
  Warnings:

  - You are about to drop the `Problem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days';

-- DropTable
DROP TABLE "Problem";

-- CreateTable
CREATE TABLE "problems" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "answer_cplusplus" TEXT,
    "answer_java" TEXT,
    "answer_python" TEXT,
    "answer_javascript" TEXT,
    "explanation" TEXT,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "problems_slug_key" ON "problems"("slug");
