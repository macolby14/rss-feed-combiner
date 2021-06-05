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

(async function main() {
  console.log("New run...\n");

  const data = await fs
    .readFile("./targetFeedURIs.txt", "utf8")
    .catch((err) => `An error occured reading rss feed urls: ${err}`);

  const rssUrls = data.split("\n");

  const parser = new Parser<CustomFeed, CustomItem>();

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

    fs.writeFile("outputFeed.json", JSON.stringify(relevantFeed));
  }
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
