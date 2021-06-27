import { promises as fs } from "fs";
import { CombinedFeeds } from "../types";

export async function readPreviousFeedsFromFile(): Promise<CombinedFeeds> {
  const oldFeedString = await fs.readFile("./out/outputFeed.json", "utf8");
  const oldFeed = JSON.parse(oldFeedString);
  return oldFeed as CombinedFeeds;
}
