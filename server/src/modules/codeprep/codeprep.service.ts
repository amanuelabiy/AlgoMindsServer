import * as fs from "fs";
import * as path from "path";

export class CodeprepService {

 /**
   *
   * @param templatePath
   * @param languageId
   * @param userCode
   * @returns
   */
  async generateModifiedCode(
    templatePath: string,
    languageId: number,
    userCode: string
  ): Promise<string> {
    try {
      const pythonTemplate = fs.readFileSync(templatePath, "utf-8");
      // Locate the insertion markers
      /**
       * @type {string}
       */
      let startMarker: string = "";
      /**
       * @type {string}
       */
      let endMarker: string = "";
      switch (languageId) {
        case 71:
          startMarker = "# Code Snippet START ====================";
          endMarker = "# Code Snippet END ====================";
          break;
        case 62:
        case 93:
          startMarker = "// Code Snippet START ====================";
          endMarker = "// Code Snippet END ====================";
          break;
      } 

      const startIndex = pythonTemplate.indexOf(startMarker);
      const endIndex = pythonTemplate.indexOf(endMarker);

      if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
        throw new Error("Could not find code snippet markers.");
      }

      // Inject user code dynamically (WITHOUT modifying the original file)
      const beforeCode = pythonTemplate.substring(
        0,
        startIndex + startMarker.length
      );
      const afterCode = pythonTemplate.substring(endIndex);
      const modifiedPythonCode = `${beforeCode}\n${userCode}\n${afterCode}`;

      return `${modifiedPythonCode}`;
    } catch (error) {
      throw new Error(`Error generating ${languageId} code: ${error}`);
    }
  }
async prepareCode(language_id: number) {
    let templatePath: string; // path to the correct language template
    let modifiedCode: string = "";
    let userCode: string = "";
    // Need to update this to dynamically take user code. User code must be formatted properly
    // before sending to Judge0

    // Language ID's:

    // Python 3.8:                   71
    // C++ (Clang 7.0.1):            76
    // Java SDK 17.0.6:              62
    // JavaScript (Node.js 18.15.0): 93

    switch (language_id) {
      case 71:
        templatePath = path.join(__dirname, "../templates/pythonTemplate.txt"); // Template Python file
        userCode = fs.readFileSync(
          path.join(__dirname, "../templates/sampleUserCode.txt"),
          "utf-8"
        );
        modifiedCode = await this.generateModifiedCode(
          templatePath,
          language_id,
          userCode
        );
        break;
      case 62:
        templatePath = path.join(__dirname, "../templates/javaTemplate.txt"); // Template Java file
        userCode = fs.readFileSync(
          path.join(__dirname, "../templates/sampleJavaCode.txt"),
          "utf-8"
        );
        modifiedCode = await this.generateModifiedCode(
          templatePath,
          language_id,
          userCode
        );
        break;
        case 93:
          templatePath = path.join(__dirname, "../templates/javascriptTemplate.txt"); // Template Java file
        userCode = fs.readFileSync(
          path.join(__dirname, "../templates/sampleJavascriptCode.txt"),
          "utf-8"
        );
        modifiedCode = await this.generateModifiedCode(
          templatePath,
          language_id,
          userCode
        );
        break;

    }
    return modifiedCode;
  }
}