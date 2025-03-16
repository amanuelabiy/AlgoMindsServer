import { PrismaClient, ProblemDifficulty, Status, TestcaseEnum } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Creating Problems
  const problem1 = await prisma.problem.create({
    data: {
      slug: "two-sum",
      title: "Two Sum",
      content: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      difficulty: ProblemDifficulty.EASY,
      solutions: {},
      tags: ["array", "hashmap"],
      status: Status.NOT_ATTEMPTED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`Created problem: ${problem1.title}`);

  // Creating Test Cases for the Problem
  await prisma.testCase.createMany({
    data: [
      {
        problemId: problem1.id,
        type: TestcaseEnum.ARRAY_AND_TARGET,
        input: {
          arr: [2, 7, 11, 15],
          target: 9,
        },
        output: "[0,1]",
      },
      {
        problemId: problem1.id,
        type: TestcaseEnum.ARRAY_AND_TARGET,
        input: {
          arr: [3, 2, 4],
          target: 6,
        },
        output: "[1,2]",
      },
    ],
  });

  console.log(`Created test cases for: ${problem1.title}`);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
