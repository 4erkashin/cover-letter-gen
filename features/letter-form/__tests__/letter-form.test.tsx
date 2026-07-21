import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetter, CoverLetterDetails } from "@/domain";

const replace = vi.hoisted(() => vi.fn());
const saveCoverLetter = vi.hoisted(() => vi.fn());
const updateCoverLetter = vi.hoisted(() => vi.fn());
const showToast = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

vi.mock("@/features/persist-storage", () => ({
  saveCoverLetter,
  updateCoverLetter,
}));

vi.mock("reshaped", async (importOriginal) => {
  const actual = await importOriginal<typeof import("reshaped")>();
  return {
    ...actual,
    useToast: () => ({ show: showToast }),
  };
});

vi.mock("@/ui/assets/retry-icon.svg", () => ({
  default: () => <svg data-testid="retry-icon" />,
}));

import { LetterForm } from "../letter-form";

const validDetails: CoverLetterDetails = {
  additionalDetails:
    "I want to help you build awesome solutions to accomplish your goals and vision",
  companyName: "Apple",
  jobTitle: "Product manager",
  skills: "HTML, CSS and doing things in time",
};

function fillField(label: RegExp | string, value: string) {
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
    updateCoverLetter.mockReset();
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
    expect(
      screen.getByText(`${validDetails.additionalDetails.length}/1200`),
    ).toBeInTheDocument();
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
      content: "Dear Apple Team,\n\nI am writing to express my interest.",
      createdAt: "2026-01-01T00:00:00.000Z",
      details: validDetails,
      id: "letter-id",
      title: "Product manager, Apple",
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
        text: "Could not generate the letter. Try again later.",
        title: "Generation failed",
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
    expect(screen.getByRole("status")).toHaveTextContent(
      "Generation failed. Could not generate the letter.",
    );
    expect(screen.getByRole("button", { name: "Generate Now" })).toBeEnabled();
  });

  it("shows a busy Generate control and announces start while generation is in flight", async () => {
    let resolveGenerate!: (letter: CoverLetter) => void;
    const generate = vi.fn(
      () =>
        new Promise<CoverLetter>((resolve) => {
          resolveGenerate = resolve;
        }),
    );
    const onGeneratingChange = vi.fn();

    render(
      <LetterForm
        generateCoverLetter={generate}
        onGeneratingChange={onGeneratingChange}
      />,
    );
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Generate Now" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Generating…" }),
      ).toBeDisabled();
      expect(screen.getByRole("status")).toHaveTextContent("Generating…");
      expect(onGeneratingChange).toHaveBeenCalledWith(true);
    });

    expect(screen.getByLabelText("Job title")).toHaveValue(
      validDetails.jobTitle,
    );

    resolveGenerate({
      content: "Dear Apple Team,\n\nI am writing to express my interest.",
      createdAt: "2026-01-01T00:00:00.000Z",
      details: validDetails,
      id: "letter-id",
      title: "Product manager, Apple",
      updatedAt: "2026-01-01T00:00:00.000Z",
    });

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Cover letter generated.",
      );
      expect(replace).toHaveBeenCalledWith("/letter-id");
    });

    // Stay busy until navigation unmounts — no empty-preview flash.
    expect(onGeneratingChange).toHaveBeenCalledWith(true);
    expect(onGeneratingChange).not.toHaveBeenCalledWith(false);
    expect(screen.getByRole("button", { name: "Generating…" })).toBeDisabled();
  });

  it("uses Try Again as the idle label when submitLabel is set", () => {
    render(<LetterForm submitLabel="Try Again" />);

    expect(screen.getByRole("button", { name: "Try Again" })).toBeDisabled();
  });

  it("shows outline Try Again with a refresh icon in edit mode", () => {
    const existing: CoverLetter = {
      content: "Old letter body",
      createdAt: "2026-01-01T00:00:00.000Z",
      details: validDetails,
      id: "existing-id",
      title: "Product manager, Apple",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

    render(
      <LetterForm
        existingCoverLetter={existing}
        initialDetails={existing.details}
        submitLabel="Try Again"
      />,
    );

    const button = screen.getByRole("button", { name: "Try Again" });
    expect(button).toBeEnabled();
    expect(button.className).toMatch(/variant-outline/);
    expect(button.className).toMatch(/color-neutral/);
    expect(screen.getByTestId("retry-icon")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Generate Now" })).toBeNull();
  });

  it("keeps solid Generate Now without a refresh icon on create", () => {
    render(<LetterForm initialDetails={validDetails} />);

    const button = screen.getByRole("button", { name: "Generate Now" });
    expect(button).toBeEnabled();
    expect(button.className).toMatch(/variant-solid/);
    expect(button.className).toMatch(/color-positive/);
    expect(screen.queryByTestId("retry-icon")).toBeNull();
  });

  it("seeds fields from initialDetails", () => {
    render(
      <LetterForm initialDetails={validDetails} submitLabel="Try Again" />,
    );

    expect(screen.getByLabelText("Job title")).toHaveValue(
      validDetails.jobTitle,
    );
    expect(screen.getByLabelText("Company")).toHaveValue(
      validDetails.companyName,
    );
    expect(screen.getByLabelText("I am good at…")).toHaveValue(
      validDetails.skills,
    );
    expect(screen.getByLabelText("Additional details")).toHaveValue(
      validDetails.additionalDetails,
    );
    expect(
      screen.getByRole("heading", { name: "Product manager, Apple" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Again" })).toBeEnabled();
  });

  it("overwrites the same Cover Letter id, stays on the page, and clears busy on edit success", async () => {
    const existing: CoverLetter = {
      content: "Old letter body",
      createdAt: "2026-01-01T00:00:00.000Z",
      details: validDetails,
      id: "existing-id",
      title: "Product manager, Apple",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const generatedLetter: CoverLetter = {
      content: "New letter body",
      createdAt: "2026-06-01T00:00:00.000Z",
      details: validDetails,
      id: "brand-new-id",
      title: "Product manager, Apple",
      updatedAt: "2026-06-01T00:00:00.000Z",
    };
    const generate = vi.fn().mockResolvedValue(generatedLetter);
    const onGenerated = vi.fn();
    const onGeneratingChange = vi.fn();

    render(
      <LetterForm
        existingCoverLetter={existing}
        generateCoverLetter={generate}
        initialDetails={existing.details}
        onGenerated={onGenerated}
        onGeneratingChange={onGeneratingChange}
        submitLabel="Try Again"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));

    await waitFor(() => {
      expect(generate).toHaveBeenCalledWith(validDetails);
      expect(updateCoverLetter).toHaveBeenCalledWith(
        expect.objectContaining({
          content: "New letter body",
          createdAt: "2026-01-01T00:00:00.000Z",
          details: validDetails,
          id: "existing-id",
        }),
      );
      expect(saveCoverLetter).not.toHaveBeenCalled();
      expect(onGenerated).toHaveBeenCalledWith(
        expect.objectContaining({
          content: "New letter body",
          id: "existing-id",
        }),
      );
      expect(replace).not.toHaveBeenCalled();
      expect(onGeneratingChange).toHaveBeenCalledWith(false);
    });

    expect(screen.getByRole("button", { name: "Try Again" })).toBeEnabled();
  });
});
