import { View } from "reshaped";

import { AppLogo } from "./app-logo";

export function AppHeader() {
  return (
    <View as="header">
      <AppLogo />
      <pre>counter</pre>
      <pre>home</pre>
    </View>
  );
}
