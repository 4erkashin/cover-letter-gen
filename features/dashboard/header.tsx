"use client";

import { Divider, Text, View } from "reshaped";

import { CreateNewButton } from "@/ui/create-new-button";

export function Header() {
  return (
    <View gap={4}>
      <View align="center" direction="row" justify="space-between">
        <Text
          as="h1"
          attributes={{
            style: { color: "var(--rs-color-foreground-strong)" },
          }}
          variant="headline-1"
        >
          Applications
        </Text>

        <CreateNewButton href="/new" />
      </View>

      <Divider />
    </View>
  );
}
