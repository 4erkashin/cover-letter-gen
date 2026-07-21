import { describe, expect, it } from "vitest";

import {
  type CoverLetter,
  coverLetterTitle,
  findCoverLetter,
  GOAL_TARGET,
  goalProgress,
  overwriteCoverLetter,
} from "../cover-letters";

function makeCoverLetter(overrides: Partial<CoverLetter> = {}): CoverLetter {
  return {
    content: "Dear Stripe team,",
    createdAt: "2026-01-01T00:00:00.000Z",
    details: {
      additionalDetails: "I build products.",
      companyName: "Stripe",
      jobTitle: "Designer",
      skills: "design systems",
    },
    id: "letter-1",
    title: "Designer, Stripe",
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
      isReached: false,
      target: 5,
    });
    expect(goalProgress(3)).toEqual({
      count: 3,
      isReached: false,
      target: 5,
    });
    expect(goalProgress(5)).toEqual({
      count: 5,
      isReached: true,
      target: 5,
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

describe("coverLetterTitle", () => {
  it("formats job title and company for display and persistence", () => {
    expect(coverLetterTitle("Product manager", "Apple")).toBe(
      "Product manager, Apple",
    );
  });
});

describe("overwriteCoverLetter", () => {
  it("keeps id and createdAt while replacing title, content, details, and updatedAt", () => {
    const existing = makeCoverLetter({
      content: "Old letter body",
      createdAt: "2026-01-01T00:00:00.000Z",
      id: "same-id",
      title: "Designer, Stripe",
      updatedAt: "2026-01-01T00:00:00.000Z",
    });
    const generated = {
      content: "New letter body",
      details: {
        additionalDetails: "I ship products.",
        companyName: "Notion",
        jobTitle: "Engineer",
        skills: "TypeScript",
      },
      title: "Engineer, Notion",
    };

    const next = overwriteCoverLetter(existing, generated);

    expect(next.id).toBe("same-id");
    expect(next.createdAt).toBe("2026-01-01T00:00:00.000Z");
    expect(next.title).toBe("Engineer, Notion");
    expect(next.content).toBe("New letter body");
    expect(next.details).toEqual(generated.details);
    expect(next.updatedAt).not.toBe(existing.updatedAt);
  });
});
