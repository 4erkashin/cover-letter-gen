"use client";

import {
  DotSpinner,
  PrototypeFormShell,
  useSimulatedGeneration,
} from "./shell";
import styles from "./variants.module.css";

export const name = "Morph loop (Figma start↔end)";

/**
 * Variant A — continuous morph between starting (compact) and ending (expanded)
 * orb sizes while the request is in flight; button label replaced by spinner;
 * success fades orb out and letter in (~400ms).
 */
export function VariantA() {
  const { phase, letter, generate, reset } = useSimulatedGeneration(2800);

  return (
    <PrototypeFormShell
      phase={phase}
      onGenerate={generate}
      onReset={reset}
      stateLine={`phase=${phase} · loop 1.6s ease-in-out · success fade 400ms · min wait 2.8s (sim)`}
      button={
        <button
          type="button"
          className={`${styles.primary} ${phase === "loading" ? styles.loading : ""}`}
          disabled={phase === "loading"}
          aria-busy={phase === "loading"}
          aria-label={phase === "loading" ? "Generating" : "Generate Now"}
        >
          {phase === "loading" ? (
            <DotSpinner className={styles.spinner} />
          ) : phase === "success" ? (
            "Try Again"
          ) : (
            "Generate Now"
          )}
        </button>
      }
      preview={
        <div className={styles.previewInner}>
          {phase === "idle" && (
            <p className={styles.placeholder}>
              Your personalized job application will appear here...
            </p>
          )}
          {phase === "loading" && (
            <div className={`${styles.orb} ${styles.orbMorph}`} aria-hidden />
          )}
          {phase === "success" && (
            <p className={`${styles.letter} ${styles.fadeIn}`}>{letter}</p>
          )}
        </div>
      }
    />
  );
}
