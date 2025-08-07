/**
 * Root Layout Component
 * 
 * TDD Green Phase: テストを通すための最小限のレイアウト実装
 * 要件5,6: レスポンシブデザインとダークモード対応のクラス適用
 */

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Tech Blog Website',
  description: 'エンジニア向けの技術ブログWebサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${inter.variable} font-sans antialiased h-full`}>
        {children}
      </body>
    </html>
  )
}