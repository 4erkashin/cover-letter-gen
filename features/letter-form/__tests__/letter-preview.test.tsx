import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/ui/assets/copy-icon.svg", () => ({
  default: () => <svg data-testid="copy-icon" />,
}));

import { LetterPreview } from "../letter-preview";

describe("LetterPreview", () => {
  const writeText = vi.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  it("shows the empty-state placeholder when there is no content", () => {
    render(<LetterPreview />);

    expect(
      screen.getByText("Your personalized job application will appear here..."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Generated letter preview" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /copy to clipboard/i }),
    ).toBeDisabled();
  });

  it("shows the Preloader and marks the region busy while generating", () => {
    render(<LetterPreview isGenerating />);

    const region = screen.getByRole("region", {
      name: "Generated letter preview",
    });
    expect(region).toHaveAttribute("aria-busy", "true");
    expect(screen.getByTestId("letter-preloader")).toBeInTheDocument();
    expect(screen.getByText("Generating…")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Your personalized job application will appear here...",
      ),
    ).not.toBeInTheDocument();
  });

  it("shows letter content without a success reveal on initial load", () => {
    const content = "Dear Apple Team,\n\nI am writing to express my interest.";
    const { container } = render(<LetterPreview content={content} />);

    const region = screen.getByRole("region", {
      name: "Generated letter preview",
    });
    expect(region).not.toHaveAttribute("aria-busy");
    expect(region).toHaveTextContent("Dear Apple Team,");
    expect(region).toHaveTextContent("I am writing to express my interest.");
    expect(screen.queryByTestId("letter-preloader")).not.toBeInTheDocument();
    expect(container.querySelector("[class*='reveal']")).toBeNull();
  });

  it("applies the success reveal when content arrives after generating", () => {
    const content = "Dear Apple Team,\n\nI am writing to express my interest.";
    const { container, rerender } = render(
      <LetterPreview content={null} isGenerating />,
    );

    rerender(<LetterPreview content={content} />);

    expect(container.querySelector("[class*='reveal']")).not.toBeNull();
  });

  it("keeps the Preloader over prior content while regenerating", () => {
    render(
      <LetterPreview
        content={"Dear Apple Team,\n\nPrevious letter."}
        isGenerating
      />,
    );

    expect(screen.getByTestId("letter-preloader")).toBeInTheDocument();
    expect(screen.queryByText(/Previous letter/)).not.toBeInTheDocument();
  });

  it("copies letter content from the preview Copy button", () => {
    const content = "Dear Apple Team,\n\nI am writing to express my interest.";
    render(<LetterPreview content={content} />);

    fireEvent.click(screen.getByRole("button", { name: /copy to clipboard/i }));

    expect(writeText).toHaveBeenCalledWith(content);
  });
});
