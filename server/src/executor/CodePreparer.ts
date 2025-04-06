import { TestCase } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export class CodePreparer {
  private static languageTemplateMap: Record<number, string> = {
    71: "pythonTemplate.txt",
    62: "javaTemplate.txt",
    63: "javascriptTemplate.txt",
  };

  private static commentSyntax: Record<number, { start: string; end: string }> =
    {
      71: {
        start: "# Code Snippet START ====================",
        end: "# Code Snippet END ====================",
      },
      62: {
        start: "// Code Snippet START ====================",
        end: "// Code Snippet END ====================",
      },
      63: {
        start: "// Code Snippet START ====================",
        end: "// Code Snippet END ====================",
      },
    };

  public static async prepareCode(
    languageId: number,
    userCode: string,
    testCase: TestCase[]
  ): Promise<string> {
    const templateFile = this.languageTemplateMap[languageId];
    const commentMarkers = this.commentSyntax[languageId];
    if (!templateFile) throw new Error("Unsupported language");

    const templatePath = path.join(__dirname, "../templates", templateFile);
    const template = await fs.readFile(templatePath, "utf-8");

    return this.injectCode(
      template,
      userCode,
      testCase,
      commentMarkers.start,
      commentMarkers.end
    );
  }

  private static injectCode(
    template: string,
    userCode: string,
    testCase: TestCase[],
    startMarker: string,
    endMarker: string
  ): string {
    const fullTestCaseJSON = JSON.stringify(testCase);

    const finalCode = template
      .replace(startMarker, `${startMarker}\n${userCode}`)
      .replace(endMarker, `${endMarker}`)
      .replace("{{TESTCASE}}", fullTestCaseJSON);

    return finalCode;
  }
}
