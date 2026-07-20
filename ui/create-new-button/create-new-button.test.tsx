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

import { CreateNewButton } from "./create-new-button";

describe("CreateNewButton", () => {
  it("navigates to /new", () => {
    render(<CreateNewButton />);

    expect(
      screen.getByRole("link", { name: /create new/i }),
    ).toHaveAttribute("href", "/new");
  });

  it("uses the positive solid Create New styling from the mock", () => {
    render(<CreateNewButton />);

    const button = screen.getByRole("link", { name: /create new/i });
    expect(button.className).toMatch(/variant-solid/);
    expect(button.className).toMatch(/color-positive/);
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });
});
