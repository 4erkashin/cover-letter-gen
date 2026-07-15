"use client";

import {
  DotSpinner,
  PrototypeFormShell,
  useSimulatedGeneration,
} from "./shell";
import styles from "./variants.module.css";

export const name = "Bounce blob + fade reveal";

/**
 * Variant B — sample Preloader bounce in-flight; success uses a short
 * crossfade (orb out / letter in). Sample itself hard-cuts — reveal is new.
 */
export function VariantB() {
  const { phase, letter, generate, reset } = useSimulatedGeneration(2400);

  return (
    <PrototypeFormShell
      phase={phase}
      onGenerate={generate}
      onReset={reset}
      stateLine={`phase=${phase} · sample bounce 1s · success = crossfade 320ms (prototype)`}
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
            <>
              <div className={styles.bounceWrap} aria-hidden>
                <div className={styles.bounceBlob} />
              </div>
              <p className={styles.reducedMotionCopy}>Generating…</p>
            </>
          )}
          {phase === "success" && (
            <p className={`${styles.letter} ${styles.fadeIn}`}>{letter}</p>
          )}
        </div>
      }
    />
  );
}
