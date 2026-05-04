import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { CoverLetter } from "@/domain";

import { STORAGE_KEY } from "./const";
import { createSsrSafePersistStorage, createTestLetter } from "./util";

export type PersistStorageState = {
  letters: CoverLetter[];
};

export type PersistStorageActions = {
  addLetter: () => void;
};

export type PersistStorageStore = PersistStorageState & PersistStorageActions;

export function createPersistStorageStore() {
  return createStore<PersistStorageStore>()(
    persist(
      (set) => ({
        letters: [],
        addLetter: () => {
          set((state) => ({
            letters: [createTestLetter(), ...state.letters],
          }));
        },
      }),
      {
        name: STORAGE_KEY,
        storage: createSsrSafePersistStorage<PersistStorageState>(),
        partialize: (state) => ({ letters: state.letters }),
        skipHydration: true,
      },
    ),
  );
}
