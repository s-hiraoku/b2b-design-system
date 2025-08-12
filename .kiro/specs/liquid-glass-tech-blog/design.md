# Technical Design

## Overview

Liquid Glass Tech BlogプロジェクトはNext.js 15とReact 19を基盤とした最先端のLiquid Glass/Glassmorphismデザイン技術に特化した技術ブログプラットフォームです。パフォーマンス最適化されたCSS`backdrop-filter`とGPU加速、季節連動型テーマシステム、リアルタイムエフェクトエディタを統合したモダンなWebアプリケーションとして設計されています。

## Requirements Mapping

### Design Component Traceability

各設計コンポーネントは特定の要件に対応しています：

- **ブログCMSシステム** → REQ-1: コアブログ機能（モダンブログ構成）
- **AIアイキャッチ画像システム** → REQ-2: アイキャッチ画像生成・管理システム  
- **MDXコンテンツエンジン** → REQ-3: MDXコンテンツ管理システム
- **Liquid Glassライブラリ** → REQ-4: Liquid Glassエフェクトライブラリ
- **リアルタイムエディタ** → REQ-5: 管理者限定リアルタイムエフェクトエディタ
- **パフォーマンス最適化** → REQ-6: パフォーマンス最適化（Core Web Vitals）
- **アクセシビリティシステム** → REQ-7: WCAG 2.1 AA準拠
- **SEO統合エンジン** → REQ-8: SEO最適化とメタデータ管理
- **レスポンシブフレームワーク** → REQ-9: レスポンシブデザインとクロスブラウザ対応
- **CDN配信システム** → REQ-10: コンテンツ配信とキャッシュ戦略
- **分析・監視システム** → REQ-11: 分析とユーザー体験の監視
- **季節テーマエンジン** → REQ-12: 季節・時間帯連動テーマシステム

### User Story Coverage

全てのユーザーストーリーが技術設計で対応されています：

- **デザイナー・開発者ストーリー**: ブログCMSとMDXシステムによる高品質記事管理
- **コンテンツ管理者ストーリー**: AIアイキャッチ生成と管理システム、リアルタイムエディタ
- **開発者コミュニティストーリー**: Liquid Glassライブラリとコンポーネントエクスポート機能
- **全ユーザーストーリー**: パフォーマンス最適化と季節連動テーマによる優れた体験

## Architecture

### High-Level System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js 15 App Router] --> B[React 19 Server Components]
        B --> C[Tailwind CSS 4 + Liquid Glass]
        C --> D[Framer Motion Animations]
        D --> E[MDX Content Renderer]
    end
    
    subgraph "State Management"
        F[Zustand Store] --> G[React Query Cache]
        G --> H[Theme State Manager]
    end
    
    subgraph "Content Layer"
        I[MDX Files] --> J[AI Image Generator]
        J --> K[Content API]
        K --> L[Search Integration]
    end
    
    subgraph "Effect Engine"
        M[Liquid Glass Components] --> N[Seasonal Theme Engine]
        N --> O[Performance Monitor]
        O --> P[GPU Acceleration Layer]
    end
    
    subgraph "Infrastructure"
        Q[Vercel Edge Runtime] --> R[CDN Cloudinary]
        R --> S[Analytics Vercel GA4]
        S --> T[Weather API Integration]
    end
    
    A --> F
    B --> I
    C --> M
    A --> Q
```

### Core Technology Stack

**Frontend Framework:**
- **Next.js 15 (App Router)**: SSG/ISR最適化、Server Components
- **React 19**: 新しいHook API、Concurrent Features
- **TypeScript 5.x**: Strict type safety、最新型推論

**Styling & Animation:**
- **Tailwind CSS 4**: JIT compilation、カスタムCSS変数統合
- **@developer-hub/liquid-glass**: 専用Liquid Glassライブラリ（主要選択）
- **Motion (Framer Motion 2025)**: パフォーマンス最適化アニメーション（補助選択）
- **shadcn/ui**: モダンUIコンポーネントライブラリ
- **glasscn-ui**: Glassmorphismエフェクト専用コンポーネント統合

**Content Management:**
- **MDX (Next-MDX-Remote)**: React component embedding
- **Headless CMS統合**: 管理インターフェース
- **AI画像生成API**: OpenAI DALL-E 3またはMidjourney API

### Architecture Decision Rationale

**Next.js 15 App Router選択理由:**
- Server Components によるパフォーマンス向上
- 自動的なCode Splitting とBundle Optimization
- Built-in Image Optimization でLCP改善

**@developer-hub/liquid-glass選択理由:**
- 専用設計によるLiquid Glassエフェクトの最適化
- TypeScript完全サポートと型安全性
- GPU加速とパフォーマンス最適化
- カスタマイズ可能なプリセットとテーマ対応

**shadcn/ui統合選択理由:**
- モダンなRadix UI primitives基盤
- Tailwind CSSとの完全統合
- アクセシビリティ（WCAG 2.1 AA）標準準拠
- カスタマイズ可能なデザインシステム

**Motion (Framer Motion 2025)選択理由:**
- パフォーマンス最適化された新アーキテクチャ
- Liquid Glassエフェクトとの協調動作
- 60fps維持のためのGPU最適化
- React 19の新機能との統合

**MDX統合選択理由:**
- Liquid Glassコンポーネントの直接埋め込み
- インタラクティブデモの実装
- 技術記事に最適化されたオーサリング体験

## Data Flow

### Content Creation Flow

```mermaid
sequenceDiagram
    participant Admin as 管理者
    participant Editor as リアルタイムエディタ
    participant AI as AI画像生成
    participant CMS as Content Management
    participant CDN as CDN/Cache
    
    Admin->>Editor: Liquid Glassエフェクト作成
    Editor->>Editor: リアルタイムプレビュー
    Admin->>CMS: MDX記事作成・投稿
    CMS->>AI: アイキャッチ画像生成リクエスト
    AI-->>CMS: 生成画像（WebP最適化）
    CMS->>CDN: コンテンツ配信準備
    CDN-->>User: 高速コンテンツ配信
```

### User Experience Flow

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant App as Next.js App
    participant Theme as 季節テーマエンジン
    participant Weather as Weather API
    participant Analytics as Analytics
    
    User->>App: サイト訪問
    App->>Theme: 現在の季節・時間取得
    App->>Weather: ユーザー位置の天気取得
    Theme->>App: 適用テーマ決定
    App->>User: 季節対応UI表示
    User->>App: インタラクション
    App->>Analytics: UX指標記録
```

## Components and Interfaces

### Core Liquid Glass Components

```typescript
// components/liquid-glass/LiquidGlassCard.tsx
import { LiquidGlass, LiquidGlassVariant } from '@developer-hub/liquid-glass';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LiquidGlassCardProps {
  variant: LiquidGlassVariant;
  blur?: number;
  opacity?: number;
  saturation?: number;
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  seasonalTheme?: boolean;
  motionPreset?: 'subtle' | 'smooth' | 'spring';
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  variant = 'glass-medium',
  blur = 15,
  opacity = 0.1,
  saturation = 1.8,
  children,
  className = '',
  interactive = false,
  seasonalTheme = true,
  motionPreset = 'smooth',
  ...props
}) => {
  const { currentTheme } = useSeasonalTheme();
  
  // Motion configurations for different presets
  const motionConfigs = {
    subtle: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 }
    },
    smooth: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    spring: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { type: "spring", damping: 20, stiffness: 300 }
    }
  };

  const MotionCard = motion(Card);
  
  return (
    <LiquidGlass
      variant={variant}
      blur={blur}
      opacity={opacity}
      saturation={saturation}
      theme={seasonalTheme ? currentTheme.name : undefined}
      className={cn("liquid-glass-container", className)}
    >
      <MotionCard
        className={cn(
          "border-0 bg-transparent shadow-none",
          interactive && "hover:scale-[1.02] cursor-pointer",
          className
        )}
        {...motionConfigs[motionPreset]}
        whileHover={interactive ? { scale: 1.02 } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        {...props}
      >
        <CardContent className="p-6">
          {children}
        </CardContent>
      </MotionCard>
    </LiquidGlass>
  );
};

// Enhanced shadcn/ui component with liquid glass integration
export const LiquidGlassButton: React.FC<{
  variant?: 'glass' | 'glass-solid' | 'glass-outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ 
  variant = 'glass', 
  size = 'md',
  children, 
  onClick,
  className 
}) => {
  return (
    <LiquidGlass variant="glass-subtle">
      <motion.button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            'px-3 py-2 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {children}
      </motion.button>
    </LiquidGlass>
  );
};
```

### Seasonal Theme Engine

```typescript
// lib/theme/seasonalTheme.ts
interface SeasonalTheme {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  timeOfDay: 'morning' | 'day' | 'evening' | 'night';
  weather?: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  glassMorphism: {
    backdropFilter: string;
    backgroundColor: string;
    borderColor: string;
    particleEffect?: 'sakura' | 'waterdrops' | 'leaves' | 'snow';
  };
}

export const useSeasonalTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<SeasonalTheme>();
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const determineTheme = useCallback(() => {
    const now = new Date();
    const month = now.getMonth();
    const hour = now.getHours();
    
    // 季節決定ロジック
    const season = month >= 2 && month <= 4 ? 'spring' :
                   month >= 5 && month <= 7 ? 'summer' :
                   month >= 8 && month <= 10 ? 'autumn' : 'winter';
    
    // 時間帯決定ロジック
    const timeOfDay = hour >= 6 && hour < 10 ? 'morning' :
                      hour >= 10 && hour < 17 ? 'day' :
                      hour >= 17 && hour < 22 ? 'evening' : 'night';

    return generateThemeConfig(season, timeOfDay, weatherData?.weather);
  }, [weatherData]);

  return { currentTheme, weatherData, determineTheme };
};
```

### MDX Component Integration

```typescript
// components/mdx/MDXComponents.tsx
import { LiquidGlassCard, LiquidGlassButton, EffectDemo, CodePreview } from '@/components/liquid-glass';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'motion/react';
import { LiquidGlass } from '@developer-hub/liquid-glass';

export const MDXComponents = {
  // Enhanced Liquid Glass components for MDX
  LiquidGlassCard: (props: any) => (
    <LiquidGlassCard 
      variant="glass-medium" 
      interactive 
      seasonalTheme 
      motionPreset="smooth"
      {...props} 
    />
  ),
  
  EffectDemo: ({ effectCode, ...props }: any) => (
    <LiquidGlass variant="glass-intense" className="my-8">
      <EffectDemo 
        code={effectCode}
        preview
        editable
        exportable
        {...props}
      />
    </LiquidGlass>
  ),
  
  CodePreview: ({ language, ...props }: any) => (
    <LiquidGlassCard variant="glass-subtle" className="my-6">
      <CodePreview 
        language={language}
        syntaxHighlight
        copyButton
        {...props}
      />
    </LiquidGlassCard>
  ),

  // Enhanced shadcn/ui components with liquid glass
  Button: ({ variant = "default", ...props }: any) => (
    <LiquidGlassButton {...props} />
  ),

  Badge: ({ variant = "secondary", ...props }: any) => (
    <LiquidGlass variant="glass-subtle">
      <Badge variant={variant} {...props} />
    </LiquidGlass>
  ),

  Alert: ({ children, ...props }: any) => (
    <LiquidGlassCard variant="glass-medium" className="my-6">
      <Alert {...props}>{children}</Alert>
    </LiquidGlassCard>
  ),

  // Enhanced standard elements with motion
  h1: ({ children, ...props }: any) => (
    <motion.h1 
      className="text-4xl font-bold mb-6 liquid-glass-text" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.h1>
  ),
  
  h2: ({ children, ...props }: any) => (
    <motion.h2 
      className="text-3xl font-semibold mb-4 liquid-glass-text"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      {...props}
    >
      {children}
    </motion.h2>
  ),

  h3: ({ children, ...props }: any) => (
    <motion.h3 
      className="text-2xl font-medium mb-3 liquid-glass-text"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      {...props}
    >
      {children}
    </motion.h3>
  ),

  pre: ({ children, ...props }: any) => (
    <LiquidGlassCard variant="glass-subtle" className="my-6">
      <pre className="p-6 font-mono overflow-x-auto" {...props}>
        {children}
      </pre>
    </LiquidGlassCard>
  ),

  blockquote: ({ children, ...props }: any) => (
    <LiquidGlassCard variant="glass-medium" className="my-6">
      <div className="border-l-4 border-primary pl-6">
        <blockquote className="text-muted-foreground italic" {...props}>
          {children}
        </blockquote>
      </div>
    </LiquidGlassCard>
  ),

  hr: () => (
    <LiquidGlass variant="glass-subtle" className="my-8">
      <Separator />
    </LiquidGlass>
  ),

  // Custom components for technical articles
  TechSpec: ({ title, specs, ...props }: any) => (
    <LiquidGlassCard variant="glass-medium" className="my-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-lg">{title}</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(specs).map(([key, value]: [string, any]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium">{key}:</span>
              <Badge variant="outline">{value}</Badge>
            </div>
          ))}
        </div>
      </div>
    </LiquidGlassCard>
  ),

  PerformanceMetrics: ({ metrics, ...props }: any) => (
    <LiquidGlassCard variant="glass-intense" className="my-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-lg">Performance Metrics</h4>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric: any, index: number) => (
            <motion.div
              key={metric.name}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </LiquidGlassCard>
  )
};
```

### Real-time Effect Editor Interface

```typescript
// components/admin/EffectEditor.tsx
import { LiquidGlassCard, LiquidGlassButton } from '@/components/liquid-glass';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { LiquidGlass } from '@developer-hub/liquid-glass';

interface EffectEditorProps {
  initialCode?: string;
  onSave: (effect: EffectData) => void;
  onExport: (format: ExportFormat) => void;
}

export const EffectEditor: React.FC<EffectEditorProps> = ({
  initialCode = '',
  onSave,
  onExport
}) => {
  const [code, setCode] = useState(initialCode);
  const [preview, setPreview] = useState<React.ComponentType | null>(null);
  const [parameters, setParameters] = useState<EffectParameters>({
    blur: 15,
    opacity: 0.1,
    saturation: 1.8,
    brightness: 1.0
  });
  const [activeTab, setActiveTab] = useState('editor');
  const { currentTheme } = useSeasonalTheme();

  const updatePreview = useCallback(
    debounce(async (newCode: string) => {
      try {
        const compiledComponent = await compileEffectCode(newCode, parameters);
        setPreview(() => compiledComponent);
      } catch (error) {
        console.error('Effect compilation error:', error);
      }
    }, 300),
    [parameters]
  );

  return (
    <div className="h-screen p-6">
      <LiquidGlass variant="glass-intense" className="h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-[400px] grid-cols-3">
              <TabsTrigger value="editor">エディタ</TabsTrigger>
              <TabsTrigger value="preview">プレビュー</TabsTrigger>
              <TabsTrigger value="export">エクスポート</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <LiquidGlassButton
                onClick={() => onSave({ code, parameters })}
                className="bg-primary hover:bg-primary/90"
              >
                保存
              </LiquidGlassButton>
              <LiquidGlassButton
                onClick={() => onExport('react')}
                variant="glass-outline"
              >
                エクスポート
              </LiquidGlassButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
            {/* Code Editor Panel */}
            <div className="lg:col-span-2">
              <TabsContent value="editor" className="h-full">
                <LiquidGlassCard variant="glass-medium" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="outline">TypeScript</Badge>
                      Liquid Glass Effect Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-5rem)]">
                    <CodeEditor
                      value={code}
                      onChange={(value) => {
                        setCode(value);
                        updatePreview(value);
                      }}
                      language="typescript"
                      theme={currentTheme.name}
                      className="h-full"
                      options={{
                        minimap: { enabled: false },
                        wordWrap: 'on',
                        fontSize: 14,
                        fontFamily: 'JetBrains Mono, monospace',
                        lineNumbers: 'on',
                        syntaxHighlight: true,
                        autocompletion: true,
                        bracketPairColorization: true,
                        smoothScrolling: true
                      }}
                    />
                  </CardContent>
                </LiquidGlassCard>
              </TabsContent>

              <TabsContent value="preview" className="h-full">
                <LiquidGlassCard variant="glass-subtle" className="h-full">
                  <CardHeader>
                    <CardTitle>ライブプレビュー</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-5rem)]">
                    <div className="preview-container h-full min-h-[400px] flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {preview ? (
                          <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full"
                          >
                            <preview />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-muted-foreground"
                          >
                            <div className="text-lg mb-2">プレビューを準備中...</div>
                            <div className="text-sm">コードを編集してエフェクトを確認</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </LiquidGlassCard>
              </TabsContent>

              <TabsContent value="export" className="h-full">
                <LiquidGlassCard variant="glass-medium" className="h-full">
                  <CardHeader>
                    <CardTitle>エクスポート設定</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ExportOptions
                      onExport={onExport}
                      code={code}
                      parameters={parameters}
                    />
                  </CardContent>
                </LiquidGlassCard>
              </TabsContent>
            </div>

            {/* Parameter Controls Panel */}
            <div className="space-y-4">
              <LiquidGlassCard variant="glass-medium">
                <CardHeader>
                  <CardTitle className="text-sm">エフェクトパラメータ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ParameterControl
                    label="ブラー強度"
                    value={parameters.blur}
                    min={0}
                    max={50}
                    step={1}
                    onChange={(value) => 
                      setParameters(prev => ({ ...prev, blur: value[0] }))
                    }
                  />
                  
                  <ParameterControl
                    label="透明度"
                    value={parameters.opacity}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(value) => 
                      setParameters(prev => ({ ...prev, opacity: value[0] }))
                    }
                  />
                  
                  <ParameterControl
                    label="彩度"
                    value={parameters.saturation}
                    min={0}
                    max={3}
                    step={0.1}
                    onChange={(value) => 
                      setParameters(prev => ({ ...prev, saturation: value[0] }))
                    }
                  />
                  
                  <ParameterControl
                    label="明度"
                    value={parameters.brightness}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onChange={(value) => 
                      setParameters(prev => ({ ...prev, brightness: value[0] }))
                    }
                  />
                </CardContent>
              </LiquidGlassCard>

              <LiquidGlassCard variant="glass-subtle">
                <CardHeader>
                  <CardTitle className="text-sm">パフォーマンス監視</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceMonitor parameters={parameters} />
                </CardContent>
              </LiquidGlassCard>
            </div>
          </div>
        </Tabs>
      </LiquidGlass>
    </div>
  );
};

// Parameter Control Component
const ParameterControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number[]) => void;
}> = ({ label, value, min, max, step, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <Label className="text-xs font-medium">{label}</Label>
      <Badge variant="secondary" className="text-xs">
        {typeof value === 'number' ? value.toFixed(2) : value}
      </Badge>
    </div>
    <Slider
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={onChange}
      className="w-full"
    />
  </div>
);
```

## Technology Stack Integration

### Core Dependencies

```json
// package.json - Key dependencies for the updated stack
{
  "dependencies": {
    "@developer-hub/liquid-glass": "^3.2.0",
    "motion": "^11.0.0",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-badge": "^1.0.4",
    "@radix-ui/react-card": "^1.0.4",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "glasscn-ui": "^2.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.1",
    "lucide-react": "^0.316.0"
  }
}
```

### shadcn/ui Configuration

```typescript
// components/ui/index.ts - Core shadcn/ui components
export { Button } from './button';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
export { Badge } from './badge';
export { Label } from './label';
export { Separator } from './separator';
export { Slider } from './slider';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
export { Alert, AlertDescription, AlertTitle } from './alert';

// lib/utils.ts - Tailwind utility functions
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### @developer-hub/liquid-glass Integration

```typescript
// lib/liquid-glass/config.ts
import { LiquidGlassConfig, createLiquidGlassTheme } from '@developer-hub/liquid-glass';

export const liquidGlassConfig: LiquidGlassConfig = {
  // Global configuration for liquid glass effects
  performance: {
    gpuAcceleration: true,
    maxBlurRadius: 50,
    optimizeForMobile: true,
    fallbackStrategy: 'graceful-degradation'
  },
  
  accessibility: {
    respectReducedMotion: true,
    respectReducedTransparency: true,
    focusVisible: true
  },
  
  variants: {
    'glass-subtle': {
      backdropFilter: 'blur(8px) saturate(120%)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    'glass-medium': {
      backdropFilter: 'blur(15px) saturate(150%)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    'glass-intense': {
      backdropFilter: 'blur(25px) saturate(180%)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.3)'
    }
  }
};

// Seasonal theme integration
export const createSeasonalTheme = (season: Season, timeOfDay: TimeOfDay) => {
  return createLiquidGlassTheme({
    name: `${season}-${timeOfDay}`,
    baseVariant: 'glass-medium',
    customProperties: {
      '--glass-hue': getSeasonalHue(season),
      '--glass-particle-count': getParticleCount(season),
      '--glass-animation-speed': getAnimationSpeed(timeOfDay)
    }
  });
};
```

### Motion (Framer Motion 2025) Configuration

```typescript
// lib/motion/config.ts
import { MotionConfig } from 'motion/react';

export const motionGlobalConfig = {
  // Performance optimizations for Motion
  reducedMotion: 'user', // Respect user preferences
  strictMode: true,
  
  // GPU acceleration settings
  transformTemplate: ({ rotate, x, y, scale }) => 
    `translate3d(${x}, ${y}, 0) rotate(${rotate}) scale(${scale})`,
  
  // Default transitions
  transition: {
    type: 'spring',
    damping: 20,
    stiffness: 300,
    mass: 1
  }
};

// Optimized presets for liquid glass integration
export const liquidGlassMotionPresets = {
  glassAppear: {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { opacity: 1, backdropFilter: 'blur(15px)' },
    exit: { opacity: 0, backdropFilter: 'blur(0px)' },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  glassHover: {
    whileHover: { 
      scale: 1.02,
      backdropFilter: 'blur(20px) saturate(160%)',
      transition: { duration: 0.2 }
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  
  glassStagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
};
```

### glasscn-ui Integration

```typescript
// components/glasscn/GlassMorphComponents.tsx
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { LiquidGlass } from '@developer-hub/liquid-glass';

// Enhanced glasscn-ui components with @developer-hub/liquid-glass
export const GlassCard = ({ 
  children, 
  variant = 'default',
  className,
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
}) => {
  const variantStyles = {
    default: 'glass-medium',
    outlined: 'glass-subtle',
    filled: 'glass-intense'
  };

  return (
    <LiquidGlass 
      variant={variantStyles[variant]}
      className={cn('rounded-lg border backdrop-blur-md', className)}
      {...props}
    >
      {children}
    </LiquidGlass>
  );
};

export const GlassButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className,
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <LiquidGlass variant="glass-subtle">
      <motion.button
        className={cn(
          'rounded-lg font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          sizeStyles[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    </LiquidGlass>
  );
};
```

### Performance Integration Strategy

```typescript
// lib/performance/liquidGlassOptimization.ts
import { LiquidGlassConfig } from '@developer-hub/liquid-glass';

export const performanceOptimizedConfig: LiquidGlassConfig = {
  // Device-based optimization
  deviceOptimization: {
    lowEndDevice: {
      maxBlurRadius: 10,
      reducedEffects: true,
      fallbackToSolid: true
    },
    midRangeDevice: {
      maxBlurRadius: 20,
      moderateEffects: true,
      animationReduction: 0.5
    },
    highEndDevice: {
      maxBlurRadius: 50,
      fullEffects: true,
      enhancedAnimations: true
    }
  },
  
  // Core Web Vitals integration
  coreWebVitals: {
    respectLCP: true, // Lazy load heavy effects
    respectCLS: true, // Prevent layout shifts
    respectINP: true  // Optimize interaction response
  },
  
  // GPU monitoring
  gpuMonitoring: {
    trackUsage: true,
    maxUsageThreshold: 80, // Percentage
    fallbackOnOverload: true
  }
};

// Integration with existing performance monitoring
export const integrateWithExistingMetrics = (
  liquidGlassMetrics: LiquidGlassMetrics,
  existingMetrics: PerformanceMetrics
) => {
  return {
    ...existingMetrics,
    liquidGlass: {
      renderTime: liquidGlassMetrics.renderTime,
      gpuUsage: liquidGlassMetrics.gpuUsage,
      effectComplexity: liquidGlassMetrics.complexity,
      fallbacksTriggered: liquidGlassMetrics.fallbacks
    }
  };
};
```

## Data Models

### Content Management Models

```typescript
// types/content.ts
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // MDX content
  eyecatchImage: EyecatchImage;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  seoData: SEOData;
  liquidGlassEffects?: EffectData[];
  readingTime: number;
  viewCount: number;
}

interface EyecatchImage {
  id: string;
  url: string;
  webpUrl: string;
  avifUrl?: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string; // Base64 placeholder
  generatedBy: 'ai' | 'upload';
  aiPrompt?: string;
  optimizationMetrics: {
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  };
}

interface EffectData {
  id: string;
  name: string;
  description: string;
  code: string;
  parameters: EffectParameters;
  previewImage: string;
  category: EffectCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  performance: PerformanceMetrics;
  compatibility: BrowserCompatibility;
  createdBy: string;
  createdAt: Date;
  downloads: number;
  likes: number;
}
```

### Performance Monitoring Models

```typescript
// types/performance.ts
interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  inp: number; // Interaction to Next Paint  
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  effectRenderTime: number;
  gpuUsage: number;
  memoryUsage: number;
}

interface AnalyticsData {
  pageView: {
    path: string;
    timestamp: Date;
    userAgent: string;
    referrer?: string;
    duration: number;
  };
  
  effectInteraction: {
    effectId: string;
    action: 'view' | 'customize' | 'download' | 'share';
    parameters?: EffectParameters;
    timestamp: Date;
  };

  performanceEntry: {
    metrics: PerformanceMetrics;
    deviceInfo: DeviceInfo;
    timestamp: Date;
  };
}
```

### Seasonal Theme Models

```typescript
// types/theme.ts
interface SeasonalThemeConfig {
  id: string;
  season: Season;
  timeOfDay: TimeOfDay;
  weather?: Weather;
  
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
  
  glassMorphism: {
    backdropFilter: string;
    backgroundColor: string;
    borderColor: string;
    shadowColor: string;
  };
  
  particles: {
    type: ParticleType;
    count: number;
    size: [number, number];
    speed: number;
    opacity: number;
  };
  
  animations: {
    transition: string;
    easing: string;
    duration: number;
  };
}
```

## Error Handling

### Comprehensive Error Handling Strategy

```typescript
// lib/error/errorHandler.ts
export class LiquidGlassError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'LiquidGlassError';
  }
}

export const errorHandler = {
  // Effect compilation errors
  effectCompilation: (error: Error, code: string) => {
    const cleanError = sanitizeError(error);
    return {
      type: 'EFFECT_COMPILATION_ERROR',
      message: 'エフェクトのコンパイルでエラーが発生しました',
      suggestions: generateFixSuggestions(cleanError, code),
      errorDetails: cleanError
    };
  },

  // Performance degradation
  performance: (metrics: PerformanceMetrics) => {
    if (metrics.lcp > 2500) {
      return {
        type: 'PERFORMANCE_WARNING',
        message: 'ページの読み込み速度が低下しています',
        suggestions: [
          '画像の最適化を確認してください',
          'Liquid Glassエフェクトの軽量化を検討してください',
          'CDNキャッシュの設定を確認してください'
        ]
      };
    }
  },

  // Browser compatibility
  browserCompatibility: (feature: string, browser: string) => {
    const fallback = getBrowserFallback(feature, browser);
    return {
      type: 'COMPATIBILITY_INFO',
      message: `${feature}は${browser}でサポートされていません`,
      fallback: fallback,
      gracefulDegradation: true
    };
  }
};
```

### Error Recovery System

```typescript
// components/error/ErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

export class LiquidGlassErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Send error to monitoring service
    captureException(error, {
      context: 'LiquidGlassErrorBoundary',
      errorInfo,
      timestamp: new Date().toISOString()
    });

    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: this.state.retryCount + 1
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <LiquidGlassCard variant="medium" className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            エラーが発生しました
          </h2>
          <p className="text-gray-700 mb-6">
            Liquid Glassエフェクトの描画中に問題が発生しました。
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={this.handleRetry}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={this.state.retryCount >= 3}
            >
              再試行 ({this.state.retryCount}/3)
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              ページリロード
            </button>
          </div>
        </LiquidGlassCard>
      );
    }

    return this.props.children;
  }
}
```

## Security Considerations

### Authentication & Authorization

```typescript
// lib/auth/authConfig.ts
export const authConfig = {
  // Admin authentication for effect editor
  adminAuth: {
    provider: 'next-auth',
    providers: [
      {
        id: 'credentials',
        name: '管理者認証',
        credentials: {
          username: { label: 'ユーザー名', type: 'text' },
          password: { label: 'パスワード', type: 'password' }
        },
        async authorize(credentials) {
          const user = await authenticateAdmin(credentials);
          return user ? { id: user.id, role: 'admin' } : null;
        }
      }
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user?.role) {
          token.role = user.role;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.role = token.role;
        return session;
      }
    }
  }
};

// Route protection middleware
export const withAdminAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authConfig);
    
    if (!session || session.user.role !== 'admin') {
      return res.status(401).json({ 
        error: '管理者認証が必要です',
        redirect: '/admin/login'
      });
    }
    
    return handler(req, res);
  };
};
```

### Content Security Policy

```typescript
// next.config.js security configuration
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: https://res.cloudinary.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.openweathermap.org https://vitals.vercel-analytics.com",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
  }
];
```

### Data Protection

```typescript
// lib/security/dataProtection.ts
export const dataProtection = {
  // Sanitize user inputs for effect code
  sanitizeEffectCode: (code: string): string => {
    const allowedPatterns = [
      /^[a-zA-Z0-9\s\-_.(){}[\];:,'"\/\*\+\=\>\<\!\?]+$/,
      // CSS property patterns
      /backdrop-filter|background|border|transform|animation/,
      // Safe JavaScript patterns for effects
      /Math\.(sin|cos|tan|random|PI)|requestAnimationFrame/
    ];

    const dangerousPatterns = [
      /eval\s*\(/,
      /Function\s*\(/,
      /document\.write/,
      /innerHTML/,
      /outerHTML/,
      /insertAdjacentHTML/,
      /<script/i,
      /javascript:/,
      /on\w+\s*=/
    ];

    // Check for dangerous patterns
    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        throw new SecurityError('Potentially dangerous code detected');
      }
    }

    return code;
  },

  // Rate limiting for API endpoints
  rateLimit: {
    effectGeneration: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // limit each IP to 10 requests per windowMs
      message: 'エフェクト生成の回数制限を超えました'
    },
    
    imageGeneration: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 5, // limit to 5 AI image generations per hour
      message: 'AI画像生成の回数制限を超えました'
    }
  }
};
```

## Performance & Scalability

### Core Web Vitals Optimization Strategy

```typescript
// lib/performance/coreWebVitals.ts
export const performanceOptimizations = {
  // LCP (Largest Contentful Paint) < 2.5s
  lcp: {
    // Image optimization
    imageOptimization: {
      formats: ['avif', 'webp', 'jpeg'],
      sizes: [640, 768, 1024, 1280, 1920],
      quality: 80,
      placeholder: 'blur', // Base64 placeholder
      priority: true, // for above-fold images
      loading: 'lazy' // for below-fold images
    },

    // Font optimization
    fontOptimization: {
      preload: [
        '/fonts/inter-var.woff2',
        '/fonts/jetbrains-mono.woff2'
      ],
      fallback: {
        'Inter': 'system-ui, -apple-system, sans-serif',
        'JetBrains Mono': 'ui-monospace, "Cascadia Code", monospace'
      },
      display: 'swap'
    },

    // Critical CSS inlining
    criticalCSS: {
      inline: true,
      extract: ['above-fold', 'liquid-glass-base'],
      defer: ['animations', 'non-critical-effects']
    }
  },

  // INP (Interaction to Next Paint) < 200ms
  inp: {
    // Event handler optimization
    eventOptimization: {
      debounceDelay: 16, // ~60fps
      throttleDelay: 100,
      passiveListeners: ['scroll', 'touchstart', 'touchmove'],
      useCapture: false
    },

    // Main thread optimization
    mainThreadOptimization: {
      maxBlockingTime: 50, // ms
      yieldToMain: true,
      scheduler: 'scheduler.postTask' // or setTimeout fallback
    },

    // Effect rendering optimization
    effectOptimization: {
      useGPUAcceleration: true,
      batchUpdates: true,
      frameScheduling: 'requestAnimationFrame',
      compositorLayers: ['backdrop-filter', 'transform', 'opacity']
    }
  },

  // CLS (Cumulative Layout Shift) < 0.1
  cls: {
    // Layout stability
    layoutStability: {
      reserveSpace: true,
      dimensionAttributes: ['width', 'height'],
      aspectRatio: 'preserve',
      placeholders: {
        images: 'blur',
        content: 'skeleton',
        ads: 'reserved-space'
      }
    },

    // Dynamic content handling
    dynamicContent: {
      insertionStrategy: 'append-only',
      animateChanges: true,
      transitionDuration: 300, // ms
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};
```

### GPU Acceleration & Effect Performance

```typescript
// lib/performance/gpuAcceleration.ts
export const gpuOptimizations = {
  // Optimize backdrop-filter performance
  backdropFilter: {
    // Promote elements to composite layers
    promoteToLayer: {
      willChange: 'backdrop-filter',
      transform: 'translateZ(0)', // Force hardware acceleration
      isolation: 'isolate', // Create new stacking context
      containment: 'layout style paint' // CSS Containment API
    },

    // Efficient filter combinations
    filterOptimization: {
      combineFilters: true, // blur(15px) saturate(1.8) brightness(1.1)
      avoidRedundancy: true,
      cacheResults: true,
      maxBlurRadius: 20 // px, balance quality vs performance
    },

    // Performance monitoring
    performanceTracking: {
      trackRenderTime: true,
      trackGPUUsage: true,
      alertThreshold: 16.67, // 60fps threshold
      fallbackStrategy: 'reduce-effects'
    }
  },

  // Device-specific optimizations
  deviceOptimization: {
    lowEndDevice: {
      // Detected via navigator.hardwareConcurrency, deviceMemory
      reducedEffects: true,
      staticBackdropFilter: true,
      disableParticles: true,
      simplifiedAnimations: true
    },

    highEndDevice: {
      fullEffects: true,
      complexAnimations: true,
      particleEffects: true,
      realTimeEffects: true
    },

    mediaQueries: {
      // Respect user preferences
      reducedMotion: '@media (prefers-reduced-motion: reduce)',
      reducedTransparency: '@media (prefers-reduced-transparency: reduce)',
      highContrast: '@media (prefers-contrast: high)'
    }
  }
};
```

### Caching & CDN Strategy

```typescript
// lib/performance/cachingStrategy.ts
export const cachingStrategy = {
  // Static asset caching
  staticAssets: {
    images: {
      maxAge: '31536000', // 1 year
      immutable: true,
      provider: 'cloudinary',
      transformations: 'auto',
      format: 'auto',
      quality: 'auto'
    },
    
    fonts: {
      maxAge: '31536000', // 1 year
      immutable: true,
      preload: true,
      crossorigin: 'anonymous'
    },

    scripts: {
      maxAge: '31536000', // 1 year
      immutable: true,
      compression: 'gzip',
      minification: true
    }
  },

  // Dynamic content caching
  dynamicContent: {
    pages: {
      strategy: 'ISR', // Incremental Static Regeneration
      revalidate: 3600, // 1 hour
      fallback: 'blocking'
    },

    api: {
      strategy: 'stale-while-revalidate',
      maxAge: 300, // 5 minutes
      staleWhileRevalidate: 3600 // 1 hour
    },

    search: {
      strategy: 'cache-first',
      maxAge: 1800, // 30 minutes
      networkFirst: false
    }
  },

  // Edge caching with Vercel
  edgeConfig: {
    regions: ['all'], // Global distribution
    functions: {
      runtime: 'edge',
      regions: ['iad1', 'hnd1', 'fra1'], // Major regions
    },
    headers: {
      'cache-control': 'public, s-maxage=31536000, stale-while-revalidate',
      'cdn-cache-control': 'max-age=31536000'
    }
  }
};
```

## Testing Strategy

### Test Coverage Requirements

**Target Coverage:**
- **Line Coverage**: 95%+
- **Branch Coverage**: 90%+  
- **Function Coverage**: 95%+
- **Statement Coverage**: 95%+

### Testing Architecture

```typescript
// tests/setup/testConfig.ts
export const testConfig = {
  // Unit Testing (Vitest)
  unit: {
    framework: 'vitest',
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 95,
        branches: 90,
        functions: 95,
        statements: 95
      }
    },
    setupFiles: ['./tests/setup/vitest.setup.ts']
  },

  // Component Testing (React Testing Library)
  component: {
    framework: 'react-testing-library',
    utilities: ['@testing-library/jest-dom', '@testing-library/user-event'],
    customRenders: ['renderWithTheme', 'renderWithMDX'],
    mockProviders: ['SeasonalThemeProvider', 'AuthProvider']
  },

  // E2E Testing (Playwright)
  e2e: {
    framework: 'playwright',
    browsers: ['chromium', 'firefox', 'webkit'],
    devices: ['Desktop Chrome', 'iPhone 13', 'iPad Pro'],
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    testDir: './tests/e2e',
    timeout: 30000
  },

  // Visual Regression Testing
  visual: {
    framework: 'playwright',
    updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true',
    threshold: 0.2, // 20% difference threshold
    diffConfig: {
      threshold: 0.2,
      includeDiff: true
    }
  }
};
```

### Core Testing Scenarios

```typescript
// tests/components/LiquidGlassCard.test.tsx
describe('LiquidGlassCard', () => {
  it('applies correct backdrop-filter styles', () => {
    render(
      <LiquidGlassCard blur={20} opacity={0.2} saturation={1.5}>
        Test content
      </LiquidGlassCard>
    );

    const card = screen.getByText('Test content').parentElement;
    expect(card).toHaveStyle({
      backdropFilter: 'blur(20px) saturate(1.5)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    });
  });

  it('responds to seasonal theme changes', async () => {
    const mockDate = new Date('2024-03-21'); // Spring equinox
    vi.setSystemTime(mockDate);

    render(
      <SeasonalThemeProvider>
        <LiquidGlassCard seasonalTheme>
          Spring content
        </LiquidGlassCard>
      </SeasonalThemeProvider>
    );

    await waitFor(() => {
      const card = screen.getByText('Spring content').parentElement;
      expect(card).toHaveClass('spring-theme');
    });
  });

  it('falls back gracefully on unsupported browsers', () => {
    // Mock CSS.supports to return false for backdrop-filter
    vi.spyOn(CSS, 'supports').mockReturnValue(false);

    render(<LiquidGlassCard>Fallback content</LiquidGlassCard>);

    const card = screen.getByText('Fallback content').parentElement;
    expect(card).not.toHaveStyle({ backdropFilter: expect.any(String) });
    expect(card).toHaveClass('fallback-style');
  });
});

// tests/e2e/performance.spec.ts
test.describe('Performance Tests', () => {
  test('Core Web Vitals meet thresholds', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Measure Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const vitals = {};
          
          entries.forEach((entry) => {
            vitals[entry.name] = entry.value;
          });
          
          resolve(vitals);
        });
        
        observer.observe({ entryTypes: ['measure'] });
      });
    });

    expect(vitals.LCP).toBeLessThan(2500);
    expect(vitals.CLS).toBeLessThan(0.1);
  });

  test('Liquid Glass effects perform smoothly', async ({ page }) => {
    await page.goto('/showcase');
    
    // Measure effect rendering performance
    const renderTime = await page.evaluate(() => {
      const start = performance.now();
      
      // Trigger effect rendering
      const effects = document.querySelectorAll('[data-effect="liquid-glass"]');
      effects.forEach(effect => {
        effect.style.transform = 'scale(1.1)';
      });
      
      return performance.now() - start;
    });

    expect(renderTime).toBeLessThan(16.67); // 60fps threshold
  });
});
```

### Accessibility Testing

```typescript
// tests/accessibility/a11y.test.ts
describe('Accessibility Compliance', () => {
  it('meets WCAG 2.1 AA standards', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<EffectEditor />);

    // Tab through interactive elements
    await user.tab();
    expect(document.activeElement).toHaveAccessibleName('コードエディタ');
    
    await user.tab();
    expect(document.activeElement).toHaveAccessibleName('プレビュー');
    
    await user.tab();
    expect(document.activeElement).toHaveAccessibleName('保存ボタン');
  });

  it('provides proper ARIA labels for effects', () => {
    render(<LiquidGlassCard interactive>Interactive content</LiquidGlassCard>);
    
    const card = screen.getByRole('region');
    expect(card).toHaveAttribute('aria-label', 'インタラクティブLiquid Glassカード');
  });
});
```

このcomprehensiveな技術設計書は、承認された要件を基に、最新の技術トレンドと研究結果を反映し、パフォーマンス最適化、セキュリティ、アクセシビリティを重視した実装指針を提供します。全てのコンポーネントが相互に連携し、優れたユーザー体験と開発者体験を実現する設計となっています。