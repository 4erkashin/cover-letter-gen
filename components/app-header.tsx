import { View } from "reshaped";

import { AppLogo } from "./app-logo";
import { HomeButton } from "./home-button";

export function AppHeader() {
  return (
    <View align="center" as="header" direction="row" justify="space-between">
      <AppLogo />

      <View align="center" direction="row" gap={4}>
        <pre>counter</pre>

        <HomeButton />
      </View>
    </View>
  );
}
