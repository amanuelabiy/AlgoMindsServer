import { PrismaClient, ProblemDifficulty, Status, TestcaseEnum } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Creating Problems (if not exists)
  const problem1 = await prisma.problem.upsert({
    where: { slug: "two-sum" },
    update: {},
    create: {
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

  const problem2 = await prisma.problem.upsert({
    where: { slug: "is-palindrome" },
    update: {},
    create: {
      slug: "is-palindrome",
      title: "Is Palindrome",
      content: "Given a string, return true if it is a palindrome, false otherwise.",
      difficulty: ProblemDifficulty.EASY,
      solutions: {},
      tags: ["string", "two-pointers"],
      status: Status.NOT_ATTEMPTED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`Created/Found problem: ${problem1.title}`);
  console.log(`Created/Found problem: ${problem2.title}`);

  // Generate 20 Two Sum test cases
  const twoSumCases = Array.from({ length: 20 }, () => {
    const arr = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, () => Math.floor(Math.random() * 50));
    const [num1, num2] = arr.sort(() => 0.5 - Math.random()).slice(0, 2); // Pick two random numbers
    const target = num1 + num2;
    return {
      problemId: problem1.id,
      type: TestcaseEnum.ARRAY_AND_TARGET,
      input: { arr, target },
      output: JSON.stringify([arr.indexOf(num1), arr.indexOf(num2)]),
    };
  });

  // Generate 20 Palindrome test cases
  const palindromeWords = ["racecar", "madam", "hello", "level", "world", "radar", "python", "noon", "civic", "wow"];
  const palindromeCases = Array.from({ length: 20 }, () => {
    const word = palindromeWords[Math.floor(Math.random() * palindromeWords.length)];
    return {
      problemId: problem2.id,
      type: TestcaseEnum.SINGLE_STRING,
      input: { s: word },
      output: JSON.stringify(word === word.split("").reverse().join("")),
    };
  });

  // Insert Test Cases
  await prisma.testCase.createMany({
    data: [...twoSumCases, ...palindromeCases],
  });

  console.log(`Inserted ${twoSumCases.length} Two Sum test cases.`);
  console.log(`Inserted ${palindromeCases.length} Palindrome test cases.`);
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
