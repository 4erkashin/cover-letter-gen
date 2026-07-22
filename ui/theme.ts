import {
  baseThemeDefinition,
  generateThemeColors,
  getThemeCSS,
} from "@reshaped/theming";

/** Source of truth for Brand greens. `app/icon.svg` duplicates these hexes (SVG can't import TS) — keep both in sync; see `ui/__tests__/icon-brand-colors.test.ts`. */
export const BRAND = "#099250";
export const BRAND_DARK = "#36ab67";
export const PRIMARY = "#087443";
export const THEME_NAME = "altShift";

export const themeCss = getThemeCSS(THEME_NAME, {
  ...baseThemeDefinition,
  color: generateThemeColors({
    brand: { hex: BRAND, hexDark: BRAND_DARK },
    primary: PRIMARY,
  }),
});
