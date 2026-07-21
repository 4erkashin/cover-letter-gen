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

vi.mock("@/ui/assets/copy-icon.svg", () => ({
  default: () => <svg data-testid="copy-icon" />,
}));

vi.mock("@/ui/assets/trash-icon.svg", () => ({
  default: () => <svg data-testid="trash-icon" />,
}));

import { LetterCard } from "../letter-card";

const longContent =
  "Dear Stripe team,\n\nI am a highly skilled product designer with a passion for creating intuitive, user-centered designs. I have a strong background in design systems and am excited about the opportunity to join the Stripe product design team and work on products used by millions.";

describe("LetterCard", () => {
  it("links the card body to the Cover Letter edit route", () => {
    render(
      <LetterCard id="letter-1" content={longContent} onDelete={vi.fn()} />,
    );

    expect(
      screen.getByRole("link", { name: /dear stripe team/i }),
    ).toHaveAttribute("href", "/letter-1");
  });

  it("shows a truncated Cover Letter preview", () => {
    const { container } = render(
      <LetterCard id="letter-1" content={longContent} onDelete={vi.fn()} />,
    );

    expect(screen.getByText(/dear stripe team/i)).toBeInTheDocument();
    expect(container.querySelector("[class*='content']")).not.toBeNull();
  });

  it("calls onDelete when Delete is pressed without navigating", () => {
    const onDelete = vi.fn();
    render(
      <LetterCard id="letter-1" content={longContent} onDelete={onDelete} />,
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    const preventDefault = vi.spyOn(event, "preventDefault");

    deleteButton.dispatchEvent(event);

    expect(onDelete).toHaveBeenCalledOnce();
    expect(preventDefault).toHaveBeenCalled();
  });

  it("exposes Copy and Delete actions", () => {
    render(
      <LetterCard id="letter-1" content={longContent} onDelete={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /copy to clipboard/i }),
    ).toBeInTheDocument();
  });

  it("disables Copy when the preview content is empty", () => {
    render(<LetterCard id="letter-1" content="" onDelete={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /copy to clipboard/i }),
    ).toBeDisabled();
  });
});
