# AI Workflow — How the Agent Setup Works

This repo is wired so that Claude Code builds a **frontend-only** React app from
an HLD/LLD using consistent standards. This file explains every artifact, how
they link, and how to drive them.

> TL;DR: put your `HLD.md` + `LLD.md` in `docs/`, open a fresh session, and
> either type `/build-app` or paste the manual prompt at the bottom.

---

## 1. Artifact inventory

| File | Type | Purpose | How it triggers |
|---|---|---|---|
| `CLAUDE.md` | Instructions | Always-on house rules: frontend-only scope, shadcn-first, tests, Definition of Done. Imports the guidelines. | **Automatic** — loaded every session |
| `docs/COMPONENT_GUIDELINES.md` | Standards | The mandatory component/React standards, routing & mock-API conventions, testing, Definition of Done. | **Automatic** — imported by `CLAUDE.md` |
| `docs/HLD.md`, `docs/LLD.md` | Design input | What to build. You fill these (or receive them). | **On demand** — read when a task references them |
| `.claude/skills/build-from-lld/SKILL.md` | Skill | The end-to-end playbook (plan → foundation → build → test → review → verify). | **Auto** (model matches description) **or manual** |
| `.claude/agents/component-builder.md` | Subagent | Builds ONE component + its test in an isolated context. Used for parallel fan-out. | **Delegated** by the skill/main agent |
| `.claude/commands/build-app.md` | Command | `/build-app` — builds the whole app from HLD/LLD. | **Manual** — you type `/build-app` |
| `.claude/commands/feature.md` | Command | `/feature <name>` — builds one slice. | **Manual** — you type `/feature <name>` |

External skills/tools the skill pulls in at the right step: `brainstorming`,
`frontend-design`, `vercel:react-best-practices`, the **shadcn MCP**, and the
**Playwright MCP**.

---

## 2. How they link

```
                    ┌───────────────────────────────────────────┐
   YOU  ─ type ───▶ │  /build-app  OR  a plain-English prompt   │
                    └───────────────────────────────────────────┘
                                      │ invokes / matches
                                      ▼
                    ┌───────────────────────────────────────────┐
                    │  build-from-lld   (skill — the playbook)  │
                    └───────────────────────────────────────────┘
              reads │            │ delegates per component
        ┌───────────┘            ▼
        ▼              ┌──────────────────────────┐
  docs/HLD.md          │  component-builder        │  ← subagent: isolated
  docs/LLD.md          │  (1 component + 1 test)   │     context, runs parallel
        ▲              └──────────────────────────┘
        │ rules always apply       │ pulls in at each step
   ┌─────────────────┐   ┌───────────────────────────────────────┐
   │  CLAUDE.md      │   │ frontend-design · react-best-practices │
   │  (auto-loaded)  │   │ shadcn MCP · Playwright MCP            │
   │   ▼ imports     │   └───────────────────────────────────────┘
   │ COMPONENT_      │
   │ GUIDELINES.md   │
   └─────────────────┘
```

**One sentence:** you trigger `/build-app` (or a prompt) → it runs the
`build-from-lld` skill → which reads the HLD/LLD, obeys the always-on
`CLAUDE.md` + guidelines, fans independent components out to `component-builder`
subagents, and calls the design/review/MCP tools along the way.

---

## 3. Trigger types (the key mental model)

- **Automatic (always):** `CLAUDE.md` + the guidelines it imports. They apply no
  matter how you prompt — this is why scope, tests, and standards are always
  enforced.
- **Manual:** commands (`/build-app`, `/feature`). A command is just a saved
  prompt — same power as typing it yourself.
- **Auto or manual:** the `build-from-lld` skill. The model self-invokes it when
  your request matches its description; commands invoke it explicitly.
- **Delegated:** the `component-builder` subagent. The skill hands it independent
  components to build in parallel, isolated contexts.
- **Pulled in by the skill:** `frontend-design` (wireframe), shadcn MCP (find
  primitives), `vercel:react-best-practices` (review), Playwright MCP (verify).

---

## 4. The loop

1. Put `HLD.md` and `LLD.md` in `docs/`.
2. Open a **fresh session** (commands/skills load at session start).
3. Run `/build-app` **or** paste the manual prompt (§6).
4. Review the result; iterate with follow-up prompts or `/feature <name>` for
   specific slices.

**Definition of Done** (enforced everywhere): `npm run test:run`, `npm run
build`, and `npm run lint` all pass, plus Playwright browser verification when
available.

---

## 5. Frontend-only scope (important)

The HLD/LLD may describe a backend. **We never build it.** All data lives behind
a typed mock layer in `src/lib/api/` (in-memory, simulated latency). Backend
concepts map to UI:

- notifications → `sonner` toast
- audit trail → a read-only view over mock data
- "execution" / processing → a mock call that updates local state + status
- access control → UI-level role switching (no real auth)

Every such assumption is documented at the top of the relevant mock module.

---

## 6. Copy-paste manual prompt

Use this instead of `/build-app` if you prefer typing:

```
Build the entire frontend app described in docs/HLD.md and docs/LLD.md,
following CLAUDE.md and docs/COMPONENT_GUIDELINES.md. Use the build-from-lld
skill.

Frontend only — do NOT build any backend. Stub all data behind a typed mock
API in src/lib/api/ (in-memory, simulated latency) and document assumptions.

Plan the screens/roles/routes first, then set up React Router + the mock API +
app shell, then build all pages and components — dispatch component-builder
subagents for independent ones. Write Vitest + RTL tests, review with
vercel:react-best-practices, then run test:run/build/lint and verify in the
browser with Playwright. Report assumptions and results.
```

For a single slice, swap the first paragraph for: *"Implement the `<name>`
feature from docs/HLD.md and docs/LLD.md…"* (or just run `/feature <name>`).
