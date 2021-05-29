"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const jsdom_1 = require("jsdom");
const RSS_URL = `https://www.joshwcomeau.com/rss.xml/`;
node_fetch_1.default(RSS_URL)
    .then((response) => response.text())
    .then((xml) => {
    // Create empty DOM, the imput param here is for HTML not XML, and we don want to parse HTML
    const dom = new jsdom_1.JSDOM("");
    // Get DOMParser, same API as in browser
    const DOMParser = dom.window.DOMParser;
    const parser = new DOMParser();
    // Create document by parsing XML
    const document = parser.parseFromString(xml, "text/xml");
    // save the xml after modifications
    const xmlString = document.querySelector("lastBuildDate").textContent;
    return xmlString;
})
    .then((data) => console.log(data))
    .catch((error) => console.error("error: " + error));
