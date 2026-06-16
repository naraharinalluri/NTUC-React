import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ThemeProvider } from '@/components/theme-provider'
import App from '@/App'

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  )
}

describe('App', () => {
  it('renders the hero heading', () => {
    renderApp()
    expect(
      screen.getByRole('heading', { name: /modern react starter/i }),
    ).toBeInTheDocument()
  })

  it('renders the primary actions', () => {
    renderApp()
    expect(
      screen.getByRole('button', { name: /get started/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /documentation/i }),
    ).toBeInTheDocument()
  })
})
