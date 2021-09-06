import Parser from "rss-parser";
import { promises as fs } from "fs";
import { CombinedFeeds, CustomFeed, CustomItem, ProcessedFeed } from "./types";

export async function getFeeds(): Promise<CombinedFeeds> {
  const data = await fs
    .readFile("./targetFeedURIs.txt", "utf8")
    .catch((err) => `An error occured reading rss feed urls: ${err}`);

  const rssUrls = data.split("\n").filter((line) => line !== "");

  const parser = new Parser<CustomFeed, CustomItem>();

  const feeds: ProcessedFeed[] = [];

  const MAX_BLOG_POSTS_PER_FEED = 10;

  for (const url of rssUrls) {
    const feed = await parser.parseURL(url);
    const relevantItems = feed.items
      .slice(0, MAX_BLOG_POSTS_PER_FEED)
      .map((item) => pickItemKeys(item));
    const feedMostRecentPubDate = getMostRecentPubDate(relevantItems);

    const relevantFeed = {
      title: feed.title,
      items: relevantItems,
      mostRecentPubDate: feedMostRecentPubDate,
    };

    feeds.push(relevantFeed);
  }

  return {
    feeds,
    timeUpdated: new Date().toString(),
  };
}

function pickItemKeys({
  title,
  link,
  pubDate,
}: {
  title: string;
  link: string;
  pubDate: string;
}): CustomItem {
  return { title, link, pubDate: new Date(pubDate) };
}

function getMostRecentPubDate(items: CustomItem[]): Date {
  let mostRecentPubDate = 0;

  items.forEach(({ pubDate }) => {
    mostRecentPubDate = Math.max(pubDate.getTime(), mostRecentPubDate);
  });
  return new Date(mostRecentPubDate);
}
