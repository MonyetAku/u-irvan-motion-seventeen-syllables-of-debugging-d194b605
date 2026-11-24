// Seventeen Syllables of Debugging — final iteration.
// Writes exactly one 5-7-5 haiku about debugging to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Node 22 stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HAIKU: readonly string[] = [
  "just one small typo",
  "three hours lost to find it",
  "one comma missing",
];

const TARGET = [5, 7, 5] as const;

// Exact syllable counts for every word in the haiku. A lookup
// table keeps the count exact instead of guessing with a
// heuristic, so the 5-7-5 check is trustworthy.
const SYLLABLES: Readonly<Record<string, number>> = {
  just: 1,
  one: 1,
  small: 1,
  typo: 2,
  three: 1,
  hours: 2,
  lost: 1,
  to: 1,
  find: 1,
  it: 1,
  comma: 2,
  missing: 2,
};

function countLine(line: string): number {
  let total = 0;
  for (const word of line.split(" ")) {
    const n = SYLLABLES[word];
    if (n === undefined) {
      throw new Error(`no syllable count for word: ${word}`);
    }
    total += n;
  }
  return total;
}

for (let i = 0; i < HAIKU.length; i++) {
  const got = countLine(HAIKU[i]);
  if (got !== TARGET[i]) {
    throw new Error(
      `line ${i + 1}: expected ${TARGET[i]} syllables, got ${got}`,
    );
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const text = HAIKU.join("\n");
if (text.length > 200) {
  throw new Error(`haiku is ${text.length} chars, over the 200 limit`);
}
if (text.endsWith("\n")) {
  throw new Error("haiku must not end with a trailing newline");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
