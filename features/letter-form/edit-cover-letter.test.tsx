import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetter, CoverLetterDetails } from "@/domain";

const replace = vi.hoisted(() => vi.fn());
const saveCoverLetter = vi.hoisted(() => vi.fn());
const updateCoverLetter = vi.hoisted(() => vi.fn());
const showToast = vi.hoisted(() => vi.fn());
const useCoverLetters = vi.hoisted(() =>
  vi.fn(() => ({ coverLetters: [] as CoverLetter[], isLoading: false })),
);

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
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

vi.mock("@/ui/assets/copy-icon.svg", () => ({
  default: () => <svg data-testid="copy-icon" />,
}));

vi.mock("@/features/persist-storage", () => ({
  saveCoverLetter,
  updateCoverLetter,
  useCoverLetters,
}));

vi.mock("reshaped", async (importOriginal) => {
  const actual = await importOriginal<typeof import("reshaped")>();
  return {
    ...actual,
    useToast: () => ({ show: showToast }),
  };
});

import { EditCoverLetter } from "./edit-cover-letter";

const validDetails: CoverLetterDetails = {
  jobTitle: "Product manager",
  companyName: "Apple",
  skills: "HTML, CSS and doing things in time",
  additionalDetails:
    "I want to help you build awesome solutions to accomplish your goals and vision",
};

const existingLetter: CoverLetter = {
  id: "existing-id",
  title: "Product manager, Apple",
  content: "Old letter body",
  details: validDetails,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("EditCoverLetter", () => {
  beforeEach(() => {
    replace.mockReset();
    saveCoverLetter.mockReset();
    updateCoverLetter.mockReset();
    showToast.mockReset();
    useCoverLetters.mockReturnValue({
      coverLetters: [existingLetter],
      isLoading: false,
    });
  });

  it("shows Try Again, seeded fields, and the last-good letter preview", () => {
    render(<EditCoverLetter coverLetter={existingLetter} />);

    expect(screen.getByRole("button", { name: "Try Again" })).toBeEnabled();
    expect(screen.getByLabelText("Job title")).toHaveValue(
      validDetails.jobTitle,
    );
    expect(
      screen.getByRole("region", { name: "Generated letter preview" }),
    ).toHaveTextContent("Old letter body");
  });

  it("shows GoalBanner when the goal is not yet reached", () => {
    render(<EditCoverLetter coverLetter={existingLetter} />);

    expect(
      screen.getByRole("heading", { name: "Hit your goal" }),
    ).toBeInTheDocument();
  });

  it("hides GoalBanner when the goal is reached", () => {
    useCoverLetters.mockReturnValue({
      coverLetters: Array.from({ length: 5 }, (_, index) => ({
        ...existingLetter,
        id: `letter-${index}`,
      })),
      isLoading: false,
    });

    render(<EditCoverLetter coverLetter={existingLetter} />);

    expect(
      screen.queryByRole("heading", { name: "Hit your goal" }),
    ).not.toBeInTheDocument();
  });

  it("shows the Preloader while Try Again is in flight", async () => {
    let resolveGenerate!: (letter: CoverLetter) => void;
    const generate = vi.fn(
      () =>
        new Promise<CoverLetter>((resolve) => {
          resolveGenerate = resolve;
        }),
    );

    render(
      <EditCoverLetter
        coverLetter={existingLetter}
        generateCoverLetter={generate}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));

    await waitFor(() => {
      expect(
        screen.getByRole("region", { name: "Generated letter preview" }),
      ).toHaveAttribute("aria-busy", "true");
      expect(screen.getByTestId("letter-preloader")).toBeInTheDocument();
    });

    resolveGenerate({
      ...existingLetter,
      id: "brand-new-id",
      content: "New letter body",
    });

    await waitFor(() => {
      expect(
        screen.getByRole("region", { name: "Generated letter preview" }),
      ).toHaveTextContent("New letter body");
      expect(screen.queryByTestId("letter-preloader")).not.toBeInTheDocument();
      expect(replace).not.toHaveBeenCalled();
    });
  });

  it("keeps the last-good preview and announces failure when Try Again fails", async () => {
    const generate = vi.fn().mockRejectedValue(new Error("generate failed"));

    render(
      <EditCoverLetter
        coverLetter={existingLetter}
        generateCoverLetter={generate}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        color: "critical",
        position: "bottom-end",
        title: "Generation failed",
        text: "Could not generate the letter. Try again later.",
      });
      expect(screen.getByRole("status")).toHaveTextContent(
        "Generation failed. Could not generate the letter.",
      );
    });

    expect(
      screen.getByRole("region", { name: "Generated letter preview" }),
    ).toHaveTextContent("Old letter body");
    expect(
      screen.getByRole("region", { name: "Generated letter preview" }),
    ).not.toHaveAttribute("aria-busy");
    expect(saveCoverLetter).not.toHaveBeenCalled();
    expect(updateCoverLetter).not.toHaveBeenCalled();
    expect(replace).not.toHaveBeenCalled();
  });
});
