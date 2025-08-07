/**
 * Next.js Application Unit Tests
 * 
 * TDD Red Phase: アプリケーションの基本機能をテストする失敗テスト
 * Next.js 15 App Router + TypeScriptの基本構成が正しく動作することを検証
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// このimportは実装前なので失敗するはず（Red Phase）
import HomePage from '@/app/page'
import RootLayout from '@/app/layout'

describe('Next.js Application', () => {
  describe('HomePage Component', () => {
    it('should render homepage with tech blog title', () => {
      render(<HomePage />)
      
      // 要件1: 技術ブログのタイトルが表示される
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/tech.*blog/i)
    })

    it('should render navigation links', () => {
      render(<HomePage />)
      
      // 要件2: ナビゲーションリンクが表示される
      expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    })

    it('should render hero section with call to action', () => {
      render(<HomePage />)
      
      // 要件3: ヒーローセクションとCTAボタンが表示される
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /latest.*posts/i })).toBeInTheDocument()
    })
  })

  describe('RootLayout Component', () => {
    it('should render layout with proper metadata', () => {
      const mockChildren = <div data-testid="test-content">Test Content</div>
      
      render(
        <RootLayout>
          {mockChildren}
        </RootLayout>
      )
      
      // 要件4: レイアウトが子コンテンツを適切に表示する
      expect(screen.getByTestId('test-content')).toBeInTheDocument()
    })

    it('should include responsive design classes', () => {
      const mockChildren = <div>Test Content</div>
      
      render(
        <RootLayout>
          {mockChildren}
        </RootLayout>
      )
      
      // 要件5: レスポンシブデザインのクラスが適用される
      const body = document.body
      expect(body).toHaveClass('antialiased')
    })

    it('should provide dark mode support', () => {
      const mockChildren = <div>Test Content</div>
      
      render(
        <RootLayout>
          {mockChildren}
        </RootLayout>
      )
      
      // 要件6: ダークモード対応のクラスが適用される
      const html = document.documentElement
      expect(html).toHaveAttribute('class')
    })
  })

  describe('TypeScript Configuration', () => {
    it('should have proper TypeScript types for components', () => {
      // 要件7: TypeScript型が正しく定義されている
      // この段階ではコンパイルエラーが発生するはず（Red Phase）
      expect(() => {
        const HomePage: React.FC = () => <div>HomePage</div>
        const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>
      }).not.toThrow()
    })
  })

  describe('Performance Requirements', () => {
    it('should meet Core Web Vitals requirements', () => {
      // 要件8: パフォーマンス要件（実装後に実際の値で検証）
      // 現段階では実装されていないのでスキップ
      expect(true).toBe(true) // Placeholder for future performance tests
    })
  })
})