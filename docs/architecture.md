# Architecture

## Stack

- **Vue 3** with `<script setup>` single-file components (Composition API only, no Options API).
- **Vite 5** for dev server and build (`vite.config.js` only registers the Vue plugin).
- **Tailwind CSS 3** via PostCSS, `darkMode: 'class'`, custom `garden.*` colours in `tailwind.config.js`.
- **html-to-image** for PNG export.
- Plain JavaScript (ES modules, `"type": "module"`). No TypeScript, router or store library.
- **ESLint 9** (flat config, `eslint-plugin-vue` essential rules) and **Vitest 2** for unit tests.
- Fully client-side: no backend. Data comes from the public, unauthenticated GitHub REST API.

Vitest 2 is the last version that supports Vite 5; upgrading Vite to 6+ means upgrading Vitest with it.

## Data flow

```
GardenHome.vue ── useGitHub().fetchUserRepos(username)
   │          └─ validates username, then GET api.github.com/users/:user/repos (100 per page, up to 5 pages)
   │             → drops forks; rate-limit and 404 errors become friendly messages
   │             → only the latest search may update state (replies can arrive out of order)
   │
   ├─ useSeason() → season ref (auto-detected from month, user can override)
   │
   └─ GardenCanvas.vue (props: repos, loading, season; emits: export)
        │  rendered while loading too, so its "Growing your garden..." overlay shows;
        │  stats and Export are hidden until data arrives
        ├─ stats bar (computed totals)
        ├─ sky / ground / particles from SEASONS[season]
        └─ GardenPlant.vue × N (props: repo, delay, season)
             ├─ usePlantData(repo) → plantType, insect flags
             ├─ layered <img> plant SVGs (<type>-<season>.svg) via config/artwork.js
             ├─ insect <img> SVGs via config/artwork.js
             └─ plant/PlantTooltip.vue — keeps itself inside the garden's edges
GardenKey.vue (props: season) — legend showing the same seasonal artwork via config/artwork.js
App.vue — dark/light theme, shared via provide('theme') / inject('theme')
```

## Where things live

| Concern | Location | Rule |
|---------|----------|------|
| External API calls | `src/composables/useGitHub.js` | All `fetch` calls go here; expose `loading` / `error` refs |
| Repo → plant mapping logic | `src/composables/usePlantData.js` | Pure derivations from a repo object; shared helpers (e.g. `isRecentlyActive`) are named exports |
| Season state | `src/composables/useSeason.js` | |
| Tunable numbers / lookup tables | `src/config/*.js` | Exported `UPPER_SNAKE_CASE` constants; no Vue imports |
| Season palette & effects | `src/config/seasons.js` (`SEASONS`, `detectSeason`) | Adding a season = add a key here + matching SVG assets |
| Plant thresholds, language colours | `src/config/plantConfig.js` | |
| Layout and rendering | `src/components/` | Component names are multi-word (`GardenPlant`); sub-parts go in a subfolder named after the parent (`plant/`) |
| Artwork files | `src/assets/plants`, `src/assets/insects` | One SVG per plant type per season |
| Artwork lookup | `src/config/artwork.js` (`plantImage`, `INSECT_IMAGES`) | The only place that resolves artwork; components never import SVGs or hand-build `/src/...` URLs, so the garden and key always match |
| Global CSS | `src/style.css` | Tailwind layers only; component animations stay in `<style scoped>` |
| Unit tests | `*.test.js` next to the file they test | Mock `fetch`; never call the real GitHub API |
| CI | `.github/workflows/`, `.github/dependabot.yml` | See [workflow.md](workflow.md#checks) |

## Garden layout

The garden (`GardenCanvas.vue`) is at least 280px tall and grows with its rows of plants.
The sky is a fixed 106px band at the top; the ground fills everything below it, so every
row roots into soil. Plants sit in normal flow (not absolutely positioned) with 16px top
padding so even a grass-only first row stands below the sky.

The garden element carries `data-garden-bounds` and clips its contents. Anything that pops
out of a plant (the tooltip) measures itself against that element and moves back inside.

Seasonal particles fall by animating `top` from just above the garden to 100% of its height
(a percentage `translateY` would be relative to the particle, not the garden). A
`ResizeObserver` stretches their durations with the garden height so they fall at the same
speed in any size of garden, and negative delays start them part-way through their fall.

## Plant rendering model

Each repo is a "mini garden" slot whose width scales with size
(grass = 1, shrub = 2, tree = 3, oak = 4 × 72px units). Larger plant types stack
the smaller layers in front (oak → tree → shrub → grass, back to front). Under
bigger plants the grass uses the flowerless `grass-plain*` variant. Insects sit
above the tallest layer, offset by plant type.

Layers sway with a `transform` animation, so they are positioned with `left` plus the
separate CSS `translate` property; an inline `transform` would be overridden by the animation.

Plant type is chosen from `repo.size` (GitHub reports KB) against `PLANT_THRESHOLDS`.
Insects: bee = pushed in last 7 days, fly = open issues > 0, butterfly = ≥ 10 stars.
