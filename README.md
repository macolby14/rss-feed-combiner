# RSS Feed Updater

## Summary
- Daily (via Github actions) pull blog titles, links, and descriptions from a speciifed list of blogs with RSS feeds
- Daily (via Github actions and Sendgrid) send an email with these blog links for easy reading 

## Motivation

I enjoy reading engineerng tech blogs from companies like Netflix and Facebook and from individuals like Josh W Comeau. However, I usually only see the articles when they are linked on other sites like HackerNews. The goal of this project was to automatically monitor those site's blogs (via their RSS feeds) and then email myself periodically whenever there are new blogs to read.

## Approach

- Read a text file that I can push changes to so the script knows what blogs to check the RSS feeds for
- Use a node-fetch and a RSS parser to read the RSS feeds of the blogs
- Use Github actions to run the script periodically with a cron
- Write the results of every run to a JSON file and commit with Github actions so we don't need to use a database
- Use SendGrid API to send emails to myself with links to the new blog posts from each blog

## Final Email Result Preview

This is what the email that is send to my inbox periodically (i.e. weekly) looks like:
![Final Email Example](/screenshots/final_email_example.jpg?raw=true)

## Miscellaneous

### Technology

- Language: TypeScript
- Framework: Node.js
- Libraries: rss-parser, node-fetch, dotenv

### Local Instructions

- Build with:
  npm run build

- Run with:
  npm run start

### Environmental Variables:

Three Environmental variables are used and saved as Github workspace env variables to get the script to run properly:

- SENDGRID_API_KEY (use Sendgrid to get your account to work)
- SEND_EMAIL (a flag 0 or 1. Should be 1 if you want emails to actually be send. Used so I don't always send emails when testing.)
- WRITE_TO_FILES (a flag 0 or 1. Should be 1 if you want files to actually be written out. Used so I don't always write new files when testing.)
