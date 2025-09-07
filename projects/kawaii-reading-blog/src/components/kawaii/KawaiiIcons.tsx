import React from 'react'
import { motion } from 'framer-motion'

interface KawaiiIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
  'data-testid'?: string
}

// Common kawaii color palette for consistency
const kawaiiColors = {
  pink: '#FF69B4',
  deepPink: '#FF1493',
  lightPink: '#FFB6C1',
  palePink: '#FFE4E1',
  white: '#FFFFFF',
  lavender: '#E6E6FA',
  purple: '#9370DB',
  orange: '#FFA500',
  tomato: '#FF6347',
  flame: '#FF4500',
  gold: '#FFD700'
} as const

const getSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm': return 'w-4 h-4'
    case 'md': return 'w-6 h-6'
    case 'lg': return 'w-8 h-8'
    case 'xl': return 'w-12 h-12'
    default: return 'w-6 h-6'
  }
}

// Helper function to create kawaii eyes (reduces duplication)
const createKawaiiEyes = (leftX: number, rightX: number, y: number, color: string = kawaiiColors.deepPink) => (
  <>
    <circle cx={leftX} cy={y} r="0.8" fill={color} />
    <circle cx={rightX} cy={y} r="0.8" fill={color} />
  </>
)

// Helper function to create kawaii smile (reduces duplication)
const createKawaiiSmile = (startX: number, endX: number, y: number, color: string = kawaiiColors.deepPink) => (
  <path
    d={`M${startX} ${y} Q${(startX + endX) / 2} ${y + 2} ${endX} ${y}`}
    stroke={color}
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
  />
)

// かわいい本のアイコン
export const BookIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true,
  'data-testid': dataTestId
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      rotate: [0, -2, 2, 0],
      scale: [1, 1.05, 1]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      data-testid={dataTestId}
      {...animationProps}
    >
      {/* 本の背表紙 */}
      <path
        d="M4 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
        fill="#FFB6C1"
        stroke="#FF69B4"
        strokeWidth="2"
      />
      {/* 本のページ */}
      <path
        d="M6 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6"
        fill="#FFF0F5"
        stroke="#FF69B4"
        strokeWidth="1"
      />
      {/* かわいい顔 */}
      <circle cx="10" cy="8" r="1" fill="#FF1493" />
      <circle cx="14" cy="8" r="1" fill="#FF1493" />
      <path
        d="M10 11 Q12 13 14 11"
        stroke="#FF1493"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* ハートマーク */}
      <path
        d="M12 16 C10 14, 8 15, 8 17 C8 19, 12 21, 12 21 C12 21, 16 19, 16 17 C16 15, 14 14, 12 16 Z"
        fill="#FF69B4"
      />
    </Component>
  )
}

// かわいい星のアイコン
export const StarIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      {...animationProps}
    >
      {/* 星の形 */}
      <path
        d="M12 2 L14.4 9.6 L22 9.6 L16.8 14.4 L19.2 22 L12 17.2 L4.8 22 L7.2 14.4 L2 9.6 L9.6 9.6 L12 2 Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="2"
      />
      {/* かわいい顔 */}
      <circle cx="10" cy="10" r="0.8" fill="#FF6347" />
      <circle cx="14" cy="10" r="0.8" fill="#FF6347" />
      <path
        d="M10 13 Q12 15 14 13"
        stroke="#FF6347"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいいハートのアイコン
export const HeartIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      scale: [1, 1.3, 1],
      rotate: [0, -5, 5, 0]
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      {...animationProps}
    >
      {/* ハートの形 */}
      <path
        d="M12 21.35 C10.35 19.8, 2 12.85, 2 8.5 C2 5.42, 4.42 3, 7.5 3 C9.24 3, 10.91 3.81, 12 5.09 C13.09 3.81, 14.76 3, 16.5 3 C19.58 3, 22 5.42, 22 8.5 C22 12.85, 13.65 19.8, 12 21.35 Z"
        fill="#FF69B4"
        stroke="#FF1493"
        strokeWidth="2"
      />
      {/* かわいい顔 */}
      <circle cx="9" cy="9" r="0.8" fill="#FFFFFF" />
      <circle cx="15" cy="9" r="0.8" fill="#FFFFFF" />
      <circle cx="8.7" cy="8.7" r="0.3" fill="#FF1493" />
      <circle cx="15.3" cy="8.7" r="0.3" fill="#FF1493" />
      <path
        d="M9 12 Q12 14.5 15 12"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいい検索アイコン
export const SearchIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      rotate: [0, 10, -10, 0]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      {...animationProps}
    >
      {/* 虫眼鏡の円 */}
      <circle
        cx="11"
        cy="11"
        r="8"
        fill="#E6E6FA"
        stroke="#9370DB"
        strokeWidth="3"
      />
      {/* 虫眼鏡の持ち手 */}
      <path
        d="M21 21 L16.5 16.5"
        stroke="#9370DB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* かわいい顔 */}
      <circle cx="9" cy="9" r="1" fill="#9370DB" />
      <circle cx="13" cy="9" r="1" fill="#9370DB" />
      <path
        d="M9 13 Q11 15 13 13"
        stroke="#9370DB"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいいライブラリ（本棚）アイコン
export const LibraryIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      scale: [1, 1.02, 1]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      {...animationProps}
    >
      {/* 本棚 */}
      <rect x="2" y="4" width="20" height="16" fill="#DEB887" stroke="#8B4513" strokeWidth="2" rx="2" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="#8B4513" strokeWidth="2" />
      
      {/* 本たち */}
      <rect x="4" y="6" width="2" height="5" fill="#FF6B6B" />
      <rect x="6" y="6" width="2" height="5" fill="#4ECDC4" />
      <rect x="8" y="6" width="2" height="5" fill="#45B7D1" />
      <rect x="10" y="6" width="2" height="5" fill="#96CEB4" />
      <rect x="12" y="6" width="2" height="5" fill="#FFEAA7" />
      <rect x="14" y="6" width="2" height="5" fill="#DDA0DD" />
      <rect x="16" y="6" width="2" height="5" fill="#98D8C8" />
      <rect x="18" y="6" width="2" height="5" fill="#FFC0CB" />
      
      <rect x="4" y="14" width="2" height="5" fill="#FF7675" />
      <rect x="6" y="14" width="2" height="5" fill="#74B9FF" />
      <rect x="8" y="14" width="2" height="5" fill="#00CEC9" />
      <rect x="10" y="14" width="2" height="5" fill="#A29BFE" />
      <rect x="12" y="14" width="2" height="5" fill="#FD79A8" />
      <rect x="14" y="14" width="2" height="5" fill="#FDCB6E" />
      <rect x="16" y="14" width="2" height="5" fill="#6C5CE7" />
      <rect x="18" y="14" width="2" height="5" fill="#55A3FF" />
      
      {/* かわいい顔 */}
      <circle cx="10" cy="2" r="0.5" fill="#8B4513" />
      <circle cx="14" cy="2" r="0.5" fill="#8B4513" />
      <path
        d="M10 3 Q12 3.5 14 3"
        stroke="#8B4513"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいいロケットアイコン
export const RocketIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      y: [0, -2, 0],
      rotate: [0, 2, -2, 0]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      {...animationProps}
    >
      {/* ロケット本体 */}
      <path
        d="M12 2 C14 2, 16 4, 16 8 L16 14 C16 16, 14 18, 12 18 C10 18, 8 16, 8 14 L8 8 C8 4, 10 2, 12 2 Z"
        fill="#FFB6C1"
        stroke="#FF69B4"
        strokeWidth="2"
      />
      {/* ロケットの窓 */}
      <circle cx="12" cy="8" r="2" fill="#87CEEB" stroke="#4682B4" strokeWidth="1" />
      {/* かわいい顔 */}
      <circle cx="11" cy="7.5" r="0.3" fill="#4682B4" />
      <circle cx="13" cy="7.5" r="0.3" fill="#4682B4" />
      <path
        d="M11 8.5 Q12 9 13 8.5"
        stroke="#4682B4"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* 火炎 */}
      <path
        d="M10 18 Q12 22 14 18"
        fill="#FF6347"
      />
      <path
        d="M10.5 18 Q12 21 13.5 18"
        fill="#FFA500"
      />
      <path
        d="M11 18 Q12 20 13 18"
        fill="#FFD700"
      />
      {/* 翼 */}
      <path
        d="M8 12 L6 16 L8 14 Z"
        fill="#DDA0DD"
        stroke="#9370DB"
        strokeWidth="1"
      />
      <path
        d="M16 12 L18 16 L16 14 Z"
        fill="#DDA0DD"
        stroke="#9370DB"
        strokeWidth="1"
      />
    </Component>
  )
}

// かわいい魔法アイコン
export const MagicIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      {...animationProps}
    >
      {/* 魔法の杖 */}
      <line
        x1="4"
        y1="20"
        x2="16"
        y2="8"
        stroke="#8B4513"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 魔法の星 */}
      <path
        d="M18 6 L19.5 9 L23 9 L20.5 11.5 L21.5 15 L18 13 L14.5 15 L15.5 11.5 L13 9 L16.5 9 L18 6 Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="1"
      />
      {/* キラキラ効果 */}
      <g fill="#FFD700">
        <circle cx="8" cy="16" r="0.5" />
        <circle cx="10" cy="14" r="0.3" />
        <circle cx="12" cy="12" r="0.4" />
        <circle cx="6" cy="18" r="0.3" />
      </g>
      {/* かわいい顔（星に） */}
      <circle cx="17" cy="8" r="0.3" fill="#FF6347" />
      <circle cx="19" cy="8" r="0.3" fill="#FF6347" />
      <path
        d="M17 9.5 Q18 10.5 19 9.5"
        stroke="#FF6347"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいいメールアイコン
export const MailIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 1, -1, 0]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      {...animationProps}
    >
      {/* 封筒 */}
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        fill="#FFE4E1"
        stroke="#FF69B4"
        strokeWidth="2"
        rx="2"
      />
      {/* 封筒のフラップ */}
      <path
        d="M2 6 L12 13 L22 6"
        stroke="#FF69B4"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* かわいい顔 */}
      <circle cx="9" cy="10" r="0.8" fill="#FF69B4" />
      <circle cx="15" cy="10" r="0.8" fill="#FF69B4" />
      <path
        d="M9 13 Q12 15 15 13"
        stroke="#FF69B4"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* ハート */}
      <path
        d="M12 16.5 C11.5 16, 10 16.2, 10 17.5 C10 18.5, 12 19.5, 12 19.5 C12 19.5, 14 18.5, 14 17.5 C14 16.2, 12.5 16, 12 16.5 Z"
        fill="#FF1493"
      />
    </Component>
  )
}

// かわいい時計のアイコン (⏰ replacement)
export const ClockIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true,
  'data-testid': dataTestId
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      rotate: [0, 2, -2, 0]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      data-testid={dataTestId}
      {...animationProps}
    >
      {/* 時計の文字盤 */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#FFE4E1"
        stroke="#FF69B4"
        strokeWidth="2"
      />
      {/* 時計の数字位置（12、3、6、9）*/}
      <circle cx="12" cy="3" r="0.5" fill="#FF1493" />
      <circle cx="21" cy="12" r="0.5" fill="#FF1493" />
      <circle cx="12" cy="21" r="0.5" fill="#FF1493" />
      <circle cx="3" cy="12" r="0.5" fill="#FF1493" />
      
      {/* 時計の針 */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="7"
        stroke="#FF1493"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="12"
        x2="16"
        y2="12"
        stroke="#FF1493"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* 中心の点 */}
      <circle cx="12" cy="12" r="1" fill="#FF1493" />
      
      {/* かわいい顔 */}
      <circle cx="9" cy="9" r="0.8" fill="#FF69B4" />
      <circle cx="15" cy="9" r="0.8" fill="#FF69B4" />
      <path
        d="M9 15 Q12 17 15 15"
        stroke="#FF69B4"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいい炎のアイコン (🔥 replacement) - For reading streak visualization
export const FireIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true,
  'data-testid': dataTestId
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      scale: [1, 1.1, 1],
      y: [0, -1, 0]
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      data-testid={dataTestId}
      {...animationProps}
    >
      {/* 炎の形 */}
      <path
        d="M12 2 C14 4, 16 6, 16 10 C16 14, 14 16, 12 18 C10 16, 8 14, 8 10 C8 6, 10 4, 12 2 Z"
        fill="#FF6347"
        stroke="#FF4500"
        strokeWidth="2"
      />
      {/* 内側の炎 */}
      <path
        d="M12 5 C13 6, 14 8, 14 11 C14 13, 13 14, 12 15 C11 14, 10 13, 10 11 C10 8, 11 6, 12 5 Z"
        fill="#FFA500"
      />
      {/* かわいい顔 */}
      <circle cx="10" cy="9" r="0.8" fill="#FFFFFF" />
      <circle cx="14" cy="9" r="0.8" fill="#FFFFFF" />
      <circle cx="10" cy="8.7" r="0.3" fill="#FF4500" />
      <circle cx="14" cy="8.7" r="0.3" fill="#FF4500" />
      <path
        d="M10 11 Q12 13 14 11"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいいページのアイコン (📄 replacement) - For page count display
export const PageIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true,
  'data-testid': dataTestId
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      rotate: [0, 1, -1, 0]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      data-testid={dataTestId}
      {...animationProps}
    >
      {/* ページの背景 */}
      <path
        d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
        fill="#FFF0F5"
        stroke="#FF69B4"
        strokeWidth="2"
      />
      {/* ページの折り目 */}
      <path
        d="M14 2v4h4"
        stroke="#FF69B4"
        strokeWidth="2"
        fill="none"
      />
      {/* テキスト行 */}
      <line x1="8" y1="10" x2="16" y2="10" stroke="#FFB6C1" strokeWidth="1" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="#FFB6C1" strokeWidth="1" />
      <line x1="8" y1="14" x2="12" y2="14" stroke="#FFB6C1" strokeWidth="1" />
      
      {/* かわいい顔 */}
      <circle cx="9" cy="7" r="0.6" fill="#FF69B4" />
      <circle cx="13" cy="7" r="0.6" fill="#FF69B4" />
      <path
        d="M9 8 Q11 9 13 8"
        stroke="#FF69B4"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいいカレンダーのアイコン (📅 replacement) - For weekly/monthly goal tracking
export const CalendarIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true,
  'data-testid': dataTestId
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      scale: [1, 1.02, 1]
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      data-testid={dataTestId}
      {...animationProps}
    >
      {/* カレンダーの背景 */}
      <rect
        x="3"
        y="6"
        width="18"
        height="14"
        fill="#E6E6FA"
        stroke="#9370DB"
        strokeWidth="2"
        rx="2"
      />
      {/* カレンダーのヘッダー */}
      <rect
        x="3"
        y="6"
        width="18"
        height="4"
        fill="#DDA0DD"
        rx="2"
      />
      {/* カレンダーのリング */}
      <rect x="7" y="2" width="2" height="6" fill="#9370DB" rx="1" />
      <rect x="15" y="2" width="2" height="6" fill="#9370DB" rx="1" />
      
      {/* カレンダーの日付 */}
      <circle cx="8" cy="14" r="1" fill="#9370DB" />
      <circle cx="12" cy="14" r="1" fill="#FF69B4" />
      <circle cx="16" cy="14" r="1" fill="#9370DB" />
      <circle cx="8" cy="17" r="1" fill="#9370DB" />
      <circle cx="12" cy="17" r="1" fill="#9370DB" />
      
      {/* かわいい顔 */}
      <circle cx="10" cy="8" r="0.5" fill="#FFFFFF" />
      <circle cx="14" cy="8" r="0.5" fill="#FFFFFF" />
      <path
        d="M10 9 Q12 9.5 14 9"
        stroke="#FFFFFF"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

// かわいいターゲットのアイコン (🎯 replacement) - For yearly goal targeting
export const TargetIcon: React.FC<KawaiiIconProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true,
  'data-testid': dataTestId
}) => {
  const Component = animate ? motion.svg : 'svg'
  const animationProps = animate ? {
    animate: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <Component
      className={`${getSize(size)} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      data-testid={dataTestId}
      {...animationProps}
    >
      {/* ターゲットの外側の輪 */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#FFE4E1"
        stroke="#FF1493"
        strokeWidth="2"
      />
      {/* ターゲットの中間の輪 */}
      <circle
        cx="12"
        cy="12"
        r="7"
        fill="#FFFFFF"
        stroke="#FF1493"
        strokeWidth="2"
      />
      {/* ターゲットの内側の輪 */}
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="#FF69B4"
        stroke="#FF1493"
        strokeWidth="2"
      />
      {/* 中心点 */}
      <circle
        cx="12"
        cy="12"
        r="1.5"
        fill="#FF1493"
      />
      
      {/* かわいい顔 */}
      <circle cx="9" cy="9" r="0.8" fill="#FFFFFF" />
      <circle cx="15" cy="9" r="0.8" fill="#FFFFFF" />
      <circle cx="9" cy="8.7" r="0.3" fill="#FF1493" />
      <circle cx="15" cy="8.7" r="0.3" fill="#FF1493" />
      <path
        d="M9 15 Q12 17 15 15"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </Component>
  )
}

export default {
  BookIcon,
  StarIcon,
  HeartIcon,
  SearchIcon,
  LibraryIcon,
  RocketIcon,
  MagicIcon,
  MailIcon,
  ClockIcon,
  FireIcon,
  PageIcon,
  CalendarIcon,
  TargetIcon
}