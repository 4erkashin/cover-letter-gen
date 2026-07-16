"use client";

import Link from "next/link";
import type { KeyboardEvent, MouseEvent } from "react";
import { Button, Text } from "reshaped";

import TrashIcon from "@/ui/assets/trash-icon.svg";
import { CopyButton } from "@/ui/copy-button";

import styles from "./letter-card.module.css";

type LetterCardProps = {
  id: string;
  content: string;
  onDelete: () => void;
  className?: string;
};

export function LetterCard({
  id,
  content,
  onDelete,
  className,
}: LetterCardProps) {
  const handleDelete = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    onDelete();
  };

  return (
    <article className={[styles.root, className].filter(Boolean).join(" ")}>
      <Link href={`/${id}`} className={styles.link}>
        <div className={styles.content}>
          <Text
            as="p"
            variant="body-2"
            color="neutral"
            className={styles.preview}
          >
            {content}
          </Text>
        </div>
      </Link>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="ghost"
          color="critical"
          size="small"
          icon={TrashIcon}
          stopPropagation
          onClick={handleDelete}
        >
          Delete
        </Button>
        <CopyButton text={content} />
      </div>
    </article>
  );
}
