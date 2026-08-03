# App Button wraps Reshaped with Figma size geometry

Stock Reshaped `Button` sizes wire padding to whole-unit tokens and pick icon height in JS (`Icon` `--rs-h-s` 4/5/6 → 16/20/24px). Product mocks use medium **18/10** pads + **20px** icons and large **28/16** pads + **24px** icons (half-steps `x2-5` / `x4-5` plus stock `x7` / `x4`).

**Decision:** import `Button` from `@/ui/button`, never from `reshaped`. The wrapper applies a CSS module by `size` for medium/large pad vars and icon `--rs-h-s` (`!important` to beat Reshaped’s inline var). Half-units live in the theme entry; small/xlarge stay stock; responsive `size` objects skip the remap. ESLint bans the raw value import with no per-file carve-out; the wrapper takes an inline disable with a reason (same taste as ADR-0009). `ButtonProps` from `reshaped` stays allowed. `ui/link-button` composes this wrapper. Gap on large is deferred until the banner control is refactored.

**Rejected:** themeCss substring remap of hashed Button classes; a `BaseButton` name beside raw `Button`; snapping mocks to stock 16/20 icons and stock pads; a full Button facade for unrelated concerns.
