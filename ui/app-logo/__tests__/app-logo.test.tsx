import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/ui/assets/app-logo-circle.svg", () => ({
  default: () => <svg data-testid="logo-circle" />,
}));

vi.mock("@/ui/assets/app-logo-text.svg", () => ({
  default: () => <svg data-testid="logo-text" />,
}));

import { AppLogo } from "../app-logo";

describe("AppLogo", () => {
  it("paints the circle with Brand and the wordmark with neutral foreground", () => {
    render(<AppLogo />);

    const root = screen.getByRole("img", { name: "Alt+Shift" });
    const icons = root.querySelectorAll("span");
    const [circle, wordmark] = icons;

    expect(circle).toHaveStyle({ color: "var(--rs-color-brand)" });
    expect(wordmark?.className).toMatch(/color-neutral/);
  });
});
