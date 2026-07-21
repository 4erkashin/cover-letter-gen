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
  }: React.PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
  >) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/ui/assets/app-logo.svg", () => ({
  default: () => <svg data-testid="app-logo" />,
}));

import { BrandLink } from "../brand-link";

describe("BrandLink", () => {
  it("links brand to the dashboard and keeps it non-tabbable there", () => {
    usePathname.mockReturnValue("/");

    render(<BrandLink />);

    const brand = screen.getByRole("link", { name: /alt\+shift/i });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand).toHaveAttribute("tabindex", "-1");
  });

  it("makes brand tabbable when not on the dashboard", () => {
    usePathname.mockReturnValue("/new");

    render(<BrandLink />);

    const brand = screen.getByRole("link", { name: /alt\+shift/i });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand).not.toHaveAttribute("tabindex", "-1");
  });
});
