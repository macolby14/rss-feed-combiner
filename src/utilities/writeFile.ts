import { promises as fs } from "fs";

export function writeFile(fileName: string, data: unknown): Promise<void> {
  if (process.env.WRITE_TO_FILES !== "1") {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          `Did not write to ${fileName}. Change WRITE_TO_FILES env variable to actually write.`
        );
        resolve();
      });
    });
  }
  if (fileName.includes(".json")) {
    return fs.writeFile(fileName, JSON.stringify(data));
  }

  return fs.writeFile(fileName, data as string);
}
