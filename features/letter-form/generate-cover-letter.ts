"use server";

import { generateText } from "ai";

import {
  type CoverLetter,
  type CoverLetterDetails,
  coverLetterTitle,
} from "@/domain";

import { FLASH_MODEL } from "./constants";
import { composePrompt, SYSTEM_PROMPT } from "./prompts";

export async function generateCoverLetter(
  details: CoverLetterDetails,
): Promise<CoverLetter> {
  if (!process.env.AI_GATEWAY_API_KEY) {
    throw new Error(
      "AI_GATEWAY_API_KEY is not set. Add it to .env.local to enable cover letter generation.",
    );
  }

  const trimmed: CoverLetterDetails = {
    additionalDetails: details.additionalDetails.trim(),
    companyName: details.companyName.trim(),
    jobTitle: details.jobTitle.trim(),
    skills: details.skills.trim(),
  };

  try {
    const { text } = await generateText({
      model: FLASH_MODEL,
      prompt: composePrompt(trimmed),
      system: SYSTEM_PROMPT,
    });

    const nowIso = new Date().toISOString();

    return {
      content: text,
      createdAt: nowIso,
      details: trimmed,
      id: crypto.randomUUID(),
      title: coverLetterTitle(trimmed.jobTitle, trimmed.companyName),
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
