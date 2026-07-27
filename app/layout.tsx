import type { Metadata } from "next";

import { Container } from "reshaped";

import { AppHeader } from "@/ui/app-header";
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
            <AppHeader />

            {children}
          </Container>
        </ReshapedRoot>
      </body>
    </html>
  );
}
