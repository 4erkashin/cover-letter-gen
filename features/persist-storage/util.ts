import { createJSONStorage, type PersistStorage } from "zustand/middleware";

import type { CoverLetter } from "@/domain";

/**
 * Persist storage that never touches `localStorage`.
 *
 * Zustand still needs a storage object when the store is created.
 * On the server that object cannot read or write the browser.
 * This one always reports "nothing saved" and ignores updates.
 * Also used as a fallback when real JSON storage cannot be built.
 */
export function createStubPersistStorage<S>(): PersistStorage<S> {
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

/**
 * If `createJSONStorage` cannot produce a storage object, returns
 * {@link createStubPersistStorage} so callers still get a valid adapter.
 */
export function createBrowserPersistStorage<S>(): PersistStorage<S> {
  const jsonStorage = createJSONStorage<S>(() => localStorage);
  return jsonStorage ?? createStubPersistStorage<S>();
}

/**
 * {@link PersistStorage} for the current runtime.
 *
 * Without `window` (e.g. Node during SSR), returns {@link createStubPersistStorage}
 * so the store can initialize without touching `localStorage`. In the browser,
 * returns {@link createBrowserPersistStorage} for normal JSON persistence.
 */
export function createSsrSafePersistStorage<S>(): PersistStorage<S> {
  if (typeof window === "undefined") {
    return createStubPersistStorage<S>();
  }
  return createBrowserPersistStorage<S>();
}

/** Dev placeholder letter for the persist-storage MVP panel. */
export function createTestLetter(): CoverLetter {
  const nowIso = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: `Letter ${nowIso.slice(11, 19)}`,
    content: `Test letter created at ${nowIso}.`,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}
