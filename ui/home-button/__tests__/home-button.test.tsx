import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/ui/assets/home-icon.svg", () => ({
  default: () => <svg data-testid="home-icon" />,
}));

import { HomeButton } from "../home-button";

describe("HomeButton", () => {
  it("provides a Home control that goes to the dashboard", () => {
    render(<HomeButton />);

    const home = screen.getByRole("link", { name: /home/i });
    expect(home).toHaveAttribute("href", "/");
  });
});
