import path from "node:path";
import { getConfig } from "reshaped/config/postcss";

export default getConfig({
  themeMediaCSSPath: path.resolve(process.cwd(), "ui/themes/slate/media.css"),
});
