---
description: Build the entire frontend app from the HLD/LLD (frontend-only)
---

Build the **entire frontend application** described in `docs/HLD.md` and
`docs/LLD.md`, following `CLAUDE.md` and `docs/COMPONENT_GUIDELINES.md`.

Use the `build-from-lld` skill. Key points:

1. **Frontend only.** The docs may describe a backend — do NOT build it. Stub
   all data behind a typed mock API layer in `src/lib/api/` (in-memory,
   simulated latency). Map backend concepts to UI: notifications → `sonner`,
   audit → read-only view over mock data, processing → mock state update.
   Document every assumption.
2. **Plan first.** Read both docs and restate the screens, roles, route map,
   and component breakdown. If anything is ambiguous, use the `brainstorming`
   skill before coding. For visual direction, use the `frontend-design` skill.
3. **Set up the foundation:** install React Router, create the mock API layer,
   the route table (`src/routes.tsx`), and the app shell/layout
   (`src/components/layout/`) with a role switcher. Pages go in `src/pages/`.
4. **Build** all pages and components — dispatch `component-builder` subagents
   for independent components; provision shadcn primitives via
   `npx shadcn@latest add`.
5. **Test** each component (Vitest + RTL, `*.test.tsx`).
6. **Review** the new TSX with the `vercel:react-best-practices` skill; fix
   findings.
7. **Verify:** run `npm run test:run`, `npm run build`, and `npm run lint`
   (all must pass), then use the Playwright MCP to load the app and click
   through each role's screens, confirming no console errors. Report results
   and all assumptions. Do not claim done until tests, build, and lint pass.
