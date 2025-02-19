-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days';

-- CreateTable
CREATE TABLE "Problem" (
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

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");
