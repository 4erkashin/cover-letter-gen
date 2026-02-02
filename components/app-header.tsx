"use client";

import { View } from "reshaped";

import { AppLogo } from "./app-logo";
import { HomeButton } from "./home-button";
import { ProgressIndicator } from "./progress-indicator";

export function AppHeader() {
  return (
    <View align="center" as="header" direction="row" justify="space-between">
      <AppLogo />

      <View align="center" direction="row" gap={4}>
        <ProgressIndicator current={0} total={5}>
          <ProgressIndicator.Label>
            {({ current, total }) => `${current}/${total} generated`}
          </ProgressIndicator.Label>
        </ProgressIndicator>
        <HomeButton />
      </View>
    </View>
  );
}
