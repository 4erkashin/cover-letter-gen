import { describe, expect, it } from "vitest";

import { escapeRegExp } from "../escape-reg-exp";

describe("escapeRegExp", () => {
  it("escapes regex metacharacters so they match literally", () => {
    expect(escapeRegExp("a.b*(c)")).toBe(String.raw`a\.b\*\(c\)`);
  });
});
