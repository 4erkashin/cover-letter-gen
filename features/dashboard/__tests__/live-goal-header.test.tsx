import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetter } from "@/domain";

const coverLettersState = vi.hoisted(() => ({
  coverLetters: [] as CoverLetter[],
  isLoading: false,
}));

vi.mock("@/features/persist-storage", () => ({
  useCoverLetters: () => coverLettersState,
}));

vi.mock("@/ui/assets/check-icon.svg", () => ({
  default: () => <svg data-testid="check-icon" />,
}));

import { LiveGoalHeader } from "../goal-header";

beforeEach(() => {
  coverLettersState.coverLetters = [];
  coverLettersState.isLoading = false;
});

describe("LiveGoalHeader", () => {
  it("shows goal progress from the Cover Letter list length", () => {
    coverLettersState.coverLetters = [
      {
        content: "Dear Stripe team,",
        createdAt: "2026-01-01T00:00:00.000Z",
        details: {
          additionalDetails: "I build products.",
          companyName: "Stripe",
          jobTitle: "Designer",
          skills: "design systems",
        },
        id: "1",
        title: "Designer, Stripe",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
      {
        content: "Dear Notion team,",
        createdAt: "2026-01-02T00:00:00.000Z",
        details: {
          additionalDetails: "I ship.",
          companyName: "Notion",
          jobTitle: "Engineer",
          skills: "TypeScript",
        },
        id: "2",
        title: "Engineer, Notion",
        updatedAt: "2026-01-02T00:00:00.000Z",
      },
    ];

    render(<LiveGoalHeader />);

    expect(screen.getByText("2/5 applications generated")).toBeInTheDocument();
  });
});
