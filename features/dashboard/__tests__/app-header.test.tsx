import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetter } from "@/domain";

const usePathname = vi.fn(() => "/");

const coverLettersState = vi.hoisted(() => ({
  coverLetters: [] as CoverLetter[],
  isLoading: false,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
  >) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/features/persist-storage", () => ({
  useCoverLetters: () => coverLettersState,
}));

vi.mock("@/ui/assets/app-logo.svg", () => ({
  default: () => <svg data-testid="app-logo" />,
}));

vi.mock("@/ui/assets/home-icon.svg", () => ({
  default: () => <svg data-testid="home-icon" />,
}));

vi.mock("@/ui/assets/check-icon.svg", () => ({
  default: () => <svg data-testid="check-icon" />,
}));

import { AppHeader } from "../app-header";

beforeEach(() => {
  coverLettersState.coverLetters = [];
  coverLettersState.isLoading = false;
});

describe("AppHeader", () => {
  it("links brand to the dashboard and keeps it non-tabbable there", () => {
    usePathname.mockReturnValue("/");

    render(<AppHeader />);

    const brand = screen.getByRole("link", { name: /alt\+shift/i });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand).toHaveAttribute("tabindex", "-1");
  });

  it("makes brand tabbable when not on the dashboard", () => {
    usePathname.mockReturnValue("/new");

    render(<AppHeader />);

    const brand = screen.getByRole("link", { name: /alt\+shift/i });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand).not.toHaveAttribute("tabindex", "-1");
  });

  it("provides a Home control that goes to the dashboard", () => {
    usePathname.mockReturnValue("/new");

    render(<AppHeader />);

    const home = screen.getByRole("link", { name: /home/i });
    expect(home).toHaveAttribute("href", "/");
  });

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

    render(<AppHeader />);

    expect(screen.getByText("2/5 applications generated")).toBeInTheDocument();
  });
});
