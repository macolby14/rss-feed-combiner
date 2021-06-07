// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail";
import { strict as assert } from "assert";
import { html } from "lit-html";
import { CombinedFeeds, CustomItem, ProcessedFeed } from "./getFeeds";

export async function sendEmail(feeds: CombinedFeeds): Promise<void> {
  assert.ok(
    typeof process.env.SENDGRID_API_KEY === "string",
    "SENDGRID_API_KEY is not a string"
  );
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "macolby14@gmail.com", // Change to your recipient
    from: "macolby14@gmail.com", // Change to your verified sender
    subject: "My RSS Feed",
    html: genereateEmailHTML(feeds),
  };
  if (process.env.SEND_EMAIL === "1") {
    await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        console.log(
          "Simulating sending email compelte. Change SEND_EMAIL env variable to actually send."
        );
        console.log({ msg });
        resolve();
      }, 1000)
    );
  }
}

function genereateEmailHTML(feeds: CombinedFeeds): string {
  return String.raw`
    <h1>Your RSS Feed</h1>
    <p>Here is your RSS feed updated on ${feeds.timeUpdated}</p>
    ${feeds.feeds.map(singleFeedToHMTL)}
  `;
}

function singleFeedToHMTL(feed: ProcessedFeed): string {
  return String.raw`
    <h3>${feed.title}</h3>
    <ol>
      ${feed.items.map(singleItemToHTML)}
    </ol>
  `;
}

function singleItemToHTML(item: CustomItem): string {
  return String.raw`
    <li>
      <p><strong>${item.title} - ${item.pubDate}</strong>></p>
      <p>${item.link}</p>
    </li>
  `;
}
