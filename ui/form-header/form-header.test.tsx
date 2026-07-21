import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormHeader } from "./form-header";

describe("FormHeader", () => {
  it('shows "New application" when job title and company are empty', () => {
    render(<FormHeader jobTitle="" companyName="" />);

    expect(
      screen.getByRole("heading", { name: "New application" }),
    ).toBeInTheDocument();
  });

  it("shows job title and company when both are filled", () => {
    render(<FormHeader jobTitle="Product manager" companyName="Apple" />);

    expect(
      screen.getByRole("heading", { name: "Product manager, Apple" }),
    ).toBeInTheDocument();
  });
});
