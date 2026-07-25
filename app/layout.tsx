import type { Metadata } from "next";

import Link from "next/link";
import { Button, Container, View } from "reshaped";

import { Goal } from "@/features/goal";
import { AppLogo } from "@/ui/app-logo";
import { fixelDisplay, fixelText } from "@/ui/fonts";
import { ReshapedRoot } from "@/ui/reshaped-root";
import { MAX_APP_WIDTH, THEME_NAME, themeCss } from "@/ui/theme";

import HomeIcon from "@/ui/assets/home-icon.svg";

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
            <View
              align="center"
              as="header"
              direction="row"
              gap={4}
              justify="space-between"
              paddingBlock={8}
            >
              <AppLogo />

              <View align="center" direction="row" gap={3} wrap>
                <Goal.Root>
                  <Goal.Status />
                </Goal.Root>

                <Link aria-label="Home" href="/">
                  {/**
                   * Figma wants 40×40 with a 20px glyph;
                   * Reshaped derives both from `size` and offers 36 (medium) or 52 (large).
                   * `large` buys the 20px icon,
                   * the vars reset the box: 24 + 2×8 tall, 24 − 8 + 2×12 wide,
                   * icon-only trimming padding to 10px.
                   */}
                  <Button
                    attributes={{
                      style: {
                        "--rs-button-line-height": "var(--rs-unit-x6)",
                        "--rs-button-p-h": "var(--rs-unit-x3)",
                        "--rs-button-p-v": "var(--rs-unit-x2)",
                      },
                    }}
                    icon={HomeIcon}
                    size="large"
                    variant="outline"
                  />
                </Link>
              </View>
            </View>

            {children}
          </Container>
        </ReshapedRoot>
      </body>
    </html>
  );
}
