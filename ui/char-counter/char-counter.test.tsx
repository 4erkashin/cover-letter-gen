import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CharCounter } from "./char-counter";

describe("CharCounter", () => {
  it("shows current over max in {current}/{max} form", () => {
    render(<CharCounter length={123} max={1200} />);

    expect(screen.getByText("123/1200")).toBeInTheDocument();
  });

  it("uses critical color when over the limit", () => {
    render(<CharCounter length={1290} max={1200} />);

    const counter = screen.getByText("1290/1200");
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute("data-over-limit", "true");
  });

  it("does not mark under-limit counts as over", () => {
    render(<CharCounter length={0} max={1200} />);

    expect(screen.getByText("0/1200")).toHaveAttribute(
      "data-over-limit",
      "false",
    );
  });
});
