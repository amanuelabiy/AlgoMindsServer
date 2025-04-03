import * as fs from "fs";

async function convertFileToBase64(filePath: string) {
  try {
    // Read file as a buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Convert buffer to Base64
    const base64String = fileBuffer.toString("base64");

    return base64String;
  } catch (error) {
    console.error("Error reading file:", error);
    return "";
  }
}
