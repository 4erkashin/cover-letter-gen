import { describe, expect, it } from "vitest";

import { findCoverLetter } from "./cover-letters";

describe("findCoverLetter", () => {
  it("treats every id as missing until persistence lands", () => {
    expect(findCoverLetter("abc")).toBeNull();
    expect(findCoverLetter("")).toBeNull();
  });
});
