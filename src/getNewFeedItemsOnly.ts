import { CombinedFeeds, ProcessedFeed } from "./types";
import { strict as assert } from "assert";

export function getNewFeedItemsOnly(
  oldCombinedFeeds: CombinedFeeds,
  newCombinedFeeds: CombinedFeeds
): CombinedFeeds {
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
