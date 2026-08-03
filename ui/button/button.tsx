"use client";

import type { ButtonProps } from "reshaped";

// The one place the raw value import belongs — this is the wrapper ADR-0015 bans it for.
// eslint-disable-next-line no-restricted-imports
import { classNames, Button as ReshapedButton } from "reshaped";

import styles from "./button.module.css";

function sizeClassName(size: ButtonProps["size"]): undefined | string {
  if (size === undefined || size === "medium") {
    return styles.sizeMedium;
  }
  if (size === "large") {
    return styles.sizeLarge;
  }
  return undefined;
}

export function Button({ className, size, ...props }: ButtonProps) {
  return (
    <ReshapedButton
      {...props}
      className={classNames(sizeClassName(size), className)}
      size={size}
    />
  );
}
