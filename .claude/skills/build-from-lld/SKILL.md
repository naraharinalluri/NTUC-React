---
name: build-from-lld
description: Use when implementing a React feature on the NTUC-SC scaffold from
  an HLD/LLD design doc — enforces the shadcn-first, token-based component
  structure and the repo's React standards end to end.
---

# Building a feature from a design doc

Follow this sequence. Do not skip steps.

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

- List every component from the LLD and its file path under
  `src/components/<feature>/`.
- List the shadcn primitives each one needs.
- Identify which components are **independent** (no shared in-progress state) —
  these can be delegated to parallel `component-builder` subagents.

## 3. Provision primitives

- For each missing shadcn primitive: `npx shadcn@latest add <name>`.
- Use the shadcn MCP to find the right registry item when unsure.
- Never hand-write a primitive that shadcn provides.

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
