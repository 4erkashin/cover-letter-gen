import { Text, View } from "reshaped";

import styles from "./letter-preview.module.css";

const EMPTY_PLACEHOLDER =
  "Your personalized job application will appear here...";

type LetterPreviewProps = {
  content?: string | null;
};

export function LetterPreview({ content = null }: LetterPreviewProps) {
  return (
    <View
      className={styles.root}
      attributes={{
        role: "region",
        "aria-label": "Generated letter preview",
      }}
    >
      {content ? (
        <Text
          as="p"
          color="neutral"
          variant="body-2"
          attributes={{ style: { whiteSpace: "pre-wrap" } }}
        >
          {content}
        </Text>
      ) : (
        <Text color="neutral-faded" variant="body-2">
          {EMPTY_PLACEHOLDER}
        </Text>
      )}
    </View>
  );
}
