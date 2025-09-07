import React from 'react'
import { motion } from 'framer-motion'

interface KawaiiBookCoverProps {
  genre: 'fantasy' | 'cookbook' | 'sci-fi' | 'self-help'
  title?: string
  className?: string
  width?: number
  height?: number
}

// かわいい本のカバーイラストコンポーネント
export const KawaiiBookCover: React.FC<KawaiiBookCoverProps> = ({
  genre,
  title,
  className = '',
  width = 300,
  height = 450
}) => {
  const aspectRatio = width / height

  const getCoverContent = () => {
    switch (genre) {
      case 'fantasy':
        return (
          <>
            {/* ファンタジー本: 魔法の庭園 */}
            {/* 背景グラデーション */}
            <defs>
              <linearGradient id="fantasyBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE4E1" />
                <stop offset="100%" stopColor="#DDA0DD" />
              </linearGradient>
              <radialGradient id="magicGlow">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* 背景 */}
            <rect width={width} height={height} fill="url(#fantasyBg)" />
            
            {/* 魔法の城 */}
            <g transform={`translate(${width * 0.5}, ${height * 0.3})`}>
              {/* 城の本体 */}
              <rect x="-40" y="0" width="80" height="60" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2" rx="5" />
              {/* 塔 */}
              <rect x="-50" y="-20" width="20" height="80" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2" />
              <rect x="30" y="-20" width="20" height="80" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2" />
              {/* 屋根 */}
              <path d="M -50 -20 L -40 -35 L -30 -20 Z" fill="#FF69B4" />
              <path d="M 30 -20 L 40 -35 L 50 -20 Z" fill="#FF69B4" />
              {/* 中央の屋根 */}
              <path d="M -40 0 L 0 -30 L 40 0 Z" fill="#FF1493" />
              
              {/* かわいい窓（目） */}
              <circle cx="-15" cy="20" r="6" fill="#87CEEB" stroke="#4682B4" strokeWidth="2" />
              <circle cx="15" cy="20" r="6" fill="#87CEEB" stroke="#4682B4" strokeWidth="2" />
              <circle cx="-15" cy="20" r="3" fill="#4682B4" />
              <circle cx="15" cy="20" r="3" fill="#4682B4" />
              
              {/* 笑顔 */}
              <path d="M -10 35 Q 0 45 10 35" stroke="#FF69B4" strokeWidth="3" fill="none" strokeLinecap="round" />
              
              {/* ドア */}
              <rect x="-8" y="35" width="16" height="25" fill="#DEB887" stroke="#8B4513" strokeWidth="2" rx="8" />
            </g>
            
            {/* 雲 */}
            <motion.g
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ellipse cx={width * 0.2} cy={height * 0.15} rx="25" ry="15" fill="white" opacity="0.8" />
              <ellipse cx={width * 0.25} cy={height * 0.15} rx="20" ry="12" fill="white" opacity="0.8" />
              <ellipse cx={width * 0.15} cy={height * 0.15} rx="20" ry="12" fill="white" opacity="0.8" />
            </motion.g>
            
            {/* 星 */}
            <motion.g
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path d="M 50 50 L 52 56 L 58 56 L 53 60 L 55 66 L 50 62 L 45 66 L 47 60 L 42 56 L 48 56 Z" fill="#FFD700" />
              <path d="M 250 80 L 252 86 L 258 86 L 253 90 L 255 96 L 250 92 L 245 96 L 247 90 L 242 86 L 248 86 Z" fill="#FFD700" />
            </motion.g>
            
            {/* 花 */}
            <g transform={`translate(${width * 0.3}, ${height * 0.7})`}>
              <circle cx="0" cy="0" r="8" fill="#FFB6C1" />
              <circle cx="-10" cy="-5" r="8" fill="#FFB6C1" />
              <circle cx="10" cy="-5" r="8" fill="#FFB6C1" />
              <circle cx="-10" cy="5" r="8" fill="#FFB6C1" />
              <circle cx="10" cy="5" r="8" fill="#FFB6C1" />
              <circle cx="0" cy="0" r="5" fill="#FFD700" />
            </g>
            
            <g transform={`translate(${width * 0.7}, ${height * 0.75})`}>
              <circle cx="0" cy="0" r="6" fill="#DDA0DD" />
              <circle cx="-8" cy="-4" r="6" fill="#DDA0DD" />
              <circle cx="8" cy="-4" r="6" fill="#DDA0DD" />
              <circle cx="-8" cy="4" r="6" fill="#DDA0DD" />
              <circle cx="8" cy="4" r="6" fill="#DDA0DD" />
              <circle cx="0" cy="0" r="4" fill="#FFD700" />
            </g>
          </>
        )
      
      case 'cookbook':
        return (
          <>
            {/* 料理本: かわいいキッチン */}
            <defs>
              <linearGradient id="cookbookBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFACD" />
                <stop offset="100%" stopColor="#FFE4B5" />
              </linearGradient>
            </defs>
            
            {/* 背景 */}
            <rect width={width} height={height} fill="url(#cookbookBg)" />
            
            {/* お鍋 */}
            <g transform={`translate(${width * 0.5}, ${height * 0.4})`}>
              <ellipse cx="0" cy="0" rx="60" ry="40" fill="#FF6347" stroke="#8B0000" strokeWidth="3" />
              <ellipse cx="0" cy="-5" rx="60" ry="10" fill="#8B0000" />
              
              {/* 取っ手 */}
              <rect x="-75" y="-10" width="15" height="8" fill="#8B4513" rx="4" />
              <rect x="60" y="-10" width="15" height="8" fill="#8B4513" rx="4" />
              
              {/* かわいい顔 */}
              <circle cx="-20" cy="0" r="5" fill="white" />
              <circle cx="20" cy="0" r="5" fill="white" />
              <circle cx="-20" cy="0" r="3" fill="#333" />
              <circle cx="20" cy="0" r="3" fill="#333" />
              <path d="M -15 15 Q 0 25 15 15" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              
              {/* ほっぺ */}
              <circle cx="-30" cy="10" r="5" fill="#FFB6C1" opacity="0.6" />
              <circle cx="30" cy="10" r="5" fill="#FFB6C1" opacity="0.6" />
            </g>
            
            {/* 野菜たち */}
            <motion.g
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* にんじん */}
              <g transform={`translate(${width * 0.25}, ${height * 0.6})`}>
                <path d="M 0 0 L -5 30 L 5 30 Z" fill="#FFA500" stroke="#FF8C00" strokeWidth="2" />
                <ellipse cx="0" cy="0" rx="8" ry="5" fill="#90EE90" />
                {/* 目 */}
                <circle cx="-2" cy="10" r="1.5" fill="#333" />
                <circle cx="2" cy="10" r="1.5" fill="#333" />
                {/* 笑顔 */}
                <path d="M -2 15 Q 0 17 2 15" stroke="#333" strokeWidth="1" fill="none" />
              </g>
              
              {/* トマト */}
              <g transform={`translate(${width * 0.75}, ${height * 0.6})`}>
                <circle cx="0" cy="0" r="20" fill="#FF6347" stroke="#8B0000" strokeWidth="2" />
                <ellipse cx="0" cy="-18" rx="8" ry="4" fill="#90EE90" />
                {/* 目 */}
                <circle cx="-6" cy="0" r="2" fill="#333" />
                <circle cx="6" cy="0" r="2" fill="#333" />
                {/* 笑顔 */}
                <path d="M -6 8 Q 0 12 6 8" stroke="#333" strokeWidth="1.5" fill="none" />
                {/* キラキラ */}
                <circle cx="-10" cy="-5" r="2" fill="white" opacity="0.8" />
              </g>
            </motion.g>
            
            {/* スプーンとフォーク */}
            <g transform={`translate(${width * 0.5}, ${height * 0.8})`}>
              {/* スプーン */}
              <ellipse cx="-25" cy="-10" rx="10" ry="15" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
              <rect x="-27" y="-10" width="4" height="30" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
              
              {/* フォーク */}
              <rect x="23" y="-25" width="4" height="45" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
              <rect x="19" y="-25" width="3" height="15" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
              <rect x="28" y="-25" width="3" height="15" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
            </g>
            
            {/* ハート */}
            <motion.g
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path d={`M ${width * 0.15} ${height * 0.25} C ${width * 0.1} ${height * 0.2}, ${width * 0.05} ${height * 0.25}, ${width * 0.05} ${height * 0.3} C ${width * 0.05} ${height * 0.35}, ${width * 0.15} ${height * 0.4}, ${width * 0.15} ${height * 0.4} C ${width * 0.15} ${height * 0.4}, ${width * 0.25} ${height * 0.35}, ${width * 0.25} ${height * 0.3} C ${width * 0.25} ${height * 0.25}, ${width * 0.2} ${height * 0.2}, ${width * 0.15} ${height * 0.25} Z`} fill="#FF69B4" />
            </motion.g>
          </>
        )
      
      case 'sci-fi':
        return (
          <>
            {/* SF本: デジタルドリーム */}
            <defs>
              <linearGradient id="scifiBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000033" />
                <stop offset="50%" stopColor="#000066" />
                <stop offset="100%" stopColor="#000099" />
              </linearGradient>
              <radialGradient id="neonGlow">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* 背景 */}
            <rect width={width} height={height} fill="url(#scifiBg)" />
            
            {/* 星空 */}
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * width}
                cy={Math.random() * height * 0.5}
                r={Math.random() * 2}
                fill="white"
                opacity={Math.random() * 0.8 + 0.2}
              />
            ))}
            
            {/* かわいいロボット */}
            <g transform={`translate(${width * 0.5}, ${height * 0.5})`}>
              {/* ボディ */}
              <rect x="-40" y="-20" width="80" height="60" fill="#C0C0C0" stroke="#808080" strokeWidth="2" rx="10" />
              
              {/* 頭 */}
              <rect x="-30" y="-50" width="60" height="40" fill="#E0E0E0" stroke="#808080" strokeWidth="2" rx="15" />
              
              {/* アンテナ */}
              <line x1="0" y1="-50" x2="0" y2="-65" stroke="#808080" strokeWidth="3" />
              <circle cx="0" cy="-68" r="5" fill="#00FFFF" />
              <motion.circle
                cx="0"
                cy="-68"
                r="8"
                fill="url(#neonGlow)"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* 目（デジタルディスプレイ風） */}
              <rect x="-20" y="-40" width="15" height="10" fill="#000" rx="2" />
              <rect x="5" y="-40" width="15" height="10" fill="#000" rx="2" />
              <motion.rect
                x="-18"
                y="-38"
                width="11"
                height="6"
                fill="#00FF00"
                animate={{
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.rect
                x="7"
                y="-38"
                width="11"
                height="6"
                fill="#00FF00"
                animate={{
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              {/* 口（デジタル表示） */}
              <rect x="-15" y="-25" width="30" height="5" fill="#000" rx="2" />
              <motion.g
                animate={{
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <rect x="-13" y="-24" width="3" height="3" fill="#00FFFF" />
                <rect x="-8" y="-24" width="3" height="3" fill="#00FFFF" />
                <rect x="-3" y="-24" width="3" height="3" fill="#00FFFF" />
                <rect x="2" y="-24" width="3" height="3" fill="#00FFFF" />
                <rect x="7" y="-24" width="3" height="3" fill="#00FFFF" />
                <rect x="10" y="-24" width="3" height="3" fill="#00FFFF" />
              </motion.g>
              
              {/* コントロールパネル */}
              <rect x="-25" y="-5" width="50" height="30" fill="#333" stroke="#666" strokeWidth="1" rx="5" />
              <circle cx="-15" cy="5" r="3" fill="#FF0000" />
              <circle cx="-5" cy="5" r="3" fill="#00FF00" />
              <circle cx="5" cy="5" r="3" fill="#0000FF" />
              <circle cx="15" cy="5" r="3" fill="#FFFF00" />
              
              {/* 腕 */}
              <rect x="-50" y="-10" width="10" height="30" fill="#C0C0C0" stroke="#808080" strokeWidth="2" rx="5" />
              <rect x="40" y="-10" width="10" height="30" fill="#C0C0C0" stroke="#808080" strokeWidth="2" rx="5" />
              
              {/* ハート（ロボットの感情） */}
              <motion.path
                d="M -10 15 C -12 13, -16 13, -16 16 C -16 19, -10 23, -10 23 C -10 23, -4 19, -4 16 C -4 13, -8 13, -10 15 Z"
                fill="#FF69B4"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
            
            {/* データストリーム */}
            <motion.g
              animate={{
                y: [height, -50]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <text x={width * 0.1} y="0" fill="#00FF00" fontSize="10" fontFamily="monospace" opacity="0.5">
                01101000
              </text>
              <text x={width * 0.8} y="30" fill="#00FF00" fontSize="10" fontFamily="monospace" opacity="0.5">
                10110101
              </text>
              <text x={width * 0.2} y="60" fill="#00FF00" fontSize="10" fontFamily="monospace" opacity="0.5">
                11010010
              </text>
            </motion.g>
          </>
        )
      
      case 'self-help':
        return (
          <>
            {/* 自己啓発本: マインドフルリーディング */}
            <defs>
              <linearGradient id="selfhelpBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E6E6FA" />
                <stop offset="100%" stopColor="#DDA0DD" />
              </linearGradient>
              <radialGradient id="zenGlow">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* 背景 */}
            <rect width={width} height={height} fill="url(#selfhelpBg)" />
            
            {/* 太陽/月 */}
            <motion.g
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <circle cx={width * 0.5} cy={height * 0.25} r="40" fill="#FFD700" opacity="0.8" />
              <circle cx={width * 0.5} cy={height * 0.25} r="45" fill="url(#zenGlow)" />
            </motion.g>
            
            {/* 瞑想する本 */}
            <g transform={`translate(${width * 0.5}, ${height * 0.55})`}>
              {/* 本の体 */}
              <rect x="-45" y="-30" width="90" height="70" fill="#98FB98" stroke="#228B22" strokeWidth="2" rx="10" />
              
              {/* ページ */}
              <rect x="-40" y="-25" width="80" height="60" fill="#FFFACD" stroke="#F0E68C" strokeWidth="1" rx="5" />
              
              {/* 瞑想している目（閉じている） */}
              <path d="M -20 -5 Q -15 -8 -10 -5" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 10 -5 Q 15 -8 20 -5" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              
              {/* 穏やかな笑顔 */}
              <path d="M -15 10 Q 0 15 15 10" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              
              {/* ほっぺ */}
              <circle cx="-25" cy="5" r="5" fill="#FFB6C1" opacity="0.5" />
              <circle cx="25" cy="5" r="5" fill="#FFB6C1" opacity="0.5" />
              
              {/* オーラ */}
              <motion.ellipse
                cx="0"
                cy="0"
                rx="60"
                ry="50"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
                opacity="0.3"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
            
            {/* 蓮の花 */}
            <g transform={`translate(${width * 0.5}, ${height * 0.85})`}>
              {/* 花びら */}
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(0)" />
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(45)" />
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(90)" />
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(135)" />
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(180)" />
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(225)" />
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(270)" />
              <ellipse cx="0" cy="0" rx="15" ry="25" fill="#FFB6C1" opacity="0.8" transform="rotate(315)" />
              
              {/* 中心 */}
              <circle cx="0" cy="0" r="8" fill="#FFD700" />
            </g>
            
            {/* 光の粒子 */}
            <motion.g
              animate={{
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                staggerChildren: 0.2
              }}
            >
              <circle cx={width * 0.2} cy={height * 0.4} r="2" fill="#FFD700" />
              <circle cx={width * 0.8} cy={height * 0.35} r="2" fill="#FFD700" />
              <circle cx={width * 0.15} cy={height * 0.6} r="2" fill="#FFD700" />
              <circle cx={width * 0.85} cy={height * 0.65} r="2" fill="#FFD700" />
            </motion.g>
            
            {/* インスピレーショナルな星 */}
            <motion.g
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path d={`M ${width * 0.15} ${height * 0.15} L ${width * 0.17} ${height * 0.18} L ${width * 0.2} ${height * 0.18} L ${width * 0.175} ${height * 0.2} L ${width * 0.18} ${height * 0.23} L ${width * 0.15} ${height * 0.21} L ${width * 0.12} ${height * 0.23} L ${width * 0.125} ${height * 0.2} L ${width * 0.1} ${height * 0.18} L ${width * 0.13} ${height * 0.18} Z`} fill="#FFD700" opacity="0.7" />
            </motion.g>
          </>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`kawaii-book-cover ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        {getCoverContent()}
        
        {/* タイトル表示エリア（オプション） */}
        {title && (
          <text
            x={width / 2}
            y={height * 0.9}
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            {title}
          </text>
        )}
      </svg>
    </motion.div>
  )
}

// ジャンルに応じたプレースホルダーイラストURL生成
export const getKawaiiBookCoverUrl = (genre: string): string => {
  // この関数は実際のSVGコンポーネントを使用するためのダミー
  // 実際の実装では、KawaiiBookCoverコンポーネントを直接使用する
  return `kawaii-cover-${genre}`
}

export default KawaiiBookCover