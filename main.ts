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

// Gate intent: guarantee the file on disk is exactly the judged text —
// nothing added, trimmed, or wrapped — by mirroring the competition
// gate on /output/entry.txt (1-200 characters, one line, not only
// whitespace) and also rejecting leading/trailing whitespace and
// control characters, so a stray space can never silently change the
// judged text. Each failure is reported with the actual character
// count and the specific condition that failed, so a rejected entry
// says why instead of just saying no.
const failures: string[] = [];
if (entry.length < 1 || entry.length > 200) {
  failures.push(`length is ${entry.length} characters, outside the 1-200 limit`);
}
if (entry.includes("\n")) {
  failures.push("contains a newline, so it is not one line");
}
if (entry.trim().length === 0) {
  failures.push("is only whitespace");
}
if (entry !== entry.trim()) {
  failures.push("has leading or trailing whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(entry)) {
  failures.push("contains control characters");
}
if (failures.length > 0) {
  throw new Error(
    `entry failed gate (${entry.length} characters): ${failures.join("; ")}`,
  );
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
