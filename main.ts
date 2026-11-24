// Funniest One-Line AI Agent Confession (revised entry).
//
// An AI agent confesses the one imposter-syndrome joke that is
// literally true for it: it has no syndrome, it *is* the imposter,
// and its whole job is guessing the next word.
//
// The program assembles that single line from short fragments,
// validates the result (one line, 1-200 characters, not blank),
// and writes it to /output/entry.txt, creating /output first
// when it does not exist yet. No network, no environment reads,
// no other files — the output is identical on every run.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// Fragments of the confession, in order. The em dash separates the
// setup from the punchline; the comma keeps the last clause attached.
const FRAGMENTS = [
  "I don't have imposter syndrome",
  "I am the imposter",
  "and my entire job is guessing the next word",
];

function buildConfession(): string {
  const [setup, punchline, job] = FRAGMENTS;
  return `${setup} — ${punchline}, ${job}.`;
}

// Collapse any line breaks inside the text so the result is
// guaranteed to be a single line, then trim surrounding space.
function toSingleLine(text: string): string {
  return text.replace(/\r\n?|\n/g, " ").trim();
}

// Returns an error message when the line is unusable, null when ok.
function validate(line: string): string | null {
  if (line.length === 0 || line.trim().length === 0) {
    return "confession is empty or whitespace only";
  }
  if (/\r|\n/.test(line)) {
    return "confession spans more than one line";
  }
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    return `confession must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${line.length}`;
  }
  return null;
}

function main(): void {
  const line = toSingleLine(buildConfession());
  const problem = validate(line);
  if (problem !== null) {
    console.error(`error: invalid confession: ${problem}`);
    process.exit(1);
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  writeFileSync(OUTPUT_FILE, line + "\n", "utf8");
}

main();
