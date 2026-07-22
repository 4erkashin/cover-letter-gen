"use client";

import { type ReactNode, useEffect, useState } from "react";
import { type ColorMode, Reshaped, ToastProvider } from "reshaped";

import "reshaped/themes/slate/theme.css";

export function ReshapedRoot({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyMode = (isDark: boolean) => {
      setColorMode(isDark ? "dark" : "light");
    };

    applyMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <Reshaped colorMode={colorMode} theme="slate">
      <ToastProvider>{children}</ToastProvider>
    </Reshaped>
  );
}
