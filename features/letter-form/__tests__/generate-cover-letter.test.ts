import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CoverLetterDetails } from "@/domain";

const generateText = vi.hoisted(() => vi.fn());

vi.mock("ai", () => ({
  generateText,
}));

import { FLASH_MODEL } from "../constants";
import { generateCoverLetter } from "../generate-cover-letter";

const details: CoverLetterDetails = {
  additionalDetails: " I ship things. ",
  companyName: " Apple ",
  jobTitle: "  Product manager  ",
  skills: " HTML, CSS ",
};

describe("generateCoverLetter", () => {
  beforeEach(() => {
    generateText.mockReset();
    process.env.AI_GATEWAY_API_KEY = "test-key";
  });

  it("calls generateText with a Flash-class model and returns a Cover Letter", async () => {
    generateText.mockResolvedValue({
      text: "Dear Apple Team,\n\nI am writing to express my interest.",
    });

    const letter = await generateCoverLetter(details);

    expect(generateText).toHaveBeenCalledWith(
      expect.objectContaining({
        model: FLASH_MODEL,
        prompt: expect.stringContaining("Product manager"),
        system: expect.any(String),
      }),
    );
    expect(FLASH_MODEL).toMatch(/flash/i);
    expect(letter).toMatchObject({
      content: "Dear Apple Team,\n\nI am writing to express my interest.",
      details: {
        additionalDetails: "I ship things.",
        companyName: "Apple",
        jobTitle: "Product manager",
        skills: "HTML, CSS",
      },
      title: "Product manager, Apple",
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

  it("fails early with a clear message when AI_GATEWAY_API_KEY is missing", async () => {
    const previous = process.env.AI_GATEWAY_API_KEY;
    delete process.env.AI_GATEWAY_API_KEY;

    try {
      await expect(generateCoverLetter(details)).rejects.toThrow(
        /AI_GATEWAY_API_KEY/,
      );
      expect(generateText).not.toHaveBeenCalled();
    } finally {
      if (previous === undefined) {
        delete process.env.AI_GATEWAY_API_KEY;
      } else {
        process.env.AI_GATEWAY_API_KEY = previous;
      }
    }
  });
});
