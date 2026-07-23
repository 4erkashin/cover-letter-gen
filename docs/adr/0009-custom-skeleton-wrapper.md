# App Skeleton wraps Reshaped with custom motion

Reshaped’s stock `Skeleton` uses an opacity pulse that reads as low-framerate / flashy in this product (same in their docs). We wrap it once under `@/ui/skeleton` with a quieter transform shimmer and tokenizable bg/shimmer CSS vars.

**Decision:** import `Skeleton` from `@/ui/skeleton`, never the value `Skeleton` from `reshaped`. Tune appearance in `ui/skeleton/skeleton.module.css` (`--skeleton-bg`, `--skeleton-shimmer`). ESLint bans the raw value import except in `ui/skeleton/skeleton.tsx`. `SkeletonProps` from `reshaped` stays allowed.

**Rejected:** using stock Reshaped `Skeleton` as-is; per-call-site CSS overrides; a second UI library for loading placeholders.
