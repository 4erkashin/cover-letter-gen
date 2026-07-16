import type { Metadata } from "next";
import { Container, View } from "reshaped";

import {
  AppHeader,
  MAX_APP_WIDTH,
  ReshapedRoot,
  fixelDisplay,
  fixelText,
} from "@/ui";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Alt+Shift Cover Letters",
  description: "Generate and manage cover letters against your job goal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fixelDisplay.variable} ${fixelText.variable}`}
      data-rs-theme="slate"
    >
      <body>
        <ReshapedRoot>
          <Container width={MAX_APP_WIDTH} padding={0}>
            <View gap={8} paddingInline={4} paddingBlock={4}>
              <AppHeader />
              {children}
            </View>
          </Container>
        </ReshapedRoot>
      </body>
    </html>
  );
}
