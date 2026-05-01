"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";

import { STORAGE_KEY } from "./const";
import {
  createPersistStorageStore,
  type PersistStorageState,
  type PersistStorageStore,
} from "./store";
import { createBrowserPersistStorage } from "./util";

const StoreContext = createContext<
  ReturnType<typeof createPersistStorageStore> | undefined
>(undefined);

const HydrationContext = createContext<boolean>(false);

export function PersistStorageProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createPersistStorageStore());
  const [hasHydrated, setHasHydrated] = useState(() =>
    store.persist.hasHydrated(),
  );

  useEffect(() => {
    store.persist.setOptions({
      storage: createBrowserPersistStorage<PersistStorageState>(),
    });

    const unsubFinishHydration = store.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    void store.persist.rehydrate();

    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key !== STORAGE_KEY) return;
      void store.persist.rehydrate();
    };

    window.addEventListener("storage", onStorage);

    return () => {
      unsubFinishHydration();
      window.removeEventListener("storage", onStorage);
    };
  }, [store]);

  return (
    <StoreContext.Provider value={store}>
      <HydrationContext.Provider value={hasHydrated}>
        {children}
      </HydrationContext.Provider>
    </StoreContext.Provider>
  );
}

export function usePersistStorageStore<T>(
  selector: (store: PersistStorageStore) => T,
): T {
  const storeApi = useContext(StoreContext);

  if (!storeApi) {
    throw new Error(
      "usePersistStorageStore must be used within PersistStorageProvider",
    );
  }

  return useStore(storeApi, selector);
}

export function usePersistStorageHydration(): boolean {
  return useContext(HydrationContext);
}
