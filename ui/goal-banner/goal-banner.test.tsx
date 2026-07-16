import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<
    { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  >) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/ui/assets/plus-icon.svg", () => ({
  default: () => <svg data-testid="plus-icon" />,
}));

import { GoalBanner } from "./goal-banner";

describe("GoalBanner", () => {
  it("shows Hit your goal copy, meter, and Create New while below target", () => {
    render(<GoalBanner count={2} />);

    expect(
      screen.getByRole("heading", { name: "Hit your goal" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Generate and send out couple more job applications today to get hired faster",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("2 out of 5")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /create new/i }),
    ).toHaveAttribute("href", "/new");
  });

  it("renders nothing when the goal is reached", () => {
    const { container } = render(<GoalBanner count={5} />);

    expect(container).toBeEmptyDOMElement();
  });
});
