"use client";

import type { KeyboardEvent, MouseEvent } from "react";

import { Button } from "reshaped";

import CopyIcon from "@/ui/assets/copy-icon.svg";

type CopyButtonProps = {
  className?: string;
  text: string;
};

function hasCopyableText(text: string): boolean {
  return text.trim().length > 0;
}

export function CopyButton({ className, text }: CopyButtonProps) {
  const disabled = !hasCopyableText(text);

  const handleClick = async (
    event: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>,
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
      color="neutral"
      disabled={disabled}
      endIcon={CopyIcon}
      onClick={handleClick}
      size="small"
      stopPropagation
      type="button"
      variant="ghost"
    >
      Copy to clipboard
    </Button>
  );
}
