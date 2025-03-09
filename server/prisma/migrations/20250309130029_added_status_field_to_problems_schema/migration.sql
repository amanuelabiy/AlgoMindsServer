-- AlterTable
ALTER TABLE "problems" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_ATTEMPTED';

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days';
