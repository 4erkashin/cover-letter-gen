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
