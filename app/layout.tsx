import type { Metadata } from "next";

import { Container, View } from "reshaped";

import { Goal } from "@/features/goal";
import { AppLogo } from "@/ui/app-logo";
import { MAX_APP_WIDTH } from "@/ui/constants";
import { fixelDisplay, fixelText } from "@/ui/fonts";
import { HomeButton } from "@/ui/home-button";
import { ReshapedRoot } from "@/ui/reshaped-root";
import { THEME_NAME, themeCss } from "@/ui/theme";

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
      data-rs-theme={THEME_NAME}
      data-scroll-behavior="smooth"
      lang="en"
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body>
        <ReshapedRoot>
          <Container padding={0} width={MAX_APP_WIDTH}>
            <View gap={8} paddingBlock={4} paddingInline={4}>
              <View
                align="center"
                as="header"
                direction="row"
                gap={4}
                justify="space-between"
                paddingBlock={4}
                width="100%"
                wrap
              >
                <AppLogo />

                <View align="center" direction="row" gap={3} wrap>
                  <Goal.Root>
                    <Goal.Status />
                  </Goal.Root>
                  <HomeButton />
                </View>
              </View>
              {children}
            </View>
          </Container>
        </ReshapedRoot>
      </body>
    </html>
  );
}
