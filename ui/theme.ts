import {
  baseThemeDefinition,
  generateThemeColors,
  getThemeCSS,
} from "@reshaped/theming";

export const BRAND = "#099250";
export const PRIMARY = "#087443";
export const THEME_NAME = "altShift";

export const themeCss = getThemeCSS(THEME_NAME, {
  ...baseThemeDefinition,
  color: generateThemeColors({
    brand: BRAND,
    primary: PRIMARY,
  }),
});
