import type { SkeletonProps } from "reshaped";

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
