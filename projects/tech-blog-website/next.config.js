/**
 * Next.js 15 Configuration for Tech Blog Website
 * 
 * TDD Green Phase: テストを通すための最小限の設定
 * パフォーマンス最適化とセキュリティヘッダーを含む
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Routerを使用 (実験的機能は安定版での実装後に有効化)
  experimental: {
    // ppr: true, // Partial Prerendering (canary版のみ対応)
  },
  
  // TypeScript設定
  typescript: {
    // build時のTypeScriptエラーでビルドを停止する
    ignoreBuildErrors: false,
  },
  
  // ESLint設定  
  eslint: {
    // build時のESLintエラーでビルドを停止する
    ignoreDuringBuilds: false,
  },
  
  // 画像最適化設定（要件対応）
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  // セキュリティヘッダー設定
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection', 
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ]
  },
  
  // パフォーマンス最適化
  webpack: (config, { isServer }) => {
    // バンドル最適化
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          editor: {
            name: 'editor',
            test: /[\\/]node_modules[\\/](@uiw|react-md-editor)[\\/]/,
            priority: 20,
          },
          vendor: {
            name: 'vendor', 
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          }
        }
      }
    }
    
    return config
  },
  
  // 開発サーバー設定
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  
  // 本番ビルド最適化
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig