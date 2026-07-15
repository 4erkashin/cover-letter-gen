"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "./PrototypeSwitcher.module.css";

type VariantMeta = { key: string; name: string };

type Props = {
  variants: VariantMeta[];
};

/** PROTOTYPE — floating variant switcher; not for production. */
export function PrototypeSwitcher({ variants }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("variant") ?? variants[0]?.key ?? "A";
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current),
  );
  const meta = variants[index] ?? variants[0];

  function go(nextIndex: number) {
    const wrapped = (nextIndex + variants.length) % variants.length;
    const key = variants[wrapped]?.key;
    if (!key) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", key);
    router.replace(`?${params.toString()}`);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className={styles.bar} role="navigation" aria-label="Prototype variants">
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(index - 1)}
        aria-label="Previous variant"
      >
        ←
      </button>
      <span className={styles.label}>
        {meta?.key} — {meta?.name}
      </span>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(index + 1)}
        aria-label="Next variant"
      >
        →
      </button>
    </div>
  );
}
