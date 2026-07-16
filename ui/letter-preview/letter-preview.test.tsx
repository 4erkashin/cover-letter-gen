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
});
