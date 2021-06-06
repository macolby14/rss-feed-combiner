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
    subject: "My RSS Feed",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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
        console.log("Timeout simulating email compelte");
        console.log({ msg });
        resolve();
      }, 1000)
    );
  }
}

function genereateEmailHTML() {}
