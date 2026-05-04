# TL;DR

AI-powered HR-tech web app for generating and managing personalized cover letters.

## Table of Contents

- [Overview](#overview)
- [Feature Brief](#feature-brief)
- [Decision log](#decision-log)

## Overview

A web app that helps job seekers quickly generate personalized cover letters using AI.

The product is designed to push users to create at least 5 letters via a simple progress-driven flow.

## Feature Brief

### Initial app load

When the user opens the app, it restores previously generated cover letters from browser storage.

- The list of cover letters persists between sessions within the same browser.
- Closing and reopening the tab does not reset or remove previously created letters.
- The restored data fully reflects the last known state of the user’s generated letters.
- Updates from other tabs are reflected in the app, no stale tabs issues.

### Generated letters threshold

The threshold for “enough” generated letters is **5**: the product flow is tuned so users are encouraged to reach at least five cover letters.

## Decision log

0. Chose Next.js as the main tool, due to plan to use vercel AI SDK for generating cover letters, deploy to vercel, and be able to not to expose prompt for letters generation to the client bundle.
1. Drafted the 1st README skeleton (TL;DR / overview / brief) as the product anchor before code.
2. Placed 1st version of main domain entity in `domain/`: `CoverLetter`
3. Chose vertical slices under `features/` (no root `store/`); first slice is `persist-storage` reflecting the [initial app load](#initial-app-load) requirement.
4. Chose Zustand for client state: a small API and built-in `persist` middleware that maps cleanly to browser `localStorage` for the `persist-storage` slice. The same middleware exposes `version`/`migrate` and a configurable `merge` when we need to evolve or reconcile saved snapshots later, so we are not painted into a corner as the product grows. The provider rehydrates on the client and listens for `storage` events so open tabs stay in sync.
