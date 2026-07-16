import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetter, CoverLetterDetails } from "@/domain";

const replace = vi.hoisted(() => vi.fn());
const saveCoverLetter = vi.hoisted(() => vi.fn());
const showToast = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

vi.mock("@/features/persist-storage", () => ({
  saveCoverLetter,
  updateCoverLetter: vi.fn(),
}));

vi.mock("reshaped", async (importOriginal) => {
  const actual = await importOriginal<typeof import("reshaped")>();
  return {
    ...actual,
    useToast: () => ({ show: showToast }),
  };
});

vi.mock("@/ui/assets/copy-icon.svg", () => ({
  default: () => <svg data-testid="copy-icon" />,
}));

import { CreateCoverLetter } from "./create-cover-letter";

const validDetails: CoverLetterDetails = {
  jobTitle: "Product manager",
  companyName: "Apple",
  skills: "HTML, CSS and doing things in time",
  additionalDetails:
    "I want to help you build awesome solutions to accomplish your goals and vision",
};

function fillField(label: string | RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillValidForm() {
  fillField("Job title", validDetails.jobTitle);
  fillField("Company", validDetails.companyName);
  fillField("I am good at…", validDetails.skills);
  fillField("Additional details", validDetails.additionalDetails);
}

describe("CreateCoverLetter", () => {
  beforeEach(() => {
    replace.mockReset();
    saveCoverLetter.mockReset();
    showToast.mockReset();
  });

  it("marks the preview busy with the Preloader while generation is in flight", async () => {
    let resolveGenerate!: (letter: CoverLetter) => void;
    const generate = vi.fn(
      () =>
        new Promise<CoverLetter>((resolve) => {
          resolveGenerate = resolve;
        }),
    );

    render(<CreateCoverLetter generateCoverLetter={generate} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Generate Now" }));

    await waitFor(() => {
      expect(
        screen.getByRole("region", { name: "Generated letter preview" }),
      ).toHaveAttribute("aria-busy", "true");
      expect(screen.getByTestId("letter-preloader")).toBeInTheDocument();
    });

    resolveGenerate({
      id: "letter-id",
      title: "Product manager, Apple",
      content: "Dear Apple Team,\n\nI am writing to express my interest.",
      details: validDetails,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    });

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/letter-id");
    });

    // Preview stays busy through navigation so the empty placeholder never flashes.
    expect(
      screen.getByRole("region", { name: "Generated letter preview" }),
    ).toHaveAttribute("aria-busy", "true");
    expect(screen.getByTestId("letter-preloader")).toBeInTheDocument();
  });

  it("stops the preview Preloader when generation fails", async () => {
    const generate = vi.fn().mockRejectedValue(new Error("generate failed"));

    render(<CreateCoverLetter generateCoverLetter={generate} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Generate Now" }));

    await waitFor(() => {
      expect(showToast).toHaveBeenCalled();
      expect(
        screen.getByRole("region", { name: "Generated letter preview" }),
      ).not.toHaveAttribute("aria-busy");
      expect(screen.queryByTestId("letter-preloader")).not.toBeInTheDocument();
    });
  });
});
