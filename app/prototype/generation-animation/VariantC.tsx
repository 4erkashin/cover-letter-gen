"use client";

import {
  DotSpinner,
  PrototypeFormShell,
  useSimulatedGeneration,
} from "./shell";
import styles from "./variants.module.css";

export const name = "One-shot grow + reveal wipe";

/**
 * Variant C — orb grows once from start→end size over 1.2s, then gentle pulse
 * at end size until the response arrives; success expands a white wipe that
 * reveals the letter (structurally different exit).
 */
export function VariantC() {
  const { phase, letter, generate, reset } = useSimulatedGeneration(3200);

  return (
    <PrototypeFormShell
      phase={phase}
      onGenerate={generate}
      onReset={reset}
      stateLine={`phase=${phase} · grow 1.2s once → pulse · success wipe 500ms · sim 3.2s`}
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
            <div
              className={`${styles.orb} ${styles.orbGrowPulse}`}
              aria-hidden
            />
          )}
          {phase === "success" && (
            <div className={styles.wipe}>
              <p className={styles.letter}>{letter}</p>
            </div>
          )}
        </div>
      }
    />
  );
}
