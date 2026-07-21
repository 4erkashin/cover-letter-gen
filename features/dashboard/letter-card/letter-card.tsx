"use client";

import type { KeyboardEvent, MouseEvent } from "react";

import Link from "next/link";
import { Button, Text } from "reshaped";

import TrashIcon from "@/ui/assets/trash-icon.svg";
import { CopyButton } from "@/ui/copy-button";

import styles from "./letter-card.module.css";

type LetterCardProps = {
  className?: string;
  content: string;
  id: string;
  onDelete: () => void;
};

export function LetterCard({
  className,
  content,
  id,
  onDelete,
}: LetterCardProps) {
  const handleDelete = (
    event: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    onDelete();
  };

  return (
    <article className={[styles.root, className].filter(Boolean).join(" ")}>
      <Link className={styles.link} href={`/${id}`}>
        <div className={styles.content}>
          <Text
            as="p"
            className={styles.preview}
            color="neutral"
            variant="body-2"
          >
            {content}
          </Text>
        </div>
      </Link>

      <div className={styles.actions}>
        <Button
          color="critical"
          icon={TrashIcon}
          onClick={handleDelete}
          size="small"
          stopPropagation
          type="button"
          variant="ghost"
        >
          Delete
        </Button>
        <CopyButton text={content} />
      </div>
    </article>
  );
}
