import { LinkButton } from "../link-button";
import styles from "./home-button.module.css";
import HomeIcon from "./home.svg";

export function HomeButton() {
  return (
    <LinkButton
      className={styles.button}
      href="/"
      icon={HomeIcon}
      variant="outline"
    />
  );
}
