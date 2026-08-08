import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { atom, computed, onMount } from "nanostores";

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
 * Random hold (ms) after hydration before `useCoverLetters` clears `isLoading`.
 * Inclusive `[minMs, maxMs]` — defaults live here; ADR-0016 explains why we delay.
 */
function getHydrationDelayMs(minMs = 400, maxMs = 1600): number {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

/** Shared across all `useCoverLetters` subscribers — one timer per document. */
const $hydrationDelayDone = atom(false);
let hydrationDelayScheduled = false;

/**
 * Explicit return-type annotation widens the computed's value type to
 * `CoverLettersState` (with `isLoading: boolean`, not the literal `false`),
 * so `useStore`'s `ssr` option can return the `isLoading: true` variant
 * without any type assertions.
 */
const $coverLettersState = computed(
  [$coverLetters, $hydrationDelayDone],
  (coverLetters, delayDone): CoverLettersState => ({
    coverLetters,
    isLoading: !delayDone,
  }),
);

onMount($coverLettersState, () => {
  if (hydrationDelayScheduled || $hydrationDelayDone.get()) {
    return;
  }
  hydrationDelayScheduled = true;
  setTimeout(() => {
    $hydrationDelayDone.set(true);
  }, getHydrationDelayMs());
});

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
