"use client";

import type { ReactNode } from "react";
import { Reshaped, ToastProvider } from "reshaped";
import "reshaped/themes/slate/theme.css";

export function ReshapedRoot({ children }: { children: ReactNode }) {
  return (
    <Reshaped defaultTheme="slate" defaultColorMode="light">
      <ToastProvider>{children}</ToastProvider>
    </Reshaped>
  );
}
