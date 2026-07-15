"use client";

import { useEffect, useState } from "react";
import styles from "./shell.module.css";

export type Phase = "idle" | "loading" | "success";

export type ShellProps = {
  phase: Phase;
  onGenerate: () => void;
  onReset: () => void;
  button: React.ReactNode;
  preview: React.ReactNode;
  stateLine: string;
  children?: React.ReactNode;
};

const DEMO_LETTER = `Dear Hiring Manager,

I am writing to express my interest in the Product Manager role at Apple. With a background in HTML, CSS, and delivering work on time, I build intuitive products that help teams accomplish their goals and vision.

I would welcome the chance to discuss how I can contribute.

Best regards`;

/** PROTOTYPE shell — form chrome approximating Figma screenshots. */
export function PrototypeFormShell({
  phase,
  onGenerate,
  onReset,
  button,
  preview,
  stateLine,
  children,
}: ShellProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark} aria-hidden />
          <span className={styles.brandName}>Alt+Shift</span>
        </div>
        <div className={styles.goal}>
          <span>3/5 applications generated</span>
          <span className={styles.dots} aria-hidden>
            <i className={styles.filled} />
            <i className={styles.filled} />
            <i className={styles.filled} />
            <i />
            <i />
          </span>
          <button type="button" className={styles.home} aria-label="Home">
            ⌂
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        <section className={styles.form}>
          <h1 className={styles.title}>Product manager, Apple</h1>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Job title</span>
              <input readOnly value="Product manager" />
            </label>
            <label className={styles.field}>
              <span>Company</span>
              <input readOnly value="Apple" />
            </label>
          </div>

          <label className={styles.field}>
            <span>I am good at…</span>
            <input readOnly value="HTML, CSS and doing things in time" />
          </label>

          <label className={styles.field}>
            <span>Additional details</span>
            <textarea
              readOnly
              rows={5}
              value="I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use."
            />
            <span className={styles.counter}>123/1200</span>
          </label>

          {button}
        </section>

        <aside className={styles.preview} aria-busy={phase === "loading"}>
          {preview}
          {phase !== "loading" && (
            <button type="button" className={styles.copy} disabled={phase !== "success"}>
              Copy to clipboard
            </button>
          )}
        </aside>
      </div>

      <div className={styles.controls}>
        <p className={styles.state}>{stateLine}</p>
        <div className={styles.actions}>
          {phase === "idle" && (
            <button type="button" className={styles.secondary} onClick={onGenerate}>
              Simulate generate
            </button>
          )}
          {phase !== "idle" && (
            <button type="button" className={styles.secondary} onClick={onReset}>
              Reset
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export function useSimulatedGeneration(durationMs: number) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (phase !== "loading") return;
    const t = window.setTimeout(() => setPhase("success"), durationMs);
    return () => window.clearTimeout(t);
  }, [phase, durationMs]);

  return {
    phase,
    letter: DEMO_LETTER,
    generate: () => setPhase("loading"),
    reset: () => setPhase("idle"),
  };
}

export function DotSpinner({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const cx = 11 + Math.cos(angle) * 7;
          const cy = 11 + Math.sin(angle) * 7;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="1.6"
              fill="white"
              opacity={0.25 + (i / 8) * 0.75}
            />
          );
        })}
      </svg>
    </span>
  );
}
