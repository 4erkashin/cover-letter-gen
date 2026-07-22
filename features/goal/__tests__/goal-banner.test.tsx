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

describe("Goal.Banner", () => {
  it("shows Hit your goal copy, meter, and action while below target", () => {
    coverLettersState.coverLetters = [letter({ id: "1" }), letter({ id: "2" })];

    render(
      <Goal.Root>
        <Goal.Banner action={<button type="button">Create New</button>} />
      </Goal.Root>,
    );

    expect(
      screen.getByRole("heading", { name: "Hit your goal" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Generate and send out couple more job applications today to get hired faster",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("2 out of 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create new/i })).toBeInTheDocument();
  });

  it("renders nothing when the goal is reached", () => {
    coverLettersState.coverLetters = Array.from({ length: 5 }, (_, index) =>
      letter({ id: String(index) }),
    );

    const { container } = render(
      <Goal.Root>
        <Goal.Banner action={<button type="button">Create New</button>} />
      </Goal.Root>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing while persistence is loading", () => {
    coverLettersState.isLoading = true;

    const { container } = render(
      <Goal.Root>
        <Goal.Banner action={<button type="button">Create New</button>} />
      </Goal.Root>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
