import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InformedError } from "../informed-error";

describe("InformedError", () => {
  it("shows locked missing-application copy with a Home CTA", () => {
    render(<InformedError kind="missing-application" />);

    expect(
      screen.getByRole("heading", { name: "This application isn't here" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "It may have been removed, or the link may be out of date.",
      ),
    ).toBeInTheDocument();

    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
  });

  it("shows locked unknown-route copy with a Home CTA", () => {
    render(<InformedError kind="unknown-route" />);

    expect(
      screen.getByRole("heading", { name: "This page isn't here" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The address may be mistyped, or the page may have moved.",
      ),
    ).toBeInTheDocument();

    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
  });
});
