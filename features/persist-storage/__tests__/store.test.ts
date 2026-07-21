import { beforeEach, describe, expect, it } from "vitest";

import type { CoverLetter } from "@/domain";

import {
  getCoverLetters,
  removeCoverLetter,
  resetCoverLettersForTests,
  saveCoverLetter,
  STORAGE_KEY,
  updateCoverLetter,
} from "../store";

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

describe("cover letter persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    resetCoverLettersForTests();
  });

  it("saves a Cover Letter so it is listed", () => {
    const letter = makeCoverLetter();
    saveCoverLetter(letter);

    expect(getCoverLetters()).toEqual([letter]);
  });

  it("prepends newer saves and keeps distinct ids for goal progress", () => {
    const first = makeCoverLetter({ id: "a" });
    const second = makeCoverLetter({ id: "b", title: "Engineer, Notion" });

    saveCoverLetter(first);
    saveCoverLetter(second);

    expect(getCoverLetters().map((letter) => letter.id)).toEqual(["b", "a"]);
    expect(getCoverLetters()).toHaveLength(2);
  });

  it("replaces an existing id on save so progress stays distinct", () => {
    saveCoverLetter(makeCoverLetter({ content: "v1", id: "a" }));
    saveCoverLetter(makeCoverLetter({ content: "v2", id: "a" }));

    expect(getCoverLetters()).toHaveLength(1);
    expect(getCoverLetters()[0]?.content).toBe("v2");
  });

  it("updates a Cover Letter in place without changing list length", () => {
    saveCoverLetter(makeCoverLetter({ content: "v1", id: "a" }));
    saveCoverLetter(makeCoverLetter({ content: "other", id: "b" }));

    updateCoverLetter({
      ...makeCoverLetter({ content: "v2", id: "a", title: "Updated" }),
    });

    expect(getCoverLetters()).toHaveLength(2);
    expect(getCoverLetters().find((letter) => letter.id === "a")).toMatchObject(
      {
        content: "v2",
        title: "Updated",
      },
    );
  });

  it("removes a Cover Letter by id", () => {
    saveCoverLetter(makeCoverLetter({ id: "a" }));
    saveCoverLetter(makeCoverLetter({ id: "b" }));

    removeCoverLetter("a");

    expect(getCoverLetters().map((letter) => letter.id)).toEqual(["b"]);
  });

  it("writes to localStorage so a reload can restore the list", () => {
    const letter = makeCoverLetter();
    saveCoverLetter(letter);

    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw!)).toEqual([letter]);

    // Wipe in-memory state (also clears the key), then restore and rehydrate.
    resetCoverLettersForTests();
    localStorage.clear();
    resetCoverLettersForTests();
    expect(getCoverLetters()).toEqual([]);

    localStorage.setItem(STORAGE_KEY, raw!);
    resetCoverLettersForTests();
    expect(getCoverLetters()).toEqual([letter]);
  });

  it("syncs when another tab updates localStorage", () => {
    saveCoverLetter(makeCoverLetter({ id: "local" }));

    const fromOtherTab = [makeCoverLetter({ id: "remote", title: "Remote" })];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fromOtherTab));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEY,
        newValue: JSON.stringify(fromOtherTab),
        storageArea: localStorage,
      }),
    );

    expect(getCoverLetters()).toEqual(fromOtherTab);
  });
});
