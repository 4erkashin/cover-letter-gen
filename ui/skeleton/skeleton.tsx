import type { SkeletonProps } from "reshaped";

// The one place the raw value import belongs — this is the wrapper ADR-0009 bans it for.
// eslint-disable-next-line no-restricted-imports
import { classNames, Skeleton as ReshapedSkeleton } from "reshaped";

import styles from "./skeleton.module.css";

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <ReshapedSkeleton
      {...props}
      className={classNames(styles.skeleton, className)}
    />
  );
}
