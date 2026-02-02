import { type ReactNode } from "react";
import { Container, View } from "reshaped";

import { AppHeader } from "@/components/app-header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Container height="100dvh" width="375px">
      <AppHeader />

      <View as="main">{children}</View>
    </Container>
  );
}
