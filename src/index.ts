import "./loadEnv";
import { promises as fs } from "fs";
import { getFeeds } from "./getFeeds";
import { sendTestEmail } from "./send-email";

(async function main() {
  console.log("New run...\n");

  const combinedFeeds = await getFeeds();

  fs.writeFile("./out/outputFeed.json", JSON.stringify(combinedFeeds));

  sendTestEmail();
})();
