# NTUC-SC — Agent Instructions

React 19 + Vite + TypeScript (strict) + Tailwind CSS v4 + shadcn/ui (Radix base).

These instructions are **mandatory**, not suggestions. Follow them on every task.

## Component & code standards (REQUIRED)

All component work MUST follow @docs/COMPONENT_GUIDELINES.md. Read it before
writing or editing any component. If a request conflicts with the guidelines,
say so and ask — do not silently violate them.

The non-negotiable rules, summarized:

- **shadcn-first.** Never hand-write a raw `<button>`, `<input>`, `<select>`,
  dialog, dropdown, etc. when a shadcn primitive exists. Add missing ones with
  `npx shadcn@latest add <name>` — they land in `src/components/ui/`.
- **Do not edit `src/components/ui/` casually.** That is vendored shadcn source.
  Extend via composition or a `cva` variant, not ad-hoc edits.
- **Use the `@/` alias** for every import from `src/`. No deep relative paths.
- **Feature components** live in `src/components/<feature>/`, never in `ui/`.
- **Style with theme tokens** (`bg-background`, `text-foreground`,
  `text-muted-foreground`, `border-border`, …). No raw hex / arbitrary colors.
- **TypeScript is strict.** No `any`. Type every prop. No `@ts-ignore`.
- **Tests are required** for component behavior (Vitest + React Testing
  Library), co-located as `*.test.tsx`. They must pass before Done.

## Design documents

When implementing a feature, read the relevant design docs first:

- High-level design: `docs/HLD.md`
- Low-level design: `docs/LLD.md`

(These are read on demand — they are not auto-loaded — so open them explicitly
when a task references them.)

## Skills & tools to use

- **`brainstorming`** — clarify fuzzy requirements before any code.
- **`frontend-design`** — aesthetic direction + wireframing new UI so it isn't
  templated/default-looking.
- **`build-from-lld`** — the end-to-end playbook for building a feature from the
  design docs.
- **`vercel:react-best-practices`** — review pass after writing TSX components.
- **shadcn MCP** — search registries for the right primitive to add.
- **Playwright MCP** — load the running app and verify the feature renders.

## Workflow

For any non-trivial feature:

1. **Brainstorm** the requirements and component breakdown before coding
   (use the brainstorming skill). For new UI, use **frontend-design** to settle
   layout and visual direction first.
2. **Plan** the components, then build them — one cohesive unit at a time.
   For independent components, delegate to the `component-builder` subagent.
3. Prefer composing existing shadcn primitives over building from scratch
   (use the shadcn MCP to find them).
4. **Write tests** (Vitest + React Testing Library) for component behavior.
   Required as part of Done; before or after implementing is your call.
5. **Review** the new TSX with `vercel:react-best-practices` and fix findings.
6. **Definition of done:** `npm run test:run`, `npm run build`, and
   `npm run lint` all pass, AND (when available) the feature renders in the
   browser via the Playwright MCP without console errors. Run these and report
   results. Never claim done without this.

## Commands

- `npm run dev` — dev server
- `npm run build` — type-check + production build
- `npm run lint` — ESLint
- `npm run test:run` — run tests once (CI); `npm test` — watch mode
- `/feature <name>` — implement a feature from the design docs
