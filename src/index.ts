import Parser from "rss-parser";
import fs from "fs/promises";

interface CustomFeed {
  title: string;
}

interface CustomItem {
  title: string;
  link: string;
  pubDate: string;
}

interface ProcessedFeed {
  title: string;
  items: CustomItem[];
  mostRecentPubDate: Date;
}

(async function main() {
  console.log("New run...\n");

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

  const writeOutput = {
    feeds,
    timeUpdated: new Date().toString(),
  };

  fs.writeFile("./out/outputFeed.json", JSON.stringify(writeOutput));
})();

function pickItemKeys({ title, link, pubDate }: CustomItem): CustomItem {
  return { title, link, pubDate };
}

function getMostRecentPubDate(items: CustomItem[]): Date {
  let mostRecentPubDate = 0;

  items.forEach(({ pubDate }) => {
    mostRecentPubDate = Math.max(Date.parse(pubDate), mostRecentPubDate);
  });
  return new Date(mostRecentPubDate);
}
