---
name: build-from-lld
description: Use when implementing a React feature OR an entire frontend app on
  the NTUC-SC scaffold from an HLD/LLD design doc — enforces frontend-only
  scope, the shadcn-first token-based structure, and the repo's React standards
  end to end.
---

# Building from a design doc (feature or whole app)

Follow this sequence. Do not skip steps. Works for one feature or the entire
app — for a whole app, the unit of work is "all screens + shell + components."

## Scope: FRONTEND ONLY

- Build the UI only. The HLD/LLD may include a backend — **do not build it.**
- Put all data behind a typed **mock API layer** in `src/lib/api/` (in-memory,
  simulated latency). Notifications → `sonner`; audit → read-only view over mock
  data; processing/"execution" → mock call that updates local state.
- Document every assumption (top of the mock module + in your report).
- See `CLAUDE.md` → "Scope: FRONTEND ONLY" and guidelines §2b.

## Skills & tools to use

- **`brainstorming`** — when requirements are fuzzy, before any code.
- **`frontend-design`** — for aesthetic direction and wireframing new UI so it
  doesn't read as templated defaults.
- **shadcn MCP** — search registries for the right primitive before building.
- **`vercel:react-best-practices`** — run as a review pass after writing TSX.
- **Playwright MCP** — load the running app and verify it actually renders.

## 1. Read the design

- Read `docs/HLD.md` and `docs/LLD.md` (or the specific sections referenced).
- Read `docs/COMPONENT_GUIDELINES.md` — these rules are mandatory.
- If anything is ambiguous, use the **brainstorming** skill before coding.
- For new/unspecified UI, use the **frontend-design** skill to settle layout,
  hierarchy, and visual direction (wireframe first) before building.
- Restate the component breakdown you extracted before writing code.

## 2. Plan the build

- Derive the **screens/routes** and **roles** from the HLD/LLD. For a whole app,
  plan: the app shell/layout, the route table, one page per screen, and the
  mock API modules — then the components.
- List every component from the LLD and its file path (`src/pages/` for routed
  views, `src/components/<feature>/` for feature components).
- List the shadcn primitives each one needs.
- Identify which components are **independent** (no shared in-progress state) —
  these can be delegated to parallel `component-builder` subagents.

## 3. Provision primitives & foundation

- For each missing shadcn primitive: `npx shadcn@latest add <name>`.
- Use the shadcn MCP to find the right registry item when unsure.
- Never hand-write a primitive that shadcn provides.
- If the app has multiple screens, install React Router and set up the mock API
  layer (`src/lib/api/`), route table (`src/routes.tsx`), and app shell first —
  pages and components build on top. See guidelines §2a and §2b.

## 4. Build

- One component per file; `kebab-case` file, `PascalCase` component.
- Type every prop (no `any`). Use the `@/` alias. Style with theme tokens.
- Compose shadcn primitives; handle loading / empty / error states.
- For independent components, dispatch the `component-builder` subagent per
  component; otherwise build them directly in dependency order.

## 5. Test

- Write **Vitest + React Testing Library** tests, co-located as `*.test.tsx`,
  for each component with behavior. Tests are required; before or after the
  implementation is your call.
- Test behavior via role/label/text queries; use `user-event` for interactions;
  cover loading / empty / error states. See `docs/COMPONENT_GUIDELINES.md` §12.

## 6. Review

- Run the **`vercel:react-best-practices`** skill over the new TSX to check
  component structure, hooks usage, accessibility, performance, and TS patterns.
- Address its findings before verifying.

## 7. Wire & verify (Definition of Done)

- Compose the components into the route/page per the LLD.
- Run `npm run test:run`, `npm run build`, and `npm run lint` — all MUST pass.
- Verify light + dark themes and keyboard accessibility.
- Use the **Playwright MCP** to load the running app (`npm run dev`), navigate
  to the feature, screenshot it, and confirm it renders without console errors.
  If Playwright is unavailable, state that and rely on test/build/lint.
- Report what was built + the test/build/lint/Playwright results. Do not claim
  done otherwise.

## Reference

Full rules live in `docs/COMPONENT_GUIDELINES.md`. When in doubt, defer to it.
