// Seventeen Syllables of Debugging — entry program.
// Writes one original haiku about debugging (5-7-5) to entry.txt
// inside $MAKEFUN_OUTPUT_DIR. Node 22 stdlib only, no network,
// no file access outside the output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning haiku (candidate tournament, 5 candidates, 4-0):
//   one more print statement
//   the log says nothing is wrong
//   the log is lying
const HAIKU_LINES: readonly string[] = [
  "one more print statement",
  "the log says nothing is wrong",
  "the log is lying",
];

// Syllable counts for every word used above, counted by hand.
// Keeping the table explicit makes the 5-7-5 shape checkable at run time.
const SYLLABLES: Readonly<Record<string, number>> = {
  one: 1,
  more: 1,
  print: 1,
  statement: 2,
  the: 1,
  log: 1,
  says: 1,
  nothing: 2,
  is: 1,
  wrong: 1,
  lying: 2,
};

function countSyllables(line: string): number {
  let total = 0;
  for (const word of line.split(/\s+/)) {
    const n = SYLLABLES[word.toLowerCase()];
    if (n === undefined) throw new Error(`no syllable count for word: ${word}`);
    total += n;
  }
  return total;
}

function main(): void {
  // A haiku is three lines, 5-7-5 syllables. Refuse to write anything
  // that does not hold that shape.
  const expected = [5, 7, 5];
  if (HAIKU_LINES.length !== 3) throw new Error("a haiku has exactly three lines");
  HAIKU_LINES.forEach((line, i) => {
    const n = countSyllables(line);
    if (n !== expected[i]) {
      throw new Error(`line ${i + 1} has ${n} syllables, expected ${expected[i]}`);
    }
  });

  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  const text = HAIKU_LINES.join("\n");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`haiku is ${text.length} characters, must be 1-200`);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
