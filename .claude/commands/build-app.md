---
description: Build the entire frontend app from the HLD/LLD (frontend-only)
---

Read the agent specification in `docs/prompts/build-app.prompt.md` and
**execute it now** against this repository — that file is the single source of
truth for this command. Follow it end to end: discover and read the HLD/LLD
docs in `docs/`, build the entire frontend app on the scaffold, then deliver the
build report + execution summary it specifies.

Honor `CLAUDE.md` and `docs/COMPONENT_GUIDELINES.md` throughout, use the
`build-from-lld` skill, and do not claim done until `npm run test:run`,
`npm run build`, and `npm run lint` all pass.
