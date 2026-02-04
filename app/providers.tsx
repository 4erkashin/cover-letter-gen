"use client";

import { type ReactNode } from "react";
import { Reshaped } from "reshaped";

import { ApplicationsProvider } from "@/features/application";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Reshaped theme="slate">
      <ApplicationsProvider>{children}</ApplicationsProvider>
    </Reshaped>
  );
}
