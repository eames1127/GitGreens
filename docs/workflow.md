# Workflow

## Before changing code

1. Read [architecture.md](architecture.md) to find the right layer for the change.
2. For anything bigger than a small fix, outline a short plan and wait for go-ahead.
3. Ask before adding a dependency, changing the GitHub API usage, or deleting files.

## Branches and commits

- One branch per change off `main`, merged by pull request. Existing naming:
  `feat/`, `bug/`, `refactor/`, `doc/`, `ci/` + PascalCaseName.
- Work on separate changes in separate git worktrees (`../GitGreens-<Name>`), one PR each.
- Commits: small and focused, conventional style, e.g. `feat(garden): add rain particles`,
  `fix(plant): anchor oak to ground line`. Only commit or push when asked.
- Update `README.md` (features, tables, project structure) in the same PR when behaviour or files change.

## Checks

Run all three before saying a change is done; CI runs the same on every PR and push to `main`:

```
npm run lint    # ESLint (flat config, eslint-plugin-vue essential)
npm test        # Vitest unit tests
npm run build   # Vite production build
```

GitHub Actions (`.github/workflows/`): **Build**, **Lint**, **Test** and **CodeQL** (security scanning,
also weekly). **Dependabot** opens weekly update PRs for npm packages and Actions; minor and patch
npm bumps are grouped. Treat major-version bumps (Vite, Tailwind, plugin-vue) as real migrations, not
routine merges: Vitest 2 needs Vite 5, and Tailwind 4 replaces the config format.

Never disable a lint rule, skip a test or loosen a check to get CI green.

Also check in the browser with `npm run dev`:

- load a real username, try all four seasons and light / dark mode;
- a user with many repos (e.g. `microsoft`) for wrapping and garden height;
- plants near every edge of the garden for tooltips;
- `npm run preview` when touching asset paths.

Say plainly what was and wasn't verified.

## Tests

- Bug fixes start with a failing test where practical (logic in composables and config).
- Tests sit next to the code (`useGitHub.test.js`) and mock `fetch` with `vi.stubGlobal`.
- Use fake timers (`vi.setSystemTime`) for anything date-based.
- Layout and visual bugs aren't covered by unit tests yet; check them in the browser.

## Definition of done

- Change sits in the correct layer (API → composable, numbers → config, view → component).
- No dead code, commented-out code or stray `console.log`.
- Errors surfaced to the user or logged deliberately, never swallowed.
- Lint, tests and build pass; behaviour checked in the browser; docs updated if architecture or conventions changed.
