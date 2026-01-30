import path from "path";

const mediaCssPath = path.resolve(
  process.cwd(),
  "node_modules/reshaped/dist/themes/reshaped/media.css",
);

const config = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: [mediaCssPath],
    },
    cssnano: { preset: ["default", { calc: false }] },
    "postcss-custom-media": {},
  },
};

export default config;
