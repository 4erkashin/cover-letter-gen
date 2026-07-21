"use client";

import { useState } from "react";
import { Text, View } from "reshaped";

import { CopyButton } from "@/ui/copy-button";

import styles from "./letter-preview.module.css";

const EMPTY_PLACEHOLDER =
  "Your personalized job application will appear here...";

export const GENERATING_STATUS = "Generating…";

type LetterPreviewProps = {
  content?: null | string;
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
      attributes={{
        "aria-busy": isGenerating || undefined,
        "aria-label": "Generated letter preview",
        role: "region",
      }}
      className={styles.root}
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
              aria-hidden
              className={styles.preloader}
              data-testid="letter-preloader"
            >
              <div className={styles.preloaderBlob} />
            </div>
            <Text
              className={styles.reducedMotionCopy}
              color="neutral-faded"
              variant="body-2"
            >
              {GENERATING_STATUS}
            </Text>
          </>
        ) : content ? (
          <Text
            as="p"
            attributes={{ style: { whiteSpace: "pre-wrap" } }}
            className={shouldReveal ? styles.reveal : undefined}
            color="neutral"
            variant="body-2"
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
