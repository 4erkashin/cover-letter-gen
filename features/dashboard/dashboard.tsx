"use client";

import { View } from "reshaped";

import { Header } from "./header";

export function Dashboard() {
  return (
    <View gap={12}>
      <View gap={6}>
        <Header />

        <pre>list shell</pre>
      </View>

      <pre>banner</pre>
    </View>
  );
}
