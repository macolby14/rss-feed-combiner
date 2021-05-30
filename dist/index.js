"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
console.log("New run...\n");
fs_1.default.readFile("./feeds.txt", "utf8", (err, data) => {
    return new Promise((resolve, reject) => {
        if (err) {
            console.error("Error reading file occured: " + err);
            reject(err);
        }
        const rssUrls = data.split("\n");
        console.log(rssUrls);
        resolve(rssUrls);
    });
});
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
