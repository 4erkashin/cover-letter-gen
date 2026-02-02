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
        <ProgressIndicator current={3} total={5}>
          <View align="center" direction="row" gap={3}>
            <ProgressIndicator.Label>
              {({ current, total }) => `${current}/${total} generated`}
            </ProgressIndicator.Label>

            <View align="center" direction="row" gap={1}>
              <ProgressIndicator.Items>
                {({ filled, index }) => (
                  <ProgressIndicator.Dot filled={filled} key={index} />
                )}
              </ProgressIndicator.Items>
            </View>
          </View>
        </ProgressIndicator>

        <HomeButton />
      </View>
    </View>
  );
}
