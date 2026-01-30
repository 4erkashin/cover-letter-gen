import { type ReactNode } from "react";
import { View } from "reshaped";

import { Header } from "@/components/header";

export default function ApplicationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />

      <View as="main">{children}</View>
    </>
  );
}
