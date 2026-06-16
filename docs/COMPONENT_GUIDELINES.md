# Component Guidelines & React Standards

**Status: MANDATORY.** These rules apply to all UI code in this repo. The agent
reads this before building or editing components (enforced via `CLAUDE.md`).

---

## 1. Component-source guardrails (shadcn-first)

1. **Never hand-roll a primitive that shadcn provides.** Buttons, inputs,
   selects, checkboxes, dialogs, dropdowns, tabs, tooltips, popovers, tables,
   sheets, etc. come from `src/components/ui/`.
2. **Need one that isn't installed?** Add it via the CLI — do not copy code by
   hand:
   ```bash
   npx shadcn@latest add <component>
   ```
   You may also use the shadcn MCP to search registries for the right item.
3. **`src/components/ui/` is vendored source.** Do not casually edit it. To
   change behavior/appearance, either:
   - compose around it in a feature component, or
   - add a new `cva` variant to the component's own file (intentional, reviewed).
4. **Compose, don't reinvent.** Reach for `Card`, `Tabs`, `Dialog`, `Table`,
   `Sheet`, `Command` before writing custom layout shells. Use `AlertDialog`
   (not `Dialog`) for destructive confirmations.

---

## 2. File & folder structure

```
src/
├── components/
│   ├── ui/                  # shadcn primitives — vendored, leave alone
│   └── <feature>/           # feature components, e.g. checkout/, dashboard/
│       ├── cart-summary.tsx
│       └── cart-item.tsx
├── hooks/                   # reusable hooks: use-<thing>.ts
├── lib/                     # utilities (cn, formatters, api clients)
└── types/                   # shared TS types/interfaces (optional)
```

- **One component per file.** File name = `kebab-case`. Component = `PascalCase`.
- Feature-specific components stay inside that feature folder. Promote to a
  shared location only when reused by 2+ features.
- Co-locate a component's helpers/sub-parts in the same folder.

---

## 3. Naming

| Thing | Convention | Example |
|---|---|---|
| Component file | kebab-case | `cart-summary.tsx` |
| Component name | PascalCase | `CartSummary` |
| Hook file/name | `use-` prefix | `use-cart.ts` → `useCart` |
| Boolean prop | `is/has/should` | `isLoading`, `hasError` |
| Event handler prop | `on` prefix | `onSubmit`, `onSelect` |
| Internal handler | `handle` prefix | `handleSubmit` |
| Constants | UPPER_SNAKE | `MAX_ITEMS` |

---

## 4. TypeScript standards

- **Strict mode is on. No `any`.** Use `unknown` + narrowing if a type is truly
  unknown. No `@ts-ignore`/`@ts-expect-error` without a one-line justification.
- **Type every prop** via an explicit `type Props = { … }`. Prefer `type` over
  `interface` for props (consistency); use `interface` only when you need
  declaration merging.
- Derive types from a single source of truth where possible
  (`React.ComponentProps<typeof X>`, `keyof`, `as const`).
- Avoid enums; prefer string-literal unions (`type Size = 'sm' | 'md' | 'lg'`).
- Export the `Props` type when a component is meant to be reused.

```tsx
type CartSummaryProps = {
  items: CartItem[]
  onCheckout: () => void
  isLoading?: boolean
}

export function CartSummary({ items, onCheckout, isLoading = false }: CartSummaryProps) {
  // …
}
```

---

## 5. React standards

- **Function components only.** No class components.
- **Rules of Hooks**: call hooks at the top level, never in conditions/loops.
  Keep `useEffect` dependency arrays complete and honest — don't suppress the
  lint. If an effect is doing derived state, compute during render instead.
- **Prefer derived state over stored state.** Don't `useState` for values you
  can compute from props/other state.
- **Composition over configuration.** Pass `children` and use the `asChild`
  pattern (Radix) rather than growing a prop with 12 booleans.
- **Lift state only as far as needed.** Co-locate state with the component that
  owns it. For cross-tree shared state, use Context (small) or a dedicated store
  (larger) — don't prop-drill more than ~2 levels.
- **Keys** must be stable and unique — never the array index for dynamic lists.
- **Effects are an escape hatch**, not the default. No data fetching logic
  sprinkled in components without a clear pattern (hook or query layer).

---

## 6. Styling

- **Theme tokens only** for foundational surfaces: `bg-background`, `bg-card`,
  `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`.
  **No raw hex, no arbitrary `bg-[#…]`** for core UI.
- **Merge classes with `cn()`** (`@/lib/utils`) — never string-concatenate
  conditional classNames.
- **One density per surface** (comfortable `gap-6 p-6` or compact `gap-4 p-4`).
- Keep `--radius` consistent; use the radius tokens, don't invent values.
- Icons: **lucide-react** at `h-4 w-4` / `h-5 w-5`, kept visually quiet.
- Respect dark mode — verify both themes; rely on tokens so it's automatic.

```tsx
import { cn } from '@/lib/utils'
<div className={cn('rounded-lg border p-4', isActive && 'bg-muted')} />
```

---

## 7. Accessibility (non-negotiable)

- Every interactive element is reachable and operable by keyboard.
- Icon-only buttons need an accessible name (`aria-label` or `sr-only` text).
- Use semantic elements / shadcn primitives (they bring correct ARIA).
- Associate labels with inputs (`<Label htmlFor>` + matching `id`).
- Maintain visible focus states (don't remove `outline`/`ring`).
- Images need `alt`; decorative images get `alt=""`.

---

## 8. State: loading / empty / error

Every data-driven view must handle all three explicitly — no bare spinners or
blank screens:

- **Loading** → `Skeleton` placeholders.
- **Empty** → a designed empty state (icon + message + optional action).
- **Error** → `Alert` (or inline message), with a retry path where it makes sense.

---

## 9. Forms

- Compose `Label` + `Input`/`Select`/etc. + inline error message.
- For non-trivial forms, use **React Hook Form + Zod** (add when first needed)
  and shadcn's `Form` components. Validate on submit; show field-level errors.
- Disable the submit button while submitting; give success/error feedback
  (e.g. `sonner` toast).

---

## 10. Performance

- Don't optimize prematurely. Reach for `useMemo`/`useCallback`/`memo` only for
  measured hot paths or to stabilize deps — not by reflex.
- Code-split heavy/rarely-used routes or components with `React.lazy` + `Suspense`.
- Keep render trees shallow; avoid creating new object/array/function literals
  in props of memoized children.

---

## 11. Imports & ordering

Order imports: (1) external packages, (2) `@/` internal modules, (3) relative.
Always use `@/` for anything under `src/`.

```tsx
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

---

## 12. Testing (REQUIRED)

Every component with behavior ships with tests. Stack: **Vitest + React
Testing Library** (jsdom). Tests are required as part of Done — writing them
before or after the implementation is your call, but they must exist and pass.

- **Co-locate** tests next to the component: `cart-summary.test.tsx`.
- **Test behavior, not implementation.** Query by role/label/text the way a user
  would (`getByRole`, `getByLabelText`), not by class names or test IDs unless
  there's no better handle.
- Use `@testing-library/user-event` for interactions (click, type, etc.).
- Cover: it renders, the key interactions work, and the loading / empty / error
  states each render. Assert accessible names exist.
- Pure helpers/hooks get their own unit tests.
- Wrap components that need context (e.g. `ThemeProvider`) in a small render
  helper. Shared test setup lives in `src/test/setup.ts`.

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CartSummary } from './cart-summary'

describe('CartSummary', () => {
  it('calls onCheckout when the button is clicked', async () => {
    const onCheckout = vi.fn()
    render(<CartSummary items={[]} onCheckout={onCheckout} />)
    await userEvent.click(screen.getByRole('button', { name: /checkout/i }))
    expect(onCheckout).toHaveBeenCalledOnce()
  })
})
```

Run with `npm run test:run` (CI/one-shot) or `npm test` (watch).

---

## 13. Definition of Done

A component/feature is NOT done until:

- [ ] It follows every rule above.
- [ ] **Tests exist and `npm run test:run` passes.**
- [ ] `npm run build` passes (type-check clean).
- [ ] `npm run lint` passes (zero warnings).
- [ ] Loading / empty / error states handled where applicable.
- [ ] Works in both light and dark themes.
- [ ] Keyboard-accessible; icon-only controls labeled.

Report the test/build/lint output. Do not claim completion without running them.
