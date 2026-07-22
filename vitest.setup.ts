import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("next/font/local", () => ({
  default: () => ({ className: "", style: {}, variable: "" }),
}));

afterEach(() => {
  cleanup();
});
