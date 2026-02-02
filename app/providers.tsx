"use client";

import { type ReactNode } from "react";
import { Reshaped } from "reshaped";

export default function Providers({ children }: { children: ReactNode }) {
  return <Reshaped theme="slate">{children}</Reshaped>;
}
