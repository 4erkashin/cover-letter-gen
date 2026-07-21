import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/ui/assets/check-icon.svg", () => ({
  default: () => <svg data-testid="check-icon" />,
}));

import { GoalHeader } from "./goal-header";

describe("GoalHeader", () => {
  it("shows count over target with applications generated copy", () => {
    render(<GoalHeader count={3} />);

    expect(screen.getByText("3/5 applications generated")).toBeInTheDocument();
  });

  it("shows progress dots while the goal is in progress", () => {
    const { container } = render(<GoalHeader count={3} />);

    expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-progress-dot="true"]'),
    ).toHaveLength(5);
    expect(
      container.querySelectorAll(
        '[data-progress-dot="true"][data-active="true"]',
      ),
    ).toHaveLength(3);
  });

  it("shows a check when the goal is reached", () => {
    render(<GoalHeader count={5} />);

    expect(screen.getByText("5/5 applications generated")).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });
});
