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
}));

vi.mock("reshaped", async (importOriginal) => {
  const actual = await importOriginal<typeof import("reshaped")>();
  return {
    ...actual,
    useToast: () => ({ show: showToast }),
  };
});

import { LetterForm } from "./letter-form";

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

function fillValidForm(overrides: Partial<CoverLetterDetails> = {}) {
  const details = { ...validDetails, ...overrides };
  fillField("Job title", details.jobTitle);
  fillField("Company", details.companyName);
  fillField("I am good at…", details.skills);
  fillField("Additional details", details.additionalDetails);
  return details;
}

describe("LetterForm", () => {
  beforeEach(() => {
    replace.mockReset();
    saveCoverLetter.mockReset();
    showToast.mockReset();
  });

  it("shows empty-state labels, placeholder, counter, and muted Generate Now", () => {
    render(<LetterForm />);

    expect(
      screen.getByRole("heading", { name: "New application" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Job title")).toHaveAttribute(
      "placeholder",
      "Product manager",
    );
    expect(screen.getByLabelText("Company")).toHaveAttribute(
      "placeholder",
      "Apple",
    );
    expect(screen.getByLabelText("I am good at…")).toHaveAttribute(
      "placeholder",
      "HTML, CSS and doing things in time",
    );
    expect(screen.getByLabelText("Additional details")).toHaveAttribute(
      "placeholder",
      "Describe why you are a great fit or paste your bio",
    );
    expect(screen.getByText("0/1200")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Generate Now" })).toBeDisabled();
  });

  it("updates FormHeader and enables Generate Now when the form is valid", () => {
    render(<LetterForm />);

    fillValidForm();

    expect(
      screen.getByRole("heading", { name: "Product manager, Apple" }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${validDetails.additionalDetails.length}/1200`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Generate Now" })).toBeEnabled();
  });

  it("marks Additional details over-limit and keeps Generate Now disabled", () => {
    render(<LetterForm />);

    const overLimit = "x".repeat(1201);
    fillValidForm({ additionalDetails: overLimit });

    expect(screen.getByText("1201/1200")).toHaveAttribute(
      "data-over-limit",
      "true",
    );
    expect(screen.getByLabelText("Additional details")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("button", { name: "Generate Now" })).toBeDisabled();
  });

  it("persists a generated Cover Letter and replace-navigates to /[id] on success", async () => {
    const generatedLetter: CoverLetter = {
      id: "letter-id",
      title: "Product manager, Apple",
      content: "Dear Apple Team,\n\nI am writing to express my interest.",
      details: validDetails,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const generate = vi.fn().mockResolvedValue(generatedLetter);

    render(<LetterForm generateCoverLetter={generate} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Generate Now" }));

    await waitFor(() => {
      expect(generate).toHaveBeenCalledWith(validDetails);
      expect(saveCoverLetter).toHaveBeenCalledWith(generatedLetter);
      expect(replace).toHaveBeenCalledWith("/letter-id");
    });
  });

  it("keeps the form, writes nothing, and announces an error when generate fails", async () => {
    const generate = vi.fn().mockRejectedValue(new Error("generate failed"));

    render(<LetterForm generateCoverLetter={generate} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Generate Now" }));

    await waitFor(() => {
      expect(generate).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith({
        color: "critical",
        position: "bottom-end",
        title: "Generation failed",
        text: "Could not generate the letter. Try again later.",
      });
    });

    expect(saveCoverLetter).not.toHaveBeenCalled();
    expect(replace).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Job title")).toHaveValue(
      validDetails.jobTitle,
    );
    expect(
      screen.getByRole("heading", { name: "Product manager, Apple" }),
    ).toBeInTheDocument();
  });
});
