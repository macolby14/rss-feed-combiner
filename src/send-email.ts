// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail";
import { strict as assert } from "assert";

export async function sendTestEmail(): Promise<void> {
  assert.ok(
    typeof process.env.SENDGRID_API_KEY === "string",
    "SENDGRID_API_KEY is not a string"
  );
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "macolby14@gmail.com", // Change to your recipient
    from: "macolby14@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun - Sent from rss - feed -combiner",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  // await sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}
