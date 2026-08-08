# Artificial hydration delay on `useCoverLetters`

Cover Letters load from `localStorage` via Nanostores — there is no network round-trip. After hydration the store can clear `isLoading` immediately, which flashes settled UI for content that is meant to feel dynamic (list, goal status, edit page). The product mimics a networked web app, so we deliberately hold the loading path.

**Decision:** Keep `isLoading: true` for a short random duration after the cover-letters state store mounts, while still passing through real `coverLetters`. Duration comes from a local `getHydrationDelayMs()` in the persist-storage store module (that function is the source of truth for the range — do not duplicate numbers here). The hold lives in a **module-level** `$hydrationDelayDone` atom + `onMount` on `$coverLettersState` — one timer shared by every `useCoverLetters` subscriber (Goal, Dashboard, edit page), not a React effect per caller. Always on for now; a future DEV overlay may expose the knob.

**Rejected:** Per-hook `useEffect` timers (Goal and Dashboard cleared loading at different random times); DEV-only delay (would hide the intended UX in any non-dev build); sleeping before reading storage (we need a visible loading hold, not a slower read); per-feature delays (duplicates and drifts); a standalone `lib/` helper (one caller — product UX policy belongs with the store).

## Consequences

- Hard reload shows Goal.Status skeleton and list loading chrome in lockstep for the artificial delay even when localStorage is instant.
- `getCoverLetters()` is unaffected — no loading flag.
- Overlay later should replace or wrap `getHydrationDelayMs` in the store module, not re-delay in each feature.
