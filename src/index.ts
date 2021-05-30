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
    .readFile("./feeds.txt", "utf8")
    .catch((err) => `An error occured reading rss feed urls: ${err}`);

  const rssUrls = data.split("\n");
  console.log(rssUrls);
})();

// const parser = new Parser<CustomFeed, CustomItem>();

// const rssUrls = [
//   "https://www.joshwcomeau.com/rss.xml",
//   "https://netflixtechblog.com/feed",
// ];

// (async () => {
//   for (const url of rssUrls) {
//     const feed = await parser.parseURL(url);
//     console.log(feed.title);

//     feed.items.slice(0, 3).forEach((item) => {
//       const dateString = new Date(item.pubDate).toLocaleDateString("en-US");
//       console.log(`\n${item.title} (${dateString})\n${item.link}`);
//     });

//     console.log("-".repeat(10) + "\n");
//   }
// })();
