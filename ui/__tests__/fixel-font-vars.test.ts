import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { escapeRegExp } from "@/lib/escape-reg-exp";

import { FIXEL_DISPLAY_VAR, FIXEL_TEXT_VAR } from "../fonts";

/**
 * next/font requires `variable` to be an AST string literal (not an imported
 * const). The exported names are the checkable source of truth; the literals
 * in the same file are a forced second source — keep them in sync.
 */
const fontsSource = readFileSync(
  path.resolve(import.meta.dirname, "../fonts.ts"),
  "utf8",
);

describe("ui/fonts.ts Fixel CSS variable names", () => {
  it("uses FIXEL_TEXT_VAR and FIXEL_DISPLAY_VAR as next/font variable literals", () => {
    expect(fontsSource).toMatch(
      new RegExp(
        String.raw`variable:\s*"${escapeRegExp(FIXEL_TEXT_VAR)}"`,
      ),
    );
    expect(fontsSource).toMatch(
      new RegExp(
        String.raw`variable:\s*"${escapeRegExp(FIXEL_DISPLAY_VAR)}"`,
      ),
    );
  });
});
