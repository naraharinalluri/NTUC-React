import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Unmount React trees after every test to avoid cross-test leakage.
afterEach(() => {
  cleanup()
})

// Provide an in-memory localStorage (not exposed as a global in this env).
const store = new Map<string, string>()
const localStorageMock: Storage = {
  getItem: (key) => store.get(key) ?? null,
  setItem: (key, value) => void store.set(key, String(value)),
  removeItem: (key) => void store.delete(key),
  clear: () => store.clear(),
  key: (index) => Array.from(store.keys())[index] ?? null,
  get length() {
    return store.size
  },
}
afterEach(() => store.clear())
Object.defineProperty(globalThis, 'localStorage', {
  writable: true,
  value: localStorageMock,
})

// jsdom does not implement matchMedia, which the ThemeProvider relies on.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})
