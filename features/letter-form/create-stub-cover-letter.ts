import {
  coverLetterTitle,
  type CoverLetter,
  type CoverLetterDetails,
} from "@/domain";

export async function createStubCoverLetter(
  details: CoverLetterDetails,
): Promise<CoverLetter> {
  const nowIso = new Date().toISOString();
  const title = coverLetterTitle(details.jobTitle, details.companyName);

  return {
    id: crypto.randomUUID(),
    title,
    content: `Stub cover letter for ${details.jobTitle.trim()} at ${details.companyName.trim()}.`,
    details: {
      jobTitle: details.jobTitle.trim(),
      companyName: details.companyName.trim(),
      skills: details.skills.trim(),
      additionalDetails: details.additionalDetails.trim(),
    },
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}
