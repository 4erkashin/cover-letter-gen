import { View } from "reshaped";

export function CoverLetterWidget() {
  return (
    <View
      backgroundColor="neutral-faded"
      borderRadius="large"
      gap={3}
      padding={3}
    >
      <span>Your personalized job application will appear here...</span>

      <pre>copy to clipboard</pre>
    </View>
  );
}
