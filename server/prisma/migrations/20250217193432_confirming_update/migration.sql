-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days';

-- AlterTable
ALTER TABLE "verification_codes" ALTER COLUMN "expiresAt" DROP DEFAULT;
