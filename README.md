# NTUC-SC

A modern React starter scaffolded with current best practices.

## Stack

- **[Vite](https://vite.dev)** — fast dev server & build (with `@vitejs/plugin-react`)
- **[React 19](https://react.dev)** + **TypeScript** (strict)
- **[Tailwind CSS v4](https://tailwindcss.com)** — via `@tailwindcss/vite`, no config file needed
- **[shadcn/ui](https://ui.shadcn.com)** — Radix-based, accessible components you own
- **[Geist](https://vercel.com/font)** font + **[lucide-react](https://lucide.dev)** icons
- **[sonner](https://sonner.emilkowal.ski)** for toasts
- Built-in **light / dark / system** theming

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components (owned source — edit freely)
│   ├── theme-provider.tsx  # light/dark/system theme context
│   └── mode-toggle.tsx     # theme switcher
├── lib/
│   └── utils.ts            # cn() class-merge helper
├── App.tsx                 # demo home page
├── main.tsx                # app entry (ThemeProvider + Toaster)
└── index.css               # Tailwind + design tokens
```

The `@/` path alias maps to `src/` (configured in `vite.config.ts` and `tsconfig`).

## Adding components

```bash
npx shadcn@latest add dialog table command
```

Components are copied into `src/components/ui/` as source — customize them directly.
See the [component directory](https://ui.shadcn.com/docs/components) for the full list.
