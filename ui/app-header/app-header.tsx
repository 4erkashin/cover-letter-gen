"use client";

import { View } from "reshaped";

import { BrandLink } from "@/ui/brand-link";
import { HomeButton } from "@/ui/home-button";

export function AppHeader() {
  return (
    <View
      as="header"
      direction="row"
      align="center"
      justify="space-between"
      gap={4}
      paddingBlock={4}
      width="100%"
    >
      <BrandLink />
      <HomeButton />
    </View>
  );
}
