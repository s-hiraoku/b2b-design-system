/**
 * Tailwind CSS Configuration for Tech Blog Website
 * 
 * TDD Green Phase: レスポンシブデザインとダークモード対応
 * 設計書の要件に基づくカラーパレットとブレークポイント
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ダークモード対応のカラーパレット
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        // 技術ブログ用のカラーパレット
        tech: {
          dark: '#0d1117',
          darker: '#010409',
          light: '#f6f8fa',
          gray: '#6e7681',
          blue: '#58a6ff',
          green: '#7c3aed',
        }
      },
      // タイポグラフィ
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      // レスポンシブブレークポイント
      screens: {
        'xs': '475px',
        'sm': '640px',  // モバイル
        'md': '768px',  // タブレット
        'lg': '1024px', // デスクトップ
        'xl': '1280px', // 大画面
        '2xl': '1536px',
      },
      // アニメーション
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // タイポグラフィプラグイン（ブログ記事用）
    require('@tailwindcss/typography'),
    // フォームプラグイン
    require('@tailwindcss/forms'),
  ],
  // ダークモード設定
  darkMode: 'class',
}