# Cover Letter Generator

Greenfield Alt+Shift app for creating and managing AI-generated cover letters against a job goal.

## Language

**Cover Letter**:
A saved generated letter for a specific job (title + company + skills + details). The core domain entity; list length drives the goal.
_Avoid_: Application (as the domain type), Letter alone when ambiguous with UI chrome

**Application (UI copy)**:
Presentation wording in the mock (“Applications”, “New application”, “applications generated”). Not a second domain entity — always refers to a Cover Letter.
_Avoid_: Using “Application” as the code/module type name

**Goal**:
The target count of distinct saved Cover Letters. Progress is list length; regenerating (Try Again) does not increment it.
_Avoid_: Streak, quota, XP

**Brand**:
The mark-level product green. Used for the logo circle (not the wordmark) and other brand-mark accents. Maps to Reshaped's `brand` token; value is `BRAND` in the theme entry.
_Avoid_: Logo color, green, accent, lime

**Primary**:
The interactive product green. Used for CTAs and other primary actions. Maps to Reshaped's primary color family (`backgroundPrimary`, etc.); value is `PRIMARY` in the theme entry.
_Avoid_: CTA color, button green, accent, lime

**Neutral Foreground**:
Primary neutral ink (labels, icons, default `Text color="neutral"`). Maps to Reshaped's `foregroundNeutral`; values are `NEUTRAL_FOREGROUND` / `NEUTRAL_FOREGROUND_DARK` in the theme entry. Not the neutral surface/hue seed.
_Avoid_: Gray, Gray/700, `#344054`, secondary, charcoal, Neutral Strong

**Neutral Faded**:
Muted neutral ink (softer copy where the mock reads lighter than Neutral Foreground). Maps to Reshaped's `foregroundNeutralFaded` (`Text color="neutral-faded"`); values are `NEUTRAL_FADED` / `NEUTRAL_FADED_DARK` in the theme entry.
_Avoid_: Gray, Gray/500, `#667085`, secondary, muted (as a token name), old Neutral

**Neutral Border**:
Interactive chrome border (outline buttons, fields, similar controls). Maps to Reshaped's `borderNeutral` (`--rs-color-border-neutral`); values are `NEUTRAL_BORDER` / `NEUTRAL_BORDER_DARK` in the theme entry. Not `borderNeutralFaded` or the neutral surface/hue seed.
_Avoid_: Gray, Gray-300, `#D0D5DD`, slate, muted border, faded border (unless that token is intended)

**Strong Foreground**:
Strongest product ink — Figma eye-black text/icons (`#101828` in light). Custom theme color `foregroundStrong` / `--rs-color-foreground-strong`; values are `STRONG_FOREGROUND` / `STRONG_FOREGROUND_DARK`. Not Black (fills/scrims) and not Neutral Foreground.
_Avoid_: Black (when meaning ink), title color, emphasis, contrast, `#101828` as a one-off

**Black**:
The product near-black fill — Figma's eye-black (`#101828`), not `#000`. Static in light and dark (Reshaped `black` / `white` stay mode-invariant). For fills, scrims, media alphas, `View backgroundColor="black"`; not for flipping text ink (use Strong Foreground). Value is `BLACK` in the theme entry.
_Avoid_: True black, `#000`, charcoal, slate, `BLACK_DARK`, strong ink (when meaning text)
