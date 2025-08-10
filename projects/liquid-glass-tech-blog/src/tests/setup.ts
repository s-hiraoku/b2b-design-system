import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Mock CSS modules and other static assets
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? false : false, // Default to no reduced motion for tests
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock CSS.supports for backdrop-filter detection
Object.defineProperty(window, 'CSS', {
  value: {
    supports: vi.fn().mockImplementation((property: string, value?: string) => {
      // Mock backdrop-filter support for testing
      if (property === 'backdrop-filter') {
        return true
      }
      // Handle other properties that might be checked
      return true
    }),
  },
})

// Mock requestAnimationFrame and cancelAnimationFrame for animation testing
global.requestAnimationFrame = vi.fn().mockImplementation((cb) => {
  return setTimeout(cb, 16) // 60fps
})

global.cancelAnimationFrame = vi.fn().mockImplementation((id) => {
  clearTimeout(id)
})

// Mock performance.now for performance testing
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
  },
})

// Mock next/image for component testing
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // Return mock element data instead of JSX
    return { type: 'img', props: { src, alt, ...props } }
  },
}))

// Mock next/navigation for testing navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock framer-motion for animation testing
vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (target, prop) => {
      return ({ children, ...props }: any) => {
        return { type: 'div', props: { 'data-testid': `motion-${String(prop)}`, ...props, children } }
      }
    }
  }),
  AnimatePresence: ({ children }: any) => ({ type: 'div', props: { 'data-testid': 'animate-presence', children } }),
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useMotionValue: (initial: any) => ({
    get: () => initial,
    set: vi.fn(),
    on: vi.fn(),
  }),
}))

// Set up environment variables for testing
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_SITE_NAME = 'Liquid Glass Tech Blog'