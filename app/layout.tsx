import type { Metadata } from "next";

import { Button, Container, View } from "reshaped";

import { Goal } from "@/features/goal";
import { AppLogo } from "@/ui/app-logo";
import HomeIcon from "@/ui/assets/home-icon.svg";
import { fixelDisplay, fixelText } from "@/ui/fonts";
import { ReshapedRoot } from "@/ui/reshaped-root";
import { MAX_APP_WIDTH, THEME_NAME, themeCss } from "@/ui/theme";

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
                  <Button
                    attributes={{ "aria-label": "Home" }}
                    href="/"
                    icon={HomeIcon}
                    size="small"
                    variant="outline"
                  />
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
