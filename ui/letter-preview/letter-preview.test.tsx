import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LetterPreview } from "./letter-preview";

describe("LetterPreview", () => {
  it("shows the empty-state placeholder when there is no content", () => {
    render(<LetterPreview />);

    expect(
      screen.getByText(
        "Your personalized job application will appear here...",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Generated letter preview" }),
    ).toBeInTheDocument();
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
      <LetterPreview isGenerating content={null} />,
    );

    rerender(<LetterPreview content={content} />);

    expect(container.querySelector("[class*='reveal']")).not.toBeNull();
  });

  it("keeps the Preloader over prior content while regenerating", () => {
    render(
      <LetterPreview
        isGenerating
        content={"Dear Apple Team,\n\nPrevious letter."}
      />,
    );

    expect(screen.getByTestId("letter-preloader")).toBeInTheDocument();
    expect(screen.queryByText(/Previous letter/)).not.toBeInTheDocument();
  });
});
