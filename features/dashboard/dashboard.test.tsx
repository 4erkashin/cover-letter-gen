import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetter } from "@/domain";

const coverLettersState = vi.hoisted(() => ({
  coverLetters: [] as CoverLetter[],
  isLoading: false,
}));

const removeCoverLetter = vi.hoisted(() => vi.fn());
const saveCoverLetter = vi.hoisted(() => vi.fn());
const showToast = vi.hoisted(() => vi.fn((..._args: unknown[]) => "toast-1"));
const hideToast = vi.hoisted(() => vi.fn());

vi.mock("@/features/persist-storage", () => ({
  useCoverLetters: () => coverLettersState,
  removeCoverLetter,
  saveCoverLetter,
}));

vi.mock("reshaped", async (importOriginal) => {
  const actual = await importOriginal<typeof import("reshaped")>();
  return {
    ...actual,
    useToast: () => ({ show: showToast, hide: hideToast }),
  };
});

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

vi.mock("@/ui/assets/copy-icon.svg", () => ({
  default: () => <svg data-testid="copy-icon" />,
}));

vi.mock("@/ui/assets/trash-icon.svg", () => ({
  default: () => <svg data-testid="trash-icon" />,
}));

import { Dashboard } from "./dashboard";

function makeCoverLetter(
  id: string,
  content = "Dear Stripe team,",
): CoverLetter {
  return {
    id,
    title: "Designer, Stripe",
    content,
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
    removeCoverLetter.mockReset();
    saveCoverLetter.mockReset();
    showToast.mockReset();
    showToast.mockReturnValue("toast-1");
    hideToast.mockReset();
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

  it("lists Cover Letters as cards that open the edit route", () => {
    coverLettersState.coverLetters = [
      makeCoverLetter("a", "Dear Apple team,"),
      makeCoverLetter("b", "Dear Stripe team,"),
    ];
    render(<Dashboard />);

    expect(
      screen.getByRole("link", { name: /dear apple team/i }),
    ).toHaveAttribute("href", "/a");
    expect(
      screen.getByRole("link", { name: /dear stripe team/i }),
    ).toHaveAttribute("href", "/b");
    expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(2);
    expect(
      screen.getAllByRole("button", { name: /copy to clipboard/i }),
    ).toHaveLength(2);
  });

  it("deletes immediately and offers undo via toast", () => {
    const letter = makeCoverLetter("a", "Dear Apple team,");
    coverLettersState.coverLetters = [letter];
    render(<Dashboard />);

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(removeCoverLetter).toHaveBeenCalledWith("a");
    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Cover letter deleted",
        actionsSlot: expect.anything(),
      }),
    );

    const toastCall = showToast.mock.calls[0][0] as {
      actionsSlot: React.ReactElement;
    };
    render(toastCall.actionsSlot);
    fireEvent.click(screen.getByRole("button", { name: /undo/i }));

    expect(saveCoverLetter).toHaveBeenCalledWith(letter);
    expect(hideToast).toHaveBeenCalledWith("toast-1");
  });

  it("keeps the goal banner synced to list length after delete", () => {
    coverLettersState.coverLetters = [
      makeCoverLetter("1"),
      makeCoverLetter("2"),
      makeCoverLetter("3"),
    ];
    const { rerender } = render(<Dashboard />);
    expect(screen.getByText("3 out of 5")).toBeInTheDocument();

    coverLettersState.coverLetters = [
      makeCoverLetter("1"),
      makeCoverLetter("2"),
    ];
    rerender(<Dashboard />);

    expect(screen.getByText("2 out of 5")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Hit your goal" }),
    ).toBeInTheDocument();
  });
});
