// Round-2 haiku for "Seventeen Syllables of Debugging".
// Writes the winning haiku — three lines, 5-7-5, 68 characters — to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt by default),
// verifying the 5-7-5 syllable shape at run time.
import { mkdirSync, writeFileSync } from "node:fs";

// Syllable counts for every word in the haiku below.
const syllables: Record<string, number> = {
  git: 1, blame: 1, points: 1, at: 1, me: 1,
  the: 1, commit: 2, is: 1, from: 1, last: 1, spring: 1,
  i: 1, "don't": 1, remember: 3,
};

const haiku = [
  "git blame points at me",
  "the commit is from last spring",
  "i don't remember",
];

const shape = [5, 7, 5];
haiku.forEach((line, i) => {
  const count = line.split(" ").reduce((n, w) => n + (syllables[w] ?? 0), 0);
  if (count !== shape[i]) {
    throw new Error(`line ${i + 1}: ${count} syllables, expected ${shape[i]}`);
  }
});

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, haiku.join("\n"));
