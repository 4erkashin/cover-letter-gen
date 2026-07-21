export type CoverLetter = {
  content: string;
  createdAt: IsoDatetimeString;
  details: CoverLetterDetails;
  id: string;
  title: string;
  updatedAt: IsoDatetimeString;
};

export type CoverLetterDetails = {
  additionalDetails: string;
  companyName: string;
  jobTitle: string;
  skills: string;
};

export type IsoDatetimeString = string;

export const GOAL_TARGET = 5;

export type GoalProgress = {
  count: number;
  isReached: boolean;
  target: typeof GOAL_TARGET;
};

/** Progress is distinct saved Cover Letter list length. */
export function goalProgress(count: number): GoalProgress {
  return {
    count,
    isReached: count >= GOAL_TARGET,
    target: GOAL_TARGET,
  };
}

export function findCoverLetter(
  letters: readonly CoverLetter[],
  id: string,
): CoverLetter | null {
  return letters.find((letter) => letter.id === id) ?? null;
}

/** Display / persist title: `{Job title}, {Company}`. */
export function coverLetterTitle(
  jobTitle: string,
  companyName: string,
): string {
  return `${jobTitle.trim()}, ${companyName.trim()}`;
}

/** Try Again: keep identity, replace generated fields, bump updatedAt. */
export function overwriteCoverLetter(
  existing: Pick<CoverLetter, "createdAt" | "id">,
  generated: Pick<CoverLetter, "content" | "details" | "title">,
): CoverLetter {
  return {
    content: generated.content,
    createdAt: existing.createdAt,
    details: generated.details,
    id: existing.id,
    title: generated.title,
    updatedAt: new Date().toISOString(),
  };
}
