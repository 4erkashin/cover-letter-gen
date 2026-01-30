"use client";

import { type ReactNode } from "react";
import { Reshaped } from "reshaped";
import "reshaped/themes/slate/theme.css";

export default function Providers({ children }: { children: ReactNode }) {
  return <Reshaped theme="slate">{children}</Reshaped>;
}
