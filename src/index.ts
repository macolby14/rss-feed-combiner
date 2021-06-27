import "./loadEnv";
import { CombinedFeeds, getFeeds, ProcessedFeed } from "./getFeeds";
import { sendEmail } from "./sendEmail";
import { writeFile } from "./utilities/writeFile";
import { promises as fs } from "fs";
import { strict as assert } from "assert";
import "source-map-support/register";

(async function main() {
  const previousFeeds = await readPreviousFeedsFromFile();
  const combinedFeeds = await getFeeds();
  writeFile("./out/outputFeed.json", combinedFeeds);
  const uniqueNewFeeds = getNewFeedItemsOnly(previousFeeds, combinedFeeds);
  sendEmail(uniqueNewFeeds);

  console.log(JSON.stringify(uniqueNewFeeds));
})();

async function readPreviousFeedsFromFile(): Promise<CombinedFeeds> {
  const oldFeedString = await fs.readFile("./out/outputFeed.json", "utf8");
  const oldFeed = JSON.parse(oldFeedString);
  return oldFeed as CombinedFeeds;
}

function getNewFeedItemsOnly(
  oldCombinedFeeds: CombinedFeeds,
  newCombinedFeeds: CombinedFeeds
): CombinedFeeds {
  /*
  - pointer to newest item of both feeds
  - if pubDate of newFeed item is more recent than item in oldFeed, add it to the output
  - if pubDate is the same or older stop
  */

  const resultFeeds: ProcessedFeed[] = [];

  const oldFeeds = oldCombinedFeeds.feeds;
  const newFeeds = newCombinedFeeds.feeds;

  //map old feeds for fast lookup and comparison
  const oldFeedMap = new Map<string, ProcessedFeed>();
  for (const oldFeed of oldFeeds) {
    oldFeedMap.set(oldFeed.title, oldFeed);
  }

  //map through new feeds and only return ones  with new items
  for (const singleNewFeed of newFeeds) {
    // brand new feed - no results for the old one so push the entire feed
    if (!oldFeedMap.has(singleNewFeed.title)) resultFeeds.push(singleNewFeed);
    else {
      const singleOldFeed = oldFeedMap.get(singleNewFeed.title);
      assert.ok(singleOldFeed !== undefined, "Old Feed is undefined");

      // old feed had no items and new feed has items, so just use the entire new feed
      if (
        singleOldFeed.items.length === 0 &&
        singleNewFeed.items.length !== 0
      ) {
        resultFeeds.push(singleNewFeed);
        continue;
      }

      //get all new items from this feed
      const mostRecentOldItem = new Date(singleOldFeed.mostRecentPubDate);
      const singleFeedResultItems = singleNewFeed.items.filter(
        (item) => new Date(item.pubDate) > mostRecentOldItem
      );

      if (singleFeedResultItems.length === 0) continue;

      resultFeeds.push({ ...singleNewFeed, items: singleFeedResultItems });
    }
  }

  return {
    feeds: resultFeeds,
    timeUpdated: new Date().toString(),
  };
}
