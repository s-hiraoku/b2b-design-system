'use client';

import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Palette, Zap, Globe, Code2, Layers, Rocket, Users } from 'lucide-react';

export default function Home() {

  const features = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Liquid Glassエフェクト",
      description: "GPU加速による高性能なグラスモーフィズムデザインシステム",
      badge: "60fps"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "AIアイキャッチ生成",
      description: "記事内容に応じて自動生成される魅力的なアイキャッチ画像",
      badge: "AI搭載"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "MDXコンテンツ",
      description: "インタラクティブなコンポーネントを含む高度な記事管理システム",
      badge: "最新技術"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "モダン技術スタック",
      description: "Next.js 15 + React 19 + TypeScript による最新の開発体験",
      badge: "最新"
    }
  ];

  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white`}>

      {/* ヒーローセクション */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* ロゴ/タイトル */}
          <div className="mb-8">
            <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-300/30">
              Next.js 15 + React 19
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Liquid Glass
              <span className="block text-4xl md:text-5xl mt-2 text-white/90">
                Tech Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              最先端のグラスモーフィズムデザインで彩られた、
              次世代の技術ブログプラットフォーム
            </p>
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              ブログを始める
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              機能を見る
            </Button>
          </div>

          <Separator className="my-16 bg-white/20" />

          {/* 機能タブ */}
          <Tabs defaultValue="features" className="w-full max-w-4xl mx-auto" id="features">
            <TabsList className="glass-medium mb-8 bg-white/10 border border-white/20">
              <TabsTrigger value="features" className="data-[state=active]:bg-white/20 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                主要機能
              </TabsTrigger>
              <TabsTrigger value="tech" className="data-[state=active]:bg-white/20 text-white">
                <Code2 className="w-4 h-4 mr-2" />
                技術スタック
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-white/20 text-white">
                <Users className="w-4 h-4 mr-2" />
                開発チーム
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <GlassCard key={index} variant="medium" interactive>
                    <GlassCardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/10">
                            {feature.icon}
                          </div>
                          <GlassCardTitle className="text-lg">
                            {feature.title}
                          </GlassCardTitle>
                        </div>
                        <Badge className="bg-white/10 text-white/80 border-white/20">
                          {feature.badge}
                        </Badge>
                      </div>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <GlassCardDescription className="text-white/70">
                        {feature.description}
                      </GlassCardDescription>
                    </GlassCardContent>
                  </GlassCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tech" className="mt-8">
              <GlassCard variant="subtle" className="p-8">
                <GlassCardHeader className="text-center mb-6">
                  <GlassCardTitle className="text-2xl mb-2">最新技術スタック</GlassCardTitle>
                  <GlassCardDescription className="text-white/70">
                    モダンな開発体験と最高のパフォーマンスを実現
                  </GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <Layers className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                      <h4 className="font-semibold mb-2">フロントエンド</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['Next.js 15', 'React 19', 'TypeScript 5.x'].map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <Palette className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                      <h4 className="font-semibold mb-2">デザイン</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['Tailwind CSS', 'shadcn/ui', 'Liquid Glass'].map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <Rocket className="w-8 h-8 mx-auto mb-3 text-green-400" />
                      <h4 className="font-semibold mb-2">プラットフォーム</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['Vercel', 'MDX', 'AI Integration'].map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-green-500/20 text-green-200 border-green-400/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="team" className="mt-8">
              <GlassCard variant="subtle" className="p-8">
                <GlassCardHeader className="text-center mb-6">
                  <GlassCardTitle className="text-2xl mb-2">開発チーム</GlassCardTitle>
                  <GlassCardDescription className="text-white/70">
                    最先端技術で未来のブログ体験を創造
                  </GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          LG
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">Liquid Glass Team</h4>
                        <p className="text-sm text-white/70">フロントエンド・デザイン</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs border-white/30 text-white/80">React</Badge>
                          <Badge variant="outline" className="text-xs border-white/30 text-white/80">TypeScript</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">AI Integration</h4>
                        <p className="text-sm text-white/70">バックエンド・AI</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs border-white/30 text-white/80">Next.js</Badge>
                          <Badge variant="outline" className="text-xs border-white/30 text-white/80">OpenAI</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-white/20" />
                  
                  <div className="text-center">
                    <h4 className="font-semibold mb-4">プロジェクトに参加しませんか？</h4>
                    <div className="flex gap-4 justify-center max-w-md mx-auto">
                      <Input 
                        placeholder="メールアドレス" 
                        className="bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20"
                      />
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none hover:scale-105 transition-all duration-300"
                      >
                        参加する
                      </Button>
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </TabsContent>
          </Tabs>

        </div>
      </section>
    </div>
  );
}