import "./loadEnv";
import { CombinedFeeds, getFeeds } from "./getFeeds";
import { sendEmail } from "./sendEmail";
import { writeFile } from "./utilities/writeFile";
import { promises as fs } from "fs";

(async function main() {
  // const combinedFeeds = await getFeeds();
  // writeFile("./out/outputFeed.json", combinedFeeds);
  // sendEmail(combinedFeeds);
  readPreviousFeedsFromFile();
})();

async function readPreviousFeedsFromFile(): Promise<CombinedFeeds> {
  const oldFeedString = await fs.readFile("./out/outputFeed.json", "utf8");
  const oldFeed = JSON.parse(oldFeedString);
  return oldFeed as CombinedFeeds;
}

// function compareFeeds(
//   oldFeed: CombinedFeeds,
//   newFeed: CombinedFeeds
// ): CombinedFeeds {

// }
