import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const usePathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/ui/assets/app-logo.svg", () => ({
  default: () => <svg data-testid="app-logo" />,
}));

vi.mock("@/ui/assets/home-icon.svg", () => ({
  default: () => <svg data-testid="home-icon" />,
}));

import { AppHeader } from "./app-header";

describe("AppHeader", () => {
  it("links brand to the dashboard and keeps it non-tabbable there", () => {
    usePathname.mockReturnValue("/");

    render(<AppHeader />);

    const brand = screen.getByRole("link", { name: /alt\+shift/i });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand).toHaveAttribute("tabindex", "-1");
  });

  it("makes brand tabbable when not on the dashboard", () => {
    usePathname.mockReturnValue("/new");

    render(<AppHeader />);

    const brand = screen.getByRole("link", { name: /alt\+shift/i });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand).not.toHaveAttribute("tabindex", "-1");
  });

  it("provides a Home control that goes to the dashboard", () => {
    usePathname.mockReturnValue("/new");

    render(<AppHeader />);

    const home = screen.getByRole("link", { name: /home/i });
    expect(home).toHaveAttribute("href", "/");
  });
});
