import '@testing-library/jest-dom'
import { beforeEach, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock framer-motion for testing
vi.mock('framer-motion', () => ({
  motion: {
    button: 'button',
    div: 'div',
    span: 'span'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}))

// Performance observer mock for animation testing
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Performance API mock for animation timing
Object.defineProperty(global, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => [])
  }
})

// requestAnimationFrame and cancelAnimationFrame mocks
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 16)
  return 1
})
global.cancelAnimationFrame = vi.fn()

// matchMedia mock for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query.includes('prefers-reduced-motion') ? false : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Window dimensions for particle bounds checking
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024
})
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  value: 768
})