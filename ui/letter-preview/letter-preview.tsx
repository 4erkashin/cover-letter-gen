"use client";

import { useState } from "react";
import { Text, View } from "reshaped";

import { CopyButton } from "@/ui/copy-button";

import styles from "./letter-preview.module.css";

const EMPTY_PLACEHOLDER =
  "Your personalized job application will appear here...";

export const GENERATING_STATUS = "Generating…";

type LetterPreviewProps = {
  content?: string | null;
  isGenerating?: boolean;
};

export function LetterPreview({
  content = null,
  isGenerating = false,
}: LetterPreviewProps) {
  const [wasGenerating, setWasGenerating] = useState(false);
  const [shouldReveal, setShouldReveal] = useState(false);

  if (isGenerating && !wasGenerating) {
    setWasGenerating(true);
    setShouldReveal(false);
  } else if (!isGenerating && wasGenerating) {
    setWasGenerating(false);
    if (content) {
      setShouldReveal(true);
    }
  }

  const copyText = content ?? "";

  return (
    <View
      className={styles.root}
      attributes={{
        role: "region",
        "aria-label": "Generated letter preview",
        "aria-busy": isGenerating || undefined,
      }}
    >
      <div
        className={[
          styles.body,
          isGenerating ? styles.bodyGenerating : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isGenerating ? (
          <>
            <div
              className={styles.preloader}
              data-testid="letter-preloader"
              aria-hidden
            >
              <div className={styles.preloaderBlob} />
            </div>
            <Text
              color="neutral-faded"
              variant="body-2"
              className={styles.reducedMotionCopy}
            >
              {GENERATING_STATUS}
            </Text>
          </>
        ) : content ? (
          <Text
            as="p"
            color="neutral"
            variant="body-2"
            className={shouldReveal ? styles.reveal : undefined}
            attributes={{ style: { whiteSpace: "pre-wrap" } }}
          >
            {content}
          </Text>
        ) : (
          <Text color="neutral-faded" variant="body-2">
            {EMPTY_PLACEHOLDER}
          </Text>
        )}
      </div>

      <div className={styles.actions}>
        <CopyButton text={copyText} />
      </div>
    </View>
  );
}
