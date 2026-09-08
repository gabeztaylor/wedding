import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const stylesheet = await readFile(
  new URL("../styles.css", import.meta.url),
  "utf8",
);

const requiredHtml = [
  "<!doctype html>",
  '<meta name="viewport"',
  '<link rel="stylesheet" href="styles.css"',
  "<main",
  "<h1",
];

for (const fragment of requiredHtml) {
  if (!html.toLowerCase().includes(fragment)) {
    throw new Error(`Missing required HTML fragment: ${fragment}`);
  }
}

if (stylesheet.trim().length === 0) {
  throw new Error("styles.css is empty");
}

console.log("Site check passed.");
