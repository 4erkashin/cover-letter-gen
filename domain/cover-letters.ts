/**
 * Stub Cover Letter lookup until persistence (#13).
 * With no store yet, every id is treated as missing so `/[id]`
 * shows the informed not-found screen (no silent redirect).
 */
export type CoverLetter = {
  id: string;
};

export function findCoverLetter(_id: string): CoverLetter | null {
  return null;
}
