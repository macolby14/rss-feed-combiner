import "./loadEnv";
import { getFeeds } from "./getFeeds";
import { sendEmail } from "./sendEmail";
import { writeFile } from "./utilities/writeFile";

(async function main() {
  const combinedFeeds = await getFeeds();

  writeFile("./out/outputFeed.json", combinedFeeds);

  sendEmail(combinedFeeds);
})();
