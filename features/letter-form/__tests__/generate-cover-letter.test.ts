import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetterDetails } from "@/domain";

const generateText = vi.hoisted(() => vi.fn());

vi.mock("ai", () => ({
  generateText,
}));

import { FLASH_MODEL } from "../constants";
import { generateCoverLetter } from "../generate-cover-letter";

const details: CoverLetterDetails = {
  jobTitle: "  Product manager  ",
  companyName: " Apple ",
  skills: " HTML, CSS ",
  additionalDetails: " I ship things. ",
};

describe("generateCoverLetter", () => {
  beforeEach(() => {
    generateText.mockReset();
  });

  it("calls generateText with a Flash-class model and returns a Cover Letter", async () => {
    generateText.mockResolvedValue({
      text: "Dear Apple Team,\n\nI am writing to express my interest.",
    });

    const letter = await generateCoverLetter(details);

    expect(generateText).toHaveBeenCalledWith(
      expect.objectContaining({
        model: FLASH_MODEL,
        system: expect.any(String),
        prompt: expect.stringContaining("Product manager"),
      }),
    );
    expect(FLASH_MODEL).toMatch(/flash/i);
    expect(letter).toMatchObject({
      title: "Product manager, Apple",
      content: "Dear Apple Team,\n\nI am writing to express my interest.",
      details: {
        jobTitle: "Product manager",
        companyName: "Apple",
        skills: "HTML, CSS",
        additionalDetails: "I ship things.",
      },
    });
    expect(letter.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(letter.createdAt).toEqual(letter.updatedAt);
  });

  it("rethrows when generateText fails so the client can announce the error", async () => {
    generateText.mockRejectedValue(new Error("gateway down"));

    await expect(generateCoverLetter(details)).rejects.toThrow("gateway down");
  });
});
