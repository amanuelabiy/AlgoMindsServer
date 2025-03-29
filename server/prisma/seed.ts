import {
  PrismaClient,
  ProblemDifficulty,
  Status,
  TestcaseEnum,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.testCase.deleteMany();
  await prisma.problem.deleteMany();

  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "problems_id_seq" RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "testcases_id_seq" RESTART WITH 1`
  );
  console.log("Cleared existing problems and test cases.");

  const problemsData = [
    {
      slug: "two-sum",
      title: "Two Sum",
      content:
        "Return indices of the two numbers such that they add up to a target.",
      tags: ["array", "hashmap"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "is-palindrome",
      title: "Is Palindrome",
      content: "Check if a string is a palindrome.",
      tags: ["string", "two-pointers"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "reverse-linked-list",
      title: "Reverse Linked List",
      content: "Reverse a singly linked list.",
      tags: ["linked-list"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "valid-parentheses",
      title: "Valid Parentheses",
      content: "Determine if input string has valid parentheses.",
      tags: ["stack", "string"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "merge-two-sorted-lists",
      title: "Merge Two Sorted Lists",
      content: "Merge two sorted linked lists and return it as a new list.",
      tags: ["linked-list"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "maximum-subarray",
      title: "Maximum Subarray",
      content: "Find the contiguous subarray with the largest sum.",
      tags: ["array", "dynamic-programming"],
      difficulty: ProblemDifficulty.MEDIUM,
    },
    {
      slug: "climbing-stairs",
      title: "Climbing Stairs",
      content: "Count distinct ways to climb to the top.",
      tags: ["dynamic-programming"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "binary-search",
      title: "Binary Search",
      content: "Return the index of target in sorted array.",
      tags: ["array", "binary-search"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "fibonacci-number",
      title: "Fibonacci Number",
      content: "Compute the Nth Fibonacci number.",
      tags: ["recursion", "dp"],
      difficulty: ProblemDifficulty.EASY,
    },
    {
      slug: "majority-element",
      title: "Majority Element",
      content: "Find the element that appears more than ⌊n / 2⌋ times.",
      tags: ["array", "hashmap"],
      difficulty: ProblemDifficulty.EASY,
    },
  ];

  const createdProblems: Array<{ id: number; slug: string }> = [];

  for (const problem of problemsData) {
    const created = await prisma.problem.upsert({
      where: { slug: problem.slug },
      update: {},
      create: {
        ...problem,
        status: Status.NOT_ATTEMPTED,
        createdAt: new Date(),
        updatedAt: new Date(),
        solutions: {},
      },
    });
    console.log(`Created/Found problem: ${created.title}`);
    createdProblems.push(created);
  }

  const generateTestCases = async () => {
    const allCases: Array<{
      type: TestcaseEnum;
      input: string;
      output: string;
      problemId: number;
    }> = [];

    for (const problem of createdProblems) {
      const baseSlug = problem.slug;
      const cases: Array<{
        type: TestcaseEnum;
        input: string;
        output: string;
        problemId: number;
      }> = [];

      for (let i = 0; i < 4; i++) {
        let testCase: any = {};

        switch (baseSlug) {
          case "two-sum": {
            const arr = [2, 7, 11, 15];
            const target = 9;
            testCase = {
              type: TestcaseEnum.ARRAY_AND_TARGET,
              input: JSON.stringify({ arr, target }),
              output: JSON.stringify([0, 1]),
            };
            break;
          }
          case "is-palindrome": {
            const word = ["racecar", "hello", "madam", "world"][i];
            testCase = {
              type: TestcaseEnum.SINGLE_STRING,
              input: JSON.stringify({ s: word }),
              output: JSON.stringify(
                word === word.split("").reverse().join("")
              ),
            };
            break;
          }
          case "reverse-linked-list": {
            const input = [1, 2, 3, 4];
            const output = [...input].reverse();
            testCase = {
              type: TestcaseEnum.LINKED_LIST,
              input: JSON.stringify({ head: input }),
              output: JSON.stringify(output),
            };
            break;
          }
          case "valid-parentheses": {
            const str = ["()", "(()", "({[]})", "(]"][i];
            const valid = ["()", "({[]})"].includes(str);
            testCase = {
              type: TestcaseEnum.SINGLE_STRING,
              input: JSON.stringify({ s: str }),
              output: JSON.stringify(valid),
            };
            break;
          }
          case "merge-two-sorted-lists": {
            const l1 = [1, 2, 4];
            const l2 = [1, 3, 4];
            testCase = {
              type: TestcaseEnum.LINKED_LIST,
              input: JSON.stringify({ l1, l2 }),
              output: JSON.stringify([1, 1, 2, 3, 4, 4]),
            };
            break;
          }
          case "maximum-subarray": {
            const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
            testCase = {
              type: TestcaseEnum.ARRAY_ONLY,
              input: JSON.stringify({ nums: arr }),
              output: JSON.stringify(6),
            };
            break;
          }
          case "climbing-stairs": {
            const n = [2, 3, 4, 5][i];
            const ways = [2, 3, 5, 8][i];
            testCase = {
              type: TestcaseEnum.SINGLE_INTEGER,
              input: JSON.stringify({ n }),
              output: JSON.stringify(ways),
            };
            break;
          }
          case "binary-search": {
            const arr = [1, 3, 5, 7, 9];
            const target = [3, 9, 1, 6][i];
            const idx = arr.indexOf(target);
            testCase = {
              type: TestcaseEnum.ARRAY_AND_TARGET,
              input: JSON.stringify({ arr, target }),
              output: JSON.stringify(idx === -1 ? -1 : idx),
            };
            break;
          }
          case "fibonacci-number": {
            const n = [0, 1, 5, 7][i];
            const fib = [0, 1, 5, 13][i];
            testCase = {
              type: TestcaseEnum.SINGLE_INTEGER,
              input: JSON.stringify({ n }),
              output: JSON.stringify(fib),
            };
            break;
          }
          case "majority-element": {
            const nums = [
              [3, 3, 4],
              [2, 2, 1, 1, 1, 2, 2],
              [1],
              [1, 2, 3, 1, 1],
            ][i];
            const freq: Record<number, number> = {};
            nums.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
            const majority = Object.keys(freq).find(
              (k) => freq[+k] > nums.length / 2
            );
            testCase = {
              type: TestcaseEnum.ARRAY_ONLY,
              input: JSON.stringify({ nums }),
              output: JSON.stringify(Number(majority)),
            };
            break;
          }
        }

        cases.push({ ...testCase, problemId: problem.id });
      }

      allCases.push(...cases);
    }

    return allCases;
  };
  const testCases = await generateTestCases();

  await prisma.testCase.createMany({
    data: testCases,
  });

  console.log(`Inserted ${testCases.length} test cases (4 per problem).`);
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
