import { Icon, View } from "reshaped";

import AppLogoCircle from "./app-logo-circle.svg";
import AppLogoText from "./app-logo-text.svg";
import styles from "./app-logo.module.css";

export function AppLogo() {
  return (
    <View align="center" direction="row" gap={2}>
      <Icon color="positive" size={5} svg={AppLogoCircle} />
      <AppLogoText className={styles.logoText} />
    </View>
  );
}
