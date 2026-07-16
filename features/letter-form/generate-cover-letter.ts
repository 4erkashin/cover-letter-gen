"use server";

import { generateText } from "ai";

import {
  coverLetterTitle,
  type CoverLetter,
  type CoverLetterDetails,
} from "@/domain";

import { FLASH_MODEL } from "./constants";
import { SYSTEM_PROMPT, composePrompt } from "./prompts";

export async function generateCoverLetter(
  details: CoverLetterDetails,
): Promise<CoverLetter> {
  const trimmed: CoverLetterDetails = {
    jobTitle: details.jobTitle.trim(),
    companyName: details.companyName.trim(),
    skills: details.skills.trim(),
    additionalDetails: details.additionalDetails.trim(),
  };

  try {
    const { text } = await generateText({
      model: FLASH_MODEL,
      system: SYSTEM_PROMPT,
      prompt: composePrompt(trimmed),
    });

    const nowIso = new Date().toISOString();

    return {
      id: crypto.randomUUID(),
      title: coverLetterTitle(trimmed.jobTitle, trimmed.companyName),
      content: text,
      details: trimmed,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  } catch (error) {
    console.error("[generateCoverLetter]", error);
    if (error instanceof Error && error.cause !== undefined) {
      console.error("[generateCoverLetter] cause:", error.cause);
    }
    throw error;
  }
}
