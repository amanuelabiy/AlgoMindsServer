-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isBetaUser" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "beta_keys" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "beta_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beta_keys_key_key" ON "beta_keys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "beta_keys_usedById_key" ON "beta_keys"("usedById");

-- CreateIndex
CREATE INDEX "beta_keys_key_idx" ON "beta_keys"("key");

-- AddForeignKey
ALTER TABLE "beta_keys" ADD CONSTRAINT "beta_keys_usedById_fkey" FOREIGN KEY ("usedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
