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

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<
    { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  >) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/ui/assets/plus-icon.svg", () => ({
  default: () => <svg data-testid="plus-icon" />,
}));

vi.mock("@/ui/assets/check-icon.svg", () => ({
  default: () => <svg data-testid="check-icon" />,
}));

import { Dashboard } from "./dashboard";

function makeCoverLetter(id: string): CoverLetter {
  return {
    id,
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
  };
}

describe("Dashboard", () => {
  beforeEach(() => {
    coverLettersState.coverLetters = [];
    coverLettersState.isLoading = false;
  });

  it("shows locked empty-state copy when there are no Cover Letters", () => {
    render(<Dashboard />);

    expect(
      screen.getByRole("heading", { name: "No applications yet" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Create your first one and it will show up here."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Hit your goal" }),
    ).toBeInTheDocument();
    expect(screen.getByText("0 out of 5")).toBeInTheDocument();
  });

  it("sends every Create New CTA to /new", () => {
    render(<Dashboard />);

    const createLinks = screen.getAllByRole("link", { name: /create new/i });
    expect(createLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of createLinks) {
      expect(link).toHaveAttribute("href", "/new");
    }
  });

  it("shows the Hit your goal banner while below target and hides it at 5", () => {
    coverLettersState.coverLetters = [
      makeCoverLetter("1"),
      makeCoverLetter("2"),
      makeCoverLetter("3"),
    ];
    const { rerender } = render(<Dashboard />);

    expect(
      screen.getByRole("heading", { name: "Hit your goal" }),
    ).toBeInTheDocument();
    expect(screen.getByText("3 out of 5")).toBeInTheDocument();
    expect(screen.queryByText("No applications yet")).not.toBeInTheDocument();

    coverLettersState.coverLetters = [
      makeCoverLetter("1"),
      makeCoverLetter("2"),
      makeCoverLetter("3"),
      makeCoverLetter("4"),
      makeCoverLetter("5"),
    ];
    rerender(<Dashboard />);

    expect(
      screen.queryByRole("heading", { name: "Hit your goal" }),
    ).not.toBeInTheDocument();
  });
});
