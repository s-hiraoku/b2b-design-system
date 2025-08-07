/**
 * Home Page Component
 * 
 * TDD Green Phase: テストを通すための最小限のホームページ実装
 * 要件1,2,3: タイトル、ナビゲーション、ヒーローセクション、CTAボタン
 */

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-tech-dark">
      {/* ナビゲーション */}
      <nav className="bg-white dark:bg-tech-dark border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Tech Blog
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/blog" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main>
        {/* ヒーローセクション */}
        <div 
          data-testid="hero-section"
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white"
        >
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Tech Blog Website
              </h1>
              <p className="mt-6 text-xl leading-8 text-primary-100">
                エンジニア向けの技術情報を発信するブログプラットフォーム
              </p>
              <div className="mt-10">
                <button 
                  className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  Latest Posts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* コンテンツエリア */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              最新の技術記事
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              プログラミング、開発ツール、最新技術トレンドについて
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}