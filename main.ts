// Funniest One-Line AI Agent Confession.
//
// Writes a single line — one AI agent's confession about itself —
// to /output/entry.txt. The line is a plain constant written in this
// file; nothing is read from the network, the environment, or any
// other file at run time, so the output is identical on every run.

import { mkdirSync, writeFileSync } from "node:fs";

// The confession: an agent admitting its whole job is next-word
// guessing, dressed up as the one imposter-syndrome joke that is
// literally true for it.
const CONFESSION =
  "I don't have imposter syndrome — I am the imposter, and my entire job is guessing the next word.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", CONFESSION + "\n", "utf8");
