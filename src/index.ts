import "./loadEnv";
import "source-map-support/register";
import { getFeeds } from "./getFeeds";
import { sendEmail } from "./sendEmail";
import { writeFile } from "./utilities/writeFile";
import { getNewFeedItemsOnly } from "./getNewFeedItemsOnly";
import { readPreviousFeedsFromFile } from "./utilities/readPreviousFeedsFromFile";

(async function main() {
  const previousFeeds = await readPreviousFeedsFromFile();
  const combinedFeeds = await getFeeds();
  writeFile("./out/outputFeed.json", combinedFeeds);
  const uniqueNewFeeds = getNewFeedItemsOnly(previousFeeds, combinedFeeds);
  sendEmail(uniqueNewFeeds);
})();
