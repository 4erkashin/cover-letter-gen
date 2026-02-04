import { type ReactNode } from "react";
import { Container, View } from "reshaped";

import { AppHeader } from "@/components/app-header";

import styles from "./layout.module.css";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Container className={styles.container} height="100dvh" width="375px">
      <AppHeader />

      <View as="main" gap={8}>
        {children}
      </View>
    </Container>
  );
}
