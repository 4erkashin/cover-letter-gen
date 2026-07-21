import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/ui/assets/copy-icon.svg", () => ({
  default: () => <svg data-testid="copy-icon" />,
}));

import { CopyButton } from "../copy-button";

describe("CopyButton", () => {
  const writeText = vi.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  it("is disabled when text is empty", () => {
    render(<CopyButton text="" />);

    expect(
      screen.getByRole("button", { name: /copy to clipboard/i }),
    ).toBeDisabled();
  });

  it("is disabled when text is only whitespace", () => {
    render(<CopyButton text={"   \n\t  "} />);

    expect(
      screen.getByRole("button", { name: /copy to clipboard/i }),
    ).toBeDisabled();
  });

  it("copies Cover Letter text to the clipboard", () => {
    render(<CopyButton text="Dear Stripe team," />);

    fireEvent.click(screen.getByRole("button", { name: /copy to clipboard/i }));

    expect(writeText).toHaveBeenCalledWith("Dear Stripe team,");
  });

  it("does not navigate when nested inside a link", () => {
    render(
      <a href="/letter-1">
        <CopyButton text="Dear Stripe team," />
      </a>,
    );

    const button = screen.getByRole("button", { name: /copy to clipboard/i });
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    const preventDefault = vi.spyOn(event, "preventDefault");

    button.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(writeText).toHaveBeenCalledWith("Dear Stripe team,");
  });
});
