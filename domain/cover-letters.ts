export type IsoDatetimeString = string;

/** Job fields captured for a Cover Letter (not a separate “Application” entity). */
export type CoverLetterDetails = {
  jobTitle: string;
  companyName: string;
  skills: string;
  additionalDetails: string;
};

export type CoverLetter = {
  id: string;
  title: string;
  content: string;
  details: CoverLetterDetails;
  createdAt: IsoDatetimeString;
  updatedAt: IsoDatetimeString;
};

export const GOAL_TARGET = 5;

export type GoalProgress = {
  count: number;
  target: typeof GOAL_TARGET;
  isReached: boolean;
};

/** Progress is distinct saved Cover Letter list length. */
export function goalProgress(count: number): GoalProgress {
  return {
    count,
    target: GOAL_TARGET,
    isReached: count >= GOAL_TARGET,
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
  existing: Pick<CoverLetter, "id" | "createdAt">,
  generated: Pick<CoverLetter, "title" | "content" | "details">,
): CoverLetter {
  return {
    id: existing.id,
    createdAt: existing.createdAt,
    title: generated.title,
    content: generated.content,
    details: generated.details,
    updatedAt: new Date().toISOString(),
  };
}
