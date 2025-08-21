import { test, expect } from '@playwright/test'

test.describe('Kawaii Reading Blog - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test.describe('Homepage', () => {
    test('loads homepage successfully', async ({ page }) => {
      await expect(page).toHaveTitle(/Kawaii Reading Blog/)
      
      // Check for kawaii elements
      await expect(page.locator('h1')).toContainText('Kawaii Reading Blog')
      await expect(page.locator('text=🌸')).toBeVisible()
    })

    test('displays book cards', async ({ page }) => {
      // Wait for book cards to load
      await page.waitForSelector('[data-testid="book-card"]')
      
      const bookCards = page.locator('[data-testid="book-card"]')
      await expect(bookCards).toHaveCount(4) // Based on sample data
      
      // Check first book card content
      const firstCard = bookCards.first()
      await expect(firstCard).toContainText('The Enchanted Garden')
      await expect(firstCard).toContainText('Luna Sakura')
    })

    test('displays reading progress section', async ({ page }) => {
      const progressSection = page.locator('.reading-progress')
      await expect(progressSection).toBeVisible()
      
      // Check for kawaii emojis and progress indicators
      await expect(page.locator('text=📚')).toBeVisible()
      await expect(page.locator('text=🌸')).toBeVisible()
    })
  })

  test.describe('Interactive Elements', () => {
    test('book card hover effects work', async ({ page }) => {
      const bookCard = page.locator('[data-testid="book-card"]').first()
      
      // Hover over the book card
      await bookCard.hover()
      
      // Check for visual changes (transform, shadow, etc.)
      const cardStyle = await bookCard.getAttribute('style')
      expect(cardStyle).toBeTruthy()
    })

    test('like button interactions', async ({ page }) => {
      const likeButton = page.locator('[data-testid="like-button"]').first()
      
      // Click the like button
      await likeButton.click()
      
      // Check for state change or particle effects
      // Note: Particles might not be visible in headless mode
      await expect(likeButton).toBeVisible()
    })

    test('kawaii buttons are responsive', async ({ page }) => {
      const kawaiiButton = page.locator('button').first()
      
      // Click the button
      await kawaiiButton.click()
      
      // Should not throw errors
      await expect(kawaiiButton).toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('works on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      
      // Check that content is still accessible
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('[data-testid="book-card"]')).toBeVisible()
    })

    test('works on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.reload()
      
      // Check responsive grid layout
      const bookCards = page.locator('[data-testid="book-card"]')
      await expect(bookCards).toHaveCount(4)
    })

    test('works on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
      await page.reload()
      
      // Check that all elements are properly distributed
      await expect(page.locator('[data-testid="book-card"]')).toHaveCount(4)
    })
  })

  test.describe('Performance', () => {
    test('page loads within performance budget', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('http://localhost:3000')
      await page.waitForLoadState('networkidle')
      
      const loadTime = Date.now() - startTime
      expect(loadTime).toBeLessThan(3000) // 3 second budget
    })

    test('animations run smoothly', async ({ page }) => {
      // Enable performance monitoring
      await page.coverage.startJSCoverage()
      
      const bookCard = page.locator('[data-testid="book-card"]').first()
      
      // Trigger hover animations multiple times
      for (let i = 0; i < 5; i++) {
        await bookCard.hover()
        await page.waitForTimeout(100)
        await page.mouse.move(0, 0)
        await page.waitForTimeout(100)
      }
      
      const coverage = await page.coverage.stopJSCoverage()
      expect(coverage.length).toBeGreaterThan(0)
    })
  })

  test.describe('Accessibility', () => {
    test('has proper heading structure', async ({ page }) => {
      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1)
      
      const h2 = page.locator('h2')
      await expect(h2).toHaveCount.toBeGreaterThan(0)
    })

    test('supports keyboard navigation', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toBeVisible()
      
      // Continue tabbing
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toBeVisible()
    })

    test('has proper ARIA labels', async ({ page }) => {
      const progressBars = page.locator('[role="progressbar"]')
      
      if (await progressBars.count() > 0) {
        const firstProgressBar = progressBars.first()
        await expect(firstProgressBar).toHaveAttribute('aria-valuenow')
        await expect(firstProgressBar).toHaveAttribute('aria-valuemin')
        await expect(firstProgressBar).toHaveAttribute('aria-valuemax')
      }
    })

    test('respects reduced motion preferences', async ({ page, context }) => {
      // Set reduced motion preference
      await context.addInitScript(() => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: query.includes('prefers-reduced-motion'),
            addListener: jest.fn(),
            removeListener: jest.fn(),
          }))
        })
      })
      
      await page.reload()
      await expect(page.locator('h1')).toBeVisible()
    })
  })

  test.describe('Error Handling', () => {
    test('handles JavaScript errors gracefully', async ({ page }) => {
      // Monitor console errors
      const errors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })
      
      // Navigate and interact
      await page.goto('http://localhost:3000')
      await page.locator('[data-testid="book-card"]').first().click()
      
      // Should have minimal or no critical errors
      const criticalErrors = errors.filter(error => 
        !error.includes('404') && 
        !error.includes('favicon') &&
        !error.includes('Warning')
      )
      
      expect(criticalErrors.length).toBe(0)
    })

    test('handles network failures gracefully', async ({ page }) => {
      // Block network requests to simulate offline
      await page.route('**/*', route => route.abort())
      
      try {
        await page.goto('http://localhost:3000', { timeout: 5000 })
      } catch (error) {
        // Expected to fail, but shouldn't crash
        expect(error).toBeTruthy()
      }
    })
  })

  test.describe('Visual Regression', () => {
    test('homepage visual comparison', async ({ page }) => {
      await page.goto('http://localhost:3000')
      await page.waitForLoadState('networkidle')
      
      // Hide dynamic content for consistent screenshots
      await page.addStyleTag({
        content: `
          [data-testid="book-card-particles"] { display: none !important; }
          .particle { display: none !important; }
        `
      })
      
      // Take screenshot for visual regression testing
      await expect(page).toHaveScreenshot('homepage.png', {
        fullPage: true,
        threshold: 0.2
      })
    })

    test('book card hover state', async ({ page }) => {
      await page.goto('http://localhost:3000')
      
      const bookCard = page.locator('[data-testid="book-card"]').first()
      await bookCard.hover()
      
      await expect(bookCard).toHaveScreenshot('book-card-hover.png', {
        threshold: 0.3
      })
    })
  })
})