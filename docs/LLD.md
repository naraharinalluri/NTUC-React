# Low-Level Design (LLD)

> Template — the implementation-level spec. The agent builds components from
> this. Be specific: one section per component.

## Data models / types

```ts
// Define the TypeScript types the feature uses.
type Example = {
  id: string
  // …
}
```

## Component breakdown

For each component, fill one block. The agent can build these independently
(one per `component-builder` subagent).

### `<ComponentName>`

- **File:** `src/components/<feature>/<name>.tsx`
- **Purpose:**
- **Props:**
  | Prop | Type | Required | Description |
  |---|---|---|---|
  | | | | |
- **shadcn primitives used:** _(e.g. Card, Button, Table)_
- **State / hooks:**
- **Interactions / events:**
- **States to handle:** loading / empty / error?
- **Notes / edge cases:**

---

### `<NextComponent>`

- **File:**
- **Purpose:**
- **Props:**
- **shadcn primitives used:**
- **State / hooks:**
- **Interactions / events:**
- **States to handle:**
- **Notes / edge cases:**

---

## Hooks / utilities

| Name | File | Purpose |
|---|---|---|
| | | |

## Wiring / composition

_How the components compose into the page/route._
