import {
  baseThemeDefinition,
  generateThemeColors,
  getThemeCSS,
} from "@reshaped/theming";

import { FIXEL_DISPLAY_VAR, FIXEL_TEXT_VAR } from "@/ui/fonts";

/**
 * Source of truth for Brand greens.
 * `app/icon.svg` duplicates these hexes (SVG can't import TS) — keep both in sync;
 * see `ui/__tests__/icon-brand-colors.test.ts`.
 */
export const BRAND = "#099250";
export const BRAND_DARK = "#36ab67";

export const PRIMARY = "#087443";

/** Default text ink (`foregroundNeutral` / `Text color="neutral"`). */
export const NEUTRAL_FOREGROUND = "#667085";
export const NEUTRAL_FOREGROUND_DARK = "#c3cee5";

/** Product near-black (`black` / `--rs-color-black`). Figma eye-black, not `#000`. */
export const BLACK = "#101828";
export const BLACK_DARK = "#f9fafb";

export const THEME_NAME = "altShift";

/** App shell max width in Reshaped units (default unit = 4px). */
export const MAX_APP_WIDTH = 280;

/** Figma title tracking as a fraction of font-size (px). */
const TITLE_TRACKING = -0.02;

const SYSTEM_SANS = "system-ui, -apple-system, Segoe UI, sans-serif";
const FIXEL_DISPLAY_STACK = `var(${FIXEL_DISPLAY_VAR}), ${SYSTEM_SANS}`;
const FIXEL_TEXT_STACK = `var(${FIXEL_TEXT_VAR}), ${SYSTEM_SANS}`;

export const themeCss = getThemeCSS(THEME_NAME, {
  ...baseThemeDefinition,
  color: {
    ...generateThemeColors({
      brand: { hex: BRAND, hexDark: BRAND_DARK },
      primary: PRIMARY,
    }),
    black: {
      hex: BLACK,
      hexDark: BLACK_DARK,
    },
    foregroundNeutral: {
      hex: NEUTRAL_FOREGROUND,
      hexDark: NEUTRAL_FOREGROUND_DARK,
    },
  },
  font: {
    ...baseThemeDefinition.font,
    body1: {
      fontFamilyToken: "body",
      fontSize: { px: 18 },
      fontWeightToken: "regular",
      lineHeight: { px: 28 },
    },
    headline1: {
      fontFamilyToken: "headline",
      fontSize: { px: 48 },
      fontWeightToken: "semibold",
      letterSpacing: { px: TITLE_TRACKING * 48 },
      lineHeight: { px: 60 },
    },
    headline2: {
      fontFamilyToken: "headline",
      fontSize: { px: 36 },
      fontWeightToken: "semibold",
      letterSpacing: { px: TITLE_TRACKING * 36 },
      lineHeight: { px: 44 },
    },
  },
  fontFamily: {
    ...baseThemeDefinition.fontFamily,
    body: {
      family: FIXEL_TEXT_STACK,
    },
    headline: {
      family: FIXEL_DISPLAY_STACK,
    },
    title: {
      family: FIXEL_DISPLAY_STACK,
    },
  },
});
