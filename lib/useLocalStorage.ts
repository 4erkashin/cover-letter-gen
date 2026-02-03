"use client";

import { useCallback, useSyncExternalStore } from "react";

const CUSTOM_EVENT = "local-storage-change";

/**
 * useLocalStorage (useSyncExternalStore)
 *
 * React-recommended for external stores. Prevents tearing during
 * concurrent rendering. getServerSnapshot returns initialValue for SSR.
 * Syncs across tabs (storage event) and same-tab (custom event).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore(
    (onChange) => {
      const onStorageEvent = () => onChange();

      const onCustomEvent = (e: Event) => {
        if ((e as CustomEvent<{ key: string }>).detail.key === key) {
          onChange();
        }
      };

      window.addEventListener("storage", onStorageEvent);
      window.addEventListener(CUSTOM_EVENT, onCustomEvent);

      return () => {
        window.removeEventListener("storage", onStorageEvent);
        window.removeEventListener(CUSTOM_EVENT, onCustomEvent);
      };
    },
    () =>
      parse<T>(
        typeof window !== "undefined" ? localStorage.getItem(key) : null,
        initialValue,
      ),
    () => initialValue,
  );

  const setValue = useCallback(
    (valueOrUpdater: T | ((prev: T) => T)) => {
      const current = parse<T>(
        typeof window !== "undefined" ? localStorage.getItem(key) : null,
        initialValue,
      );

      const next =
        typeof valueOrUpdater === "function"
          ? (valueOrUpdater as (prev: T) => T)(current)
          : valueOrUpdater;

      localStorage.setItem(key, JSON.stringify(next));

      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT, { detail: { key } }));
    },
    [key, initialValue],
  );

  return [value, setValue];
}

function parse<T>(raw: null | string, initialValue: T): T {
  if (raw === null) return initialValue;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return initialValue;
  }
}
