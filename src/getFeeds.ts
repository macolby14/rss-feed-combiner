import Parser from "rss-parser";
import { promises as fs } from "fs";

interface CustomFeed {
  title: string;
}

export interface CustomItem {
  title: string;
  link: string;
  pubDate: Date;
}

export interface ProcessedFeed {
  title: string;
  items: CustomItem[];
  mostRecentPubDate: Date;
}

export interface CombinedFeeds {
  feeds: ProcessedFeed[];
  timeUpdated: string;
}

export async function getFeeds(): Promise<CombinedFeeds> {
  const data = await fs
    .readFile("./targetFeedURIs.txt", "utf8")
    .catch((err) => `An error occured reading rss feed urls: ${err}`);

  const rssUrls = data.split("\n");

  const parser = new Parser<CustomFeed, CustomItem>();

  const feeds: ProcessedFeed[] = [];

  for (const url of rssUrls) {
    const feed = await parser.parseURL(url);
    const relevantItems = feed.items
      .slice(0, 3)
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
    mostRecentPubDate = Math.max(pubDate.getMilliseconds(), mostRecentPubDate);
  });
  return new Date(mostRecentPubDate);
}
