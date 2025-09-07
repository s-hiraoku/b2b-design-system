import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { kawaiiPresets, animationUtils } from '@/lib/kawaii-animations'
import { BookIcon, ClockIcon, FireIcon, PageIcon, CalendarIcon, TargetIcon, MagicIcon, StarIcon } from '@/components/kawaii/KawaiiIcons'

export interface ReadingStats {
  booksRead: number
  pagesRead: number
  minutesRead: number
  currentStreak: number
  weeklyGoal: number
  monthlyGoal: number
  yearlyGoal: number
}

export interface ReadingProgressProps {
  stats: ReadingStats
  className?: string
  showDetails?: boolean
  animated?: boolean
  'data-testid'?: string
}

/**
 * ReadingProgress - Kawaii animated reading progress display
 * Shows reading statistics with cute animations and progress bars
 */
export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  stats,
  className = '',
  showDetails = true,
  animated = true,
  'data-testid': testId = 'reading-progress'
}) => {
  const [countersAnimated, setCountersAnimated] = useState(false)
  
  // Calculate progress percentages
  const weeklyProgress = Math.min(100, (stats.booksRead % 7) / (stats.weeklyGoal / 7) * 100)
  const monthlyProgress = Math.min(100, (stats.booksRead % 30) / (stats.monthlyGoal / 30) * 100)
  const yearlyProgress = Math.min(100, stats.booksRead / stats.yearlyGoal * 100)

  // Animation variants
  const containerVariants = animated && !animationUtils.respectsReducedMotion() ? {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } : {}

  const itemVariants = animated && !animationUtils.respectsReducedMotion() ? {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  } : {}

  const progressBarVariants = animated && !animationUtils.respectsReducedMotion() ? {
    initial: { scaleX: 0, originX: 0 },
    animate: { 
      scaleX: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: 0.5
      }
    }
  } : {}

  // Counter animation hook
  const useCounterAnimation = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      if (!animated || countersAnimated) {
        setCount(end)
        return
      }

      let startTime: number
      const startCount = 0
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(startCount + (end - startCount) * easeOut)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCountersAnimated(true)
        }
      }
      
      requestAnimationFrame(animate)
    }, [end, duration, animated, countersAnimated])
    
    return count
  }

  const animatedBooksRead = useCounterAnimation(stats.booksRead)
  const animatedPagesRead = useCounterAnimation(stats.pagesRead)
  const animatedMinutesRead = useCounterAnimation(stats.minutesRead)

  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      data-testid={testId}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <BookIcon size="md" animate={true} className="text-pink-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            Reading Progress
          </h2>
          <BookIcon size="md" animate={true} className="text-pink-500" />
        </div>
        <p className="text-gray-600">Keep up the amazing work!</p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Books Read */}
        <motion.div
          variants={itemVariants}
          className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl"
        >
          <div className="flex justify-center mb-1">
            <BookIcon size="lg" animate={true} className="text-pink-500" />
          </div>
          <motion.div 
            className="text-2xl font-bold text-pink-600"
            key={animatedBooksRead} // Re-render when count changes
          >
            {animatedBooksRead}
          </motion.div>
          <div className="text-sm text-gray-600">Books Read</div>
        </motion.div>

        {/* Pages Read */}
        <motion.div
          variants={itemVariants}
          className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
        >
          <div className="flex justify-center mb-1">
            <PageIcon size="lg" animate={true} className="text-blue-500" />
          </div>
          <motion.div 
            className="text-2xl font-bold text-blue-600"
            key={animatedPagesRead}
          >
            {animatedPagesRead.toLocaleString()}
          </motion.div>
          <div className="text-sm text-gray-600">Pages Read</div>
        </motion.div>

        {/* Minutes Read */}
        <motion.div
          variants={itemVariants}
          className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
        >
          <div className="flex justify-center mb-1">
            <ClockIcon size="lg" animate={true} className="text-purple-500" />
          </div>
          <motion.div 
            className="text-2xl font-bold text-purple-600"
            key={animatedMinutesRead}
          >
            {Math.floor(animatedMinutesRead / 60)}h
          </motion.div>
          <div className="text-sm text-gray-600">Hours Read</div>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          variants={itemVariants}
          className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
        >
          <div className="flex justify-center mb-1">
            <FireIcon size="lg" animate={true} className="text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.currentStreak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </motion.div>
      </div>

      {/* Progress Bars */}
      {showDetails && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Weekly Goal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CalendarIcon size="sm" animate={true} className="text-pink-500" />
                <span className="text-sm font-medium text-gray-700">
                  Weekly Goal
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round(weeklyProgress)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"
                variants={progressBarVariants}
                style={{ width: `${weeklyProgress}%` }}
              />
            </div>
          </div>

          {/* Monthly Goal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CalendarIcon size="sm" animate={true} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  Monthly Goal
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round(monthlyProgress)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                variants={progressBarVariants}
                style={{ width: `${monthlyProgress}%` }}
              />
            </div>
          </div>

          {/* Yearly Goal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TargetIcon size="sm" animate={true} className="text-purple-500" />
                <span className="text-sm font-medium text-gray-700">
                  Yearly Goal
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round(yearlyProgress)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
                variants={progressBarVariants}
                style={{ width: `${yearlyProgress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Motivational Message */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
      >
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <MagicIcon size="md" animate={true} className="text-yellow-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 flex items-center justify-center space-x-2">
            {yearlyProgress >= 100 ? (
              <>
                <StarIcon size="sm" animate={true} className="text-yellow-400" />
                <span>Congratulations! You've reached your yearly goal!</span>
                <StarIcon size="sm" animate={true} className="text-yellow-400" />
              </>
            ) : stats.currentStreak >= 7 ? (
              <>
                <FireIcon size="sm" animate={true} className="text-orange-500" />
                <span>Amazing streak! You're on fire!</span>
                <FireIcon size="sm" animate={true} className="text-orange-500" />
              </>
            ) : stats.booksRead > 0 ? (
              <>
                <BookIcon size="sm" animate={true} className="text-pink-500" />
                <span>Great progress! Keep reading!</span>
                <BookIcon size="sm" animate={true} className="text-pink-500" />
              </>
            ) : (
              <>
                <StarIcon size="sm" animate={true} className="text-yellow-400" />
                <span>Start your reading journey today!</span>
                <StarIcon size="sm" animate={true} className="text-yellow-400" />
              </>
            )}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ReadingProgress