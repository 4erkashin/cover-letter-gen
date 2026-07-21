import type { Metadata } from "next";
import { Container, View } from "reshaped";

import { AppHeader } from "@/features/dashboard/app-header";
import { MAX_APP_WIDTH } from "@/ui/constants";
import { fixelDisplay, fixelText } from "@/ui/fonts";
import { ReshapedRoot } from "@/ui/reshaped-root";
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
      data-scroll-behavior="smooth"
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
