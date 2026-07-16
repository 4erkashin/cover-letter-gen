import { describe, expect, it } from "vitest";

import {
  GOAL_TARGET,
  findCoverLetter,
  goalProgress,
  type CoverLetter,
} from "./cover-letters";

function makeCoverLetter(overrides: Partial<CoverLetter> = {}): CoverLetter {
  return {
    id: "letter-1",
    title: "Designer, Stripe",
    content: "Dear Stripe team,",
    details: {
      jobTitle: "Designer",
      companyName: "Stripe",
      skills: "design systems",
      additionalDetails: "I build products.",
    },
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("GOAL_TARGET", () => {
  it("is 5 distinct saved Cover Letters", () => {
    expect(GOAL_TARGET).toBe(5);
  });
});

describe("goalProgress", () => {
  it("reports progress from list length against the goal target", () => {
    expect(goalProgress(0)).toEqual({
      count: 0,
      target: 5,
      isReached: false,
    });
    expect(goalProgress(3)).toEqual({
      count: 3,
      target: 5,
      isReached: false,
    });
    expect(goalProgress(5)).toEqual({
      count: 5,
      target: 5,
      isReached: true,
    });
  });

  it("treats counts above the target as reached", () => {
    expect(goalProgress(6).isReached).toBe(true);
  });
});

describe("findCoverLetter", () => {
  it("returns the Cover Letter with the matching id", () => {
    const letters = [
      makeCoverLetter({ id: "a" }),
      makeCoverLetter({ id: "b", title: "Engineer, Notion" }),
    ];

    expect(findCoverLetter(letters, "b")?.title).toBe("Engineer, Notion");
  });

  it("returns null when the id is missing", () => {
    expect(findCoverLetter([makeCoverLetter()], "missing")).toBeNull();
    expect(findCoverLetter([], "a")).toBeNull();
  });
});
