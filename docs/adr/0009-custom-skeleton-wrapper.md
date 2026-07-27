# App Skeleton wraps Reshaped with custom motion

Reshaped’s stock `Skeleton` uses an opacity pulse that reads as low-framerate / flashy in this product (same in their docs). We wrap it once in `ui/` with a quieter transform shimmer and tokenizable appearance.

**Decision:** import `Skeleton` from the UI wrapper, never from `reshaped`. Appearance is tuned only in that wrapper. ESLint bans the raw value import with no per-file carve-out; the wrapper takes an inline disable with a reason, so the single exception is visible where it happens rather than hidden in config (same taste as ADR-0006). `SkeletonProps` from `reshaped` stays allowed.

**Rejected:** using stock Reshaped `Skeleton` as-is; per-call-site CSS overrides; a second UI library for loading placeholders.
