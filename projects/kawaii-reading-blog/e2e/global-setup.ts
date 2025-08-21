import { chromium, FullConfig } from '@playwright/test'

/**
 * Global setup for Playwright E2E tests
 * Prepares the test environment and validates application readiness
 */
async function globalSetup(config: FullConfig) {
  console.log('🌸 Setting up Kawaii Reading Blog E2E tests...')
  
  // Get base URL from config
  const baseURL = config.use?.baseURL || 'http://localhost:3000'
  
  // Launch browser for setup
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  try {
    console.log(`📡 Checking if application is running at ${baseURL}`)
    
    // Wait for the application to be ready
    await page.goto(baseURL, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Verify essential elements are present
    await page.waitForSelector('h1', { timeout: 10000 })
    
    console.log('✅ Application is ready for E2E testing')
    
    // Pre-warm the application by navigating key pages
    console.log('🏃‍♀️ Pre-warming application...')
    
    // Trigger initial kawaii animations to ensure they're loaded
    const bookCard = page.locator('[data-testid="book-card"]').first()
    if (await bookCard.count() > 0) {
      await bookCard.hover()
      await page.waitForTimeout(500)
    }
    
    console.log('🎯 Pre-warming complete')
    
  } catch (error) {
    console.error('❌ Application setup failed:', error)
    throw new Error(`Failed to setup E2E tests: ${error}`)
  } finally {
    await page.close()
    await browser.close()
  }
  
  console.log('🚀 E2E test setup complete!')
}

export default globalSetup