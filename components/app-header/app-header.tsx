import { Icon, View } from "reshaped";

import AppLogoCircle from "./app-logo-circle.svg";

export function AppHeader() {
  return (
    <View as="header">
      <Icon color="positive" size={5} svg={AppLogoCircle} />
      <pre>counter</pre>
      <pre>home</pre>
    </View>
  );
}
