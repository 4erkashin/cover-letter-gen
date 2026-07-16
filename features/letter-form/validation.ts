import type { CoverLetterDetails } from "@/domain";

import { ADDITIONAL_DETAILS_MAX } from "./constants";

export function isAdditionalDetailsOverLimit(
  additionalDetails: string,
): boolean {
  return additionalDetails.length > ADDITIONAL_DETAILS_MAX;
}

export function isCoverLetterDetailsValid(
  details: CoverLetterDetails,
): boolean {
  return (
    details.jobTitle.trim().length > 0 &&
    details.companyName.trim().length > 0 &&
    details.skills.trim().length > 0 &&
    details.additionalDetails.trim().length > 0 &&
    !isAdditionalDetailsOverLimit(details.additionalDetails)
  );
}
