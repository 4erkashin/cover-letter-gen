import {
  baseThemeDefinition,
  generateThemeColors,
  getThemeCSS,
} from "@reshaped/theming";

import { FIXEL_DISPLAY_VAR, FIXEL_TEXT_VAR } from "@/ui/fonts";

export const THEME_NAME = "altShift";

/**
 * Product near-black fill (`black` / `--rs-color-black`).
 * Figma eye-black, not `#000`.
 * Static both modes.
 */
export const BLACK = "#101828";

/**
 * Source of truth for Brand greens.
 * `app/icon.svg` duplicates these hexes (SVG can't import TS) — keep both in sync;
 * see `ui/__tests__/icon-brand-colors.test.ts`.
 */
export const BRAND = "#099250";
export const BRAND_DARK = "#36ab67";

export const PRIMARY = "#087443";

/** Primary neutral ink (`foregroundNeutral` / `Text color="neutral"`). */
export const NEUTRAL_FOREGROUND = "#344054";
export const NEUTRAL_FOREGROUND_DARK = "#c3cee5";

/** Muted neutral ink (`foregroundNeutralFaded` / `Text color="neutral-faded"`). */
export const NEUTRAL_FADED = "#667085";
export const NEUTRAL_FADED_DARK = "#98A2B3";

/** Interactive chrome border (`borderNeutral` / `--rs-color-border-neutral`). */
export const NEUTRAL_BORDER = "#D0D5DD";
export const NEUTRAL_BORDER_DARK = "#475467";

/** Decorative separator border (`borderNeutralFaded` / `--rs-color-border-neutral-faded`). */
export const NEUTRAL_BORDER_FADED = "#EAECF0";
export const NEUTRAL_BORDER_FADED_DARK = "#444444";

/** Strongest product ink (`foregroundStrong`). Light shares Black’s hex; dark flips. */
export const STRONG_FOREGROUND = "#101828";
export const STRONG_FOREGROUND_DARK = "#f9fafb";

/** App shell max width in Reshaped units (default unit = 4px). */
export const MAX_APP_WIDTH = 280;

/** Figma title tracking as a fraction of font-size (px). */
const TITLE_TRACKING = -0.02;

const SYSTEM_SANS = "system-ui, -apple-system, Segoe UI, sans-serif";
const FIXEL_DISPLAY_STACK = `var(${FIXEL_DISPLAY_VAR}), ${SYSTEM_SANS}`;
const FIXEL_TEXT_STACK = `var(${FIXEL_TEXT_VAR}), ${SYSTEM_SANS}`;

/** Default Reshaped unit base (px). Half-steps below are multipliers of this. */
const UNIT_BASE_PX = 4;

/**
 * Reshaped only auto-generates x0-5 / x1-5 among half-steps.
 * Medium button pads need 2.5× and 4.5× (see ADR-0015 / `ui/button`).
 */
const UNIT_X2_5 = UNIT_BASE_PX * 2.5;
const UNIT_X4_5 = UNIT_BASE_PX * 4.5;

export const themeCss = getThemeCSS(THEME_NAME, {
    ...baseThemeDefinition,
    color: {
      ...generateThemeColors({
        brand: { hex: BRAND, hexDark: BRAND_DARK },
        primary: PRIMARY,
      }),
      black: {
        hex: BLACK,
      },
      borderNeutral: {
        hex: NEUTRAL_BORDER,
        hexDark: NEUTRAL_BORDER_DARK,
      },
      borderNeutralFaded: {
        hex: NEUTRAL_BORDER_FADED,
        hexDark: NEUTRAL_BORDER_FADED_DARK,
      },
      foregroundNeutral: {
        hex: NEUTRAL_FOREGROUND,
        hexDark: NEUTRAL_FOREGROUND_DARK,
      },
      foregroundNeutralFaded: {
        hex: NEUTRAL_FADED,
        hexDark: NEUTRAL_FADED_DARK,
      },
      foregroundStrong: {
        hex: STRONG_FOREGROUND,
        hexDark: STRONG_FOREGROUND_DARK,
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
      body2: {
        fontFamilyToken: "body",
        fontSize: { px: 16 },
        fontWeightToken: "regular",
        lineHeight: { px: 24 },
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
    shadow: {
      ...baseThemeDefinition.shadow,
      /** Outline Shadow — soft elevation on outline chrome. */
      outline: {
        dark: {
          parts: [
            {
              blurRadius: 2,
              colorToken: "white",
              offsetX: 0,
              offsetY: 1,
              opacity: 0.05,
              spreadRadius: 0,
            },
          ],
        },
        parts: [
          {
            blurRadius: 2,
            colorToken: "black",
            offsetX: 0,
            offsetY: 1,
            opacity: 0.05,
            spreadRadius: 0,
          },
        ],
      },
    },
    unit: {
      ...baseThemeDefinition.unit,
      base: { px: UNIT_BASE_PX },
      "x2-5": { px: UNIT_X2_5 },
      "x4-5": { px: UNIT_X4_5 },
    },
  });
