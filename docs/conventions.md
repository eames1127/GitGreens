# Conventions

Derived from the existing code. Match these unless a change deliberately updates them (and this file).

## Vue components

- `<template>` first, then `<script setup>`, then `<style scoped>` (only if needed).
- Props via `defineProps({ name: { type, default/required } })` object syntax; emits via `defineEmits([...])`.
- Components stay presentational: pull logic from a composable, data from config.
- Child-specific pieces go in a lower-case subfolder (`components/plant/PlantTooltip.vue`).
- Use `HTML comments` in templates to label sections (`<!-- Garden Stats -->`).
- Look up season config defensively: `SEASONS[props.season] ?? SEASONS.summer`.
- Lists use a stable `:key` (`repo.id`), never the index.

## Composables

- File `useXxx.js`, exports a named function `useXxx()` returning an object of refs/computeds/functions.
- Async functions set `loading`/`error` refs and use `try / catch / finally`; return `null` on failure so callers can branch.
- Keep derivations as `computed`; prefer lookup objects (`{ grass: 70, shrub: 90 }[type] ?? fallback`) over `if` chains for per-type values.

## JavaScript style

- ES modules, named exports for config and composables, 2-space indent, single quotes, no semicolons.
- `const` by default; arrow functions for small helpers.
- Magic numbers that are tuning knobs belong in `src/config/`; layout pixel values local to one component may stay there with a short comment.
- Comments explain why (e.g. why plain grass is used under bigger plants), not what.

## Styling

- Tailwind utilities first. Translucent white on gradients is the house look: `bg-white/10`, `bg-white/20 hover:bg-white/30`, `text-white`, `rounded-lg` / `rounded-xl`, `transition-colors`.
- Dynamic values (sizes, positions, delays) go in `:style` bindings, not generated class names (Tailwind can't see them).
- Season-dependent classes are stored as full class strings in `SEASONS` so Tailwind's content scan picks them up.
- Dark mode via the `dark:` variant; theme state comes from `inject('theme')`.

## SVG assets

- Name: `<type>-<season>.svg` (`oak-winter.svg`); flowerless underplanting: `grass-plain[-season].svg` (summer has no suffix).
- Every plant type needs all four seasons. Adding a type or season means adding the full set.
- Keep artwork bottom-aligned so it roots onto the ground line.

## Text

- UI copy is short and playful with an emoji prefix (`🌿 Grow Garden`, `📸 Export Garden`).
- British English in comments, docs and UI (colour, centre).
