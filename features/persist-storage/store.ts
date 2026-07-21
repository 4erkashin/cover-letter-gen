import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { computed } from "nanostores";

import type { CoverLetter } from "@/domain";

export const STORAGE_KEY = "cover-letter-gen";

const $coverLetters = persistentAtom<CoverLetter[]>(STORAGE_KEY, [], {
  decode: JSON.parse,
  encode: JSON.stringify,
});

export type CoverLettersState = {
  coverLetters: CoverLetter[];
  isLoading: boolean;
};

/**
 * Explicit return-type annotation widens the computed's value type to
 * `CoverLettersState` (with `isLoading: boolean`, not the literal `false`),
 * so `useStore`'s `ssr` option can return the `isLoading: true` variant
 * without any type assertions.
 */
const $coverLettersState = computed(
  $coverLetters,
  (coverLetters): CoverLettersState => ({ coverLetters, isLoading: false }),
);

/**
 * Stable snapshot for SSR and the hydration render.
 * Reuse this singleton: inline objects would get a new identity every call
 * and React warns (it thinks the snapshot keeps changing).
 */
const SERVER_SNAPSHOT: CoverLettersState = {
  coverLetters: [],
  isLoading: true,
};

export function useCoverLetters(): CoverLettersState {
  return useStore($coverLettersState, { ssr: () => SERVER_SNAPSHOT });
}

export function getCoverLetters(): CoverLetter[] {
  return $coverLetters.get();
}

/** Prepend a new Cover Letter, or replace an existing id (keeps list distinct). */
export function saveCoverLetter(letter: CoverLetter): void {
  const withoutSameId = $coverLetters
    .get()
    .filter((existing) => existing.id !== letter.id);
  $coverLetters.set([letter, ...withoutSameId]);
}

export function updateCoverLetter(letter: CoverLetter): void {
  $coverLetters.set(
    $coverLetters
      .get()
      .map((existing) => (existing.id === letter.id ? letter : existing)),
  );
}

export function removeCoverLetter(id: string): void {
  $coverLetters.set($coverLetters.get().filter((letter) => letter.id !== id));
}

/** Test helper: drop in-memory state and re-read localStorage. */
export function resetCoverLettersForTests(): void {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw == null) {
    $coverLetters.set([]);
    return;
  }
  $coverLetters.set(JSON.parse(raw) as CoverLetter[]);
}
