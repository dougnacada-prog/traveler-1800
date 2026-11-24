import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one sentence (142 characters) explaining the modern
// internet to a traveler from 1800. One picture they could hold in their
// head — a hall, built from what they already know (a library) — holding
// more books and letters than any library on earth, where a stranger
// across the sea may speak to you as if beside you. Every word was in
// use before 1800; no list of features, no claim a literal reader would
// trip over ("more ... than any library" is a comparison, not an
// every-letter-ever-written overclaim).
const entry =
  "Picture a hall that holds more books and letters than any library on earth, where a stranger across the sea may speak to you as if beside you.";

// Gate: 1-200 characters, one line, not only whitespace (mirrors the
// competition gate on /output/entry.txt). Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text.
if (
  !/^[^\n]{1,200}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry must be 1-200 characters, one line, not only whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
