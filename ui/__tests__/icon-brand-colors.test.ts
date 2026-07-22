import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { BRAND, BRAND_DARK } from "../theme";

const iconSvg = readFileSync(
  path.resolve(import.meta.dirname, "../../app/icon.svg"),
  "utf8",
);

describe("app/icon.svg brand colors", () => {
  it("uses BRAND for the default fill and BRAND_DARK under prefers-color-scheme: dark", () => {
    expect(iconSvg).toMatch(
      new RegExp(
        String.raw`path\s*\{\s*fill:\s*${escapeRegExp(BRAND)}\s*;`,
      ),
    );
    expect(iconSvg).toMatch(
      new RegExp(
        String.raw`@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*path\s*\{\s*fill:\s*${escapeRegExp(BRAND_DARK)}\s*;`,
      ),
    );
  });
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
