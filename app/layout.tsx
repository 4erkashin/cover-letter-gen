import type { Metadata } from "next";

import { Container, View } from "reshaped";

import { AppHeader } from "@/features/dashboard/app-header";
import { MAX_APP_WIDTH } from "@/ui/constants";
import { fixelDisplay, fixelText } from "@/ui/fonts";
import { ReshapedRoot } from "@/ui/reshaped-root";

import "@/ui/globals.css";

export const metadata: Metadata = {
  description: "Generate and manage cover letters against your job goal.",
  title: "Alt+Shift Cover Letters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${fixelDisplay.variable} ${fixelText.variable}`}
      data-rs-theme="slate"
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body>
        <ReshapedRoot>
          <Container padding={0} width={MAX_APP_WIDTH}>
            <View gap={8} paddingBlock={4} paddingInline={4}>
              <AppHeader />
              {children}
            </View>
          </Container>
        </ReshapedRoot>
      </body>
    </html>
  );
}
