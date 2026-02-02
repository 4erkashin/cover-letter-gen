"use client";

import Link from "next/link";
import { Button } from "reshaped";

import styles from "./home-button.module.css";
import HomeIcon from "./home.svg";

export function HomeButton() {
  return (
    <Button
      className={styles.button}
      icon={HomeIcon}
      render={({ children, className, onClick, ref }) => (
        <Link
          className={className}
          href="/"
          onClick={onClick}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      )}
      variant="outline"
    />
  );
}
