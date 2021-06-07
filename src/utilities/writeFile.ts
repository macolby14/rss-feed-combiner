import { promises as fs } from "fs";

export function writeFile(fileName: string, data: unknown): Promise<void> {
  if (process.env.WRITE_TO_FILES !== "1") {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          "Did not write to files due to env flag WRITE_TO_FILES is not 1"
        );
        resolve();
      });
    });
  }
  if (fileName.includes(".json")) {
    fs.writeFile(fileName, JSON.stringify(data));
  }

  return fs.writeFile(fileName, data as string);
}
