import { ArrowRight, Code2, Palette, Sparkles, Zap } from 'lucide-react'
import { toast } from 'sonner'

import { ModeToggle } from '@/components/mode-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const features = [
  {
    icon: Zap,
    title: 'Vite + React 19',
    description:
      'Instant HMR and an optimized production build powered by the latest React.',
  },
  {
    icon: Palette,
    title: 'Tailwind CSS v4',
    description:
      'Zero-config styling with the new engine, CSS variables, and design tokens.',
  },
  {
    icon: Sparkles,
    title: 'shadcn/ui',
    description:
      'Accessible, fully-owned component source you can shape to your brand.',
  },
]

function App() {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <header className="border-border sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-md text-sm">
              N
            </span>
            NTUC-SC
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/shadcn-ui/ui"
                target="_blank"
                rel="noreferrer"
                aria-label="Source on GitHub"
              >
                <Code2 className="h-5 w-5" />
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <section className="flex flex-col items-center gap-6 py-20 text-center">
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Scaffolded with best practices
          </Badge>
          <h1 className="font-heading max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            A modern React starter with Tailwind & shadcn/ui
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg text-pretty">
            TypeScript, the <code>@/</code> path alias, dark mode, and a curated
            set of accessible components — ready for you to build on.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() =>
                toast.success('Everything is wired up!', {
                  description: 'Start editing src/App.tsx to make it yours.',
                })
              }
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                Documentation
              </a>
            </Button>
          </div>
        </section>

        <Separator />

        <section className="grid gap-4 py-16 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="bg-muted text-foreground flex h-10 w-10 items-center justify-center rounded-md">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-2">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Production-ready and fully customizable.
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto w-full max-w-5xl px-6 py-6 text-center text-sm">
          Built with Vite, React, Tailwind CSS v4, and shadcn/ui.
        </div>
      </footer>
    </div>
  )
}

export default App
