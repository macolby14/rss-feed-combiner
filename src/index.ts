import "./loadEnv";
import { promises as fs } from "fs";
import { getFeeds } from "./getFeeds";
import { sendTestEmail } from "./sendEmail";

(async function main() {
  const combinedFeeds = await getFeeds();

  fs.writeFile("./out/outputFeed.json", JSON.stringify(combinedFeeds));

  sendTestEmail();
})();
