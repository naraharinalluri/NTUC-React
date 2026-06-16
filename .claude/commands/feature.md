---
description: Implement a feature on the NTUC-SC scaffold from the design docs
argument-hint: <feature-name>
---

Implement the **$1** feature on this scaffold.

Use the `build-from-lld` skill and follow `docs/COMPONENT_GUIDELINES.md`.

1. Read `docs/HLD.md` and `docs/LLD.md` for the **$1** feature. If the relevant
   sections are missing or unclear, ask me before proceeding.
2. Brainstorm and restate the component breakdown. For new/unspecified UI, use
   the `frontend-design` skill to settle layout and visual direction first.
3. Provision any missing shadcn primitives via `npx shadcn@latest add` (use the
   shadcn MCP to find the right registry item when unsure).
4. Build the components under `src/components/$1/`. For independent components,
   delegate each to the `component-builder` subagent.
5. Wire them into the route/page.
6. Write Vitest + React Testing Library tests (`*.test.tsx`) for each
   component's behavior.
7. Review the new TSX with the `vercel:react-best-practices` skill and fix
   findings.
8. Run `npm run test:run`, `npm run build`, and `npm run lint`. Then use the
   Playwright MCP to load the running app, navigate to **$1**, screenshot it,
   and confirm it renders without console errors. Report all results. Do not
   claim done until tests, build, and lint pass.
