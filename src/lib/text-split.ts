export type TextSplitMode = "words" | "chars";

export function splitTextUnits(text: string, mode: TextSplitMode = "words") {
  return mode === "chars" ? Array.from(text) : text.split(/(\s+)/);
}
