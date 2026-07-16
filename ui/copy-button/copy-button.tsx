"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { Button } from "reshaped";

import CopyIcon from "@/ui/assets/copy-icon.svg";

type CopyButtonProps = {
  text: string;
  className?: string;
};

function hasCopyableText(text: string): boolean {
  return text.trim().length > 0;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const disabled = !hasCopyableText(text);

  const handleClick = async (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    await navigator.clipboard.writeText(text);
  };

  return (
    <Button
      className={className}
      type="button"
      variant="ghost"
      color="neutral"
      size="small"
      endIcon={CopyIcon}
      disabled={disabled}
      stopPropagation
      onClick={handleClick}
    >
      Copy to clipboard
    </Button>
  );
}
