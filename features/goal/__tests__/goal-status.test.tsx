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

import { Goal } from "../index";

function letter(partial: Partial<CoverLetter> & Pick<CoverLetter, "id">): CoverLetter {
  return {
    content: "Dear team,",
    createdAt: "2026-01-01T00:00:00.000Z",
    details: {
      additionalDetails: "Details",
      companyName: "Acme",
      jobTitle: "Designer",
      skills: "design",
    },
    title: "Designer, Acme",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...partial,
  };
}

beforeEach(() => {
  coverLettersState.coverLetters = [];
  coverLettersState.isLoading = false;
});

describe("Goal.Status", () => {
  it("shows goal progress from the Cover Letter list length", () => {
    coverLettersState.coverLetters = [letter({ id: "1" }), letter({ id: "2" })];

    render(
      <Goal.Root>
        <Goal.Status />
      </Goal.Root>,
    );

    expect(screen.getByText("2/5 applications generated")).toBeInTheDocument();
  });

  it("shows progress dots while the goal is in progress", () => {
    coverLettersState.coverLetters = [
      letter({ id: "1" }),
      letter({ id: "2" }),
      letter({ id: "3" }),
    ];

    const { container } = render(
      <Goal.Root>
        <Goal.Status />
      </Goal.Root>,
    );

    expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-progress-dot="true"]'),
    ).toHaveLength(5);
    expect(
      container.querySelectorAll(
        '[data-progress-dot="true"][data-active="true"]',
      ),
    ).toHaveLength(3);
  });

  it("shows a check when the goal is reached", () => {
    coverLettersState.coverLetters = Array.from({ length: 5 }, (_, index) =>
      letter({ id: String(index) }),
    );

    render(
      <Goal.Root>
        <Goal.Status />
      </Goal.Root>,
    );

    expect(screen.getByText("5/5 applications generated")).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("shows a skeleton while persistence is loading", () => {
    coverLettersState.isLoading = true;

    render(
      <Goal.Root>
        <Goal.Status />
      </Goal.Root>,
    );

    expect(screen.getByTestId("goal-status-skeleton")).toBeInTheDocument();
    expect(
      screen.queryByText(/applications generated/),
    ).not.toBeInTheDocument();
  });
});
