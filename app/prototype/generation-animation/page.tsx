"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PrototypeSwitcher } from "./PrototypeSwitcher";
import { VariantA, name as nameA } from "./VariantA";
import { VariantB, name as nameB } from "./VariantB";
import { VariantC, name as nameC } from "./VariantC";

/**
 * PROTOTYPE — three variants of generation-status animation for PRD lock-in.
 * Question: What concrete generation-status animation must the PRD require
 * (timing, button spinner, preview glow start→end, success transition)?
 * Switch via ?variant=A|B|C — run with `pnpm dev`, open /prototype/generation-animation
 */
const VARIANTS = [
  { key: "A", name: nameA, Component: VariantA },
  { key: "B", name: nameB, Component: VariantB },
  { key: "C", name: nameC, Component: VariantC },
] as const;

function PrototypeBody() {
  const searchParams = useSearchParams();
  const key = searchParams.get("variant") ?? "A";
  const active = VARIANTS.find((v) => v.key === key) ?? VARIANTS[0];
  const Component = active.Component;

  return (
    <>
      <Component />
      <PrototypeSwitcher
        variants={VARIANTS.map(({ key, name }) => ({ key, name }))}
      />
    </>
  );
}

export default function GenerationAnimationPrototypePage() {
  return (
    <Suspense fallback={<p style={{ padding: 24 }}>Loading prototype…</p>}>
      <PrototypeBody />
    </Suspense>
  );
}
