import { v4 as uuidv4 } from "uuid";
import prismaClient from "../src/config/prismaClient";

async function main() {
  console.log("Seeding beta keys...");

  // Delete all existing beta keys
  await prismaClient.betaKey.deleteMany();

  // Generate 10 new beta keys
  const betaKeysData = Array.from({ length: 100 }).map(() => ({
    key: uuidv4(),
    isUsed: false,
    expiresAt: null,
  }));

  // Create beta keys
  const created = await prismaClient.betaKey.createMany({
    data: betaKeysData,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${created.count} beta keys.`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding beta keys:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
