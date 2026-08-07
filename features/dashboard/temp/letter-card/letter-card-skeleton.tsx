import { classNames, View } from "reshaped";

import { Skeleton } from "@/ui/skeleton";

import styles from "./letter-card.module.css";

type LetterCardSkeletonProps = {
  className?: string;
};

export function LetterCardSkeleton({ className }: LetterCardSkeletonProps) {
  return (
    <article aria-hidden className={classNames(styles.root, className)}>
      <View gap={2} padding={6} paddingBottom={0}>
        <Skeleton borderRadius="small" height={4} width="100%" />
        <Skeleton borderRadius="small" height={4} width="90%" />
        <Skeleton borderRadius="small" height={4} width="70%" />
      </View>
    </article>
  );
}
