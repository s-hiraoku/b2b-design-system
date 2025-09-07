import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { kawaiiPresets, animationUtils } from '@/lib/kawaii-animations'
import { useParticles } from '@/hooks/useParticles'
import ParticleRenderer from '@/components/kawaii/ParticleRenderer'
import KawaiiButtonAdvanced from '@/components/kawaii/KawaiiButtonAdvanced'
import { BookIcon, PageIcon, StarIcon, HeartIcon } from '@/components/kawaii/KawaiiIcons'
import { KawaiiBookCover } from '@/components/kawaii/KawaiiBookCovers'

export interface Book {
  id: string
  title: string
  author: string
  coverUrl: string
  description?: string
  pages?: number
  rating?: number
  genre?: string
  publishedYear?: number
  isbn?: string
}

export interface BookCardProps {
  book: Book
  onRead?: (book: Book) => void
  onLike?: (book: Book) => void
  onAddToList?: (book: Book) => void
  isLiked?: boolean
  readingProgress?: number // 0-100
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
  showActions?: boolean
  'data-testid'?: string
}

/**
 * BookCard - Kawaii animated book card for the reading blog
 * Features 3D hover effects, reading progress, and particle interactions
 */
export const BookCard: React.FC<BookCardProps> = ({
  book,
  onRead,
  onLike,
  onAddToList,
  isLiked = false,
  readingProgress = 0,
  className = '',
  size = 'md',
  showProgress = true,
  showActions = true,
  'data-testid': testId = 'book-card'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const {
    particles,
    createHeartBurst,
    createSparkleEffect
  } = useParticles()

  // Size-based styling
  const sizeClasses = {
    sm: 'w-40 h-60',
    md: 'w-48 h-72',
    lg: 'w-56 h-84'
  }

  const imageSizes = {
    sm: 'h-32',
    md: 'h-40',
    lg: 'h-48'
  }

  // Handle like action with particle effect
  const handleLike = useCallback(() => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.right - 40 // Position near like button
    const centerY = rect.top + 40

    createHeartBurst(centerX, centerY)
    onLike?.(book)
  }, [book, onLike, createHeartBurst])

  // Handle add to list with sparkle effect
  const handleAddToList = useCallback(() => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height - 40

    createSparkleEffect(centerX, centerY)
    onAddToList?.(book)
  }, [book, onAddToList, createSparkleEffect])

  // Animation variants
  const cardVariants = animationUtils.respectsReducedMotion()
    ? { rest: {}, hover: {} }
    : kawaiiPresets.bookHover

  const imageVariants = {
    loading: { opacity: 0, scale: 0.8 },
    loaded: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    error: { opacity: 0.3, scale: 0.9 }
  }

  const progressVariants = {
    initial: { scaleX: 0, originX: 0 },
    animate: { 
      scaleX: readingProgress / 100,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`
          relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
          border-2 border-pink-100 hover:border-pink-200
          ${sizeClasses[size]} ${className}
        `}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        data-testid={testId}
        style={{ willChange: 'transform' }}
        onClick={() => onRead?.(book)}
      >
        {/* Book Cover Image - Now using Kawaii illustrations */}
        <div className={`relative ${imageSizes[size]} bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden`}>
          {book.coverUrl.startsWith('kawaii-') ? (
            // Use KawaiiBookCover for kawaii covers
            <div className="w-full h-full flex items-center justify-center">
              {book.coverUrl === 'kawaii-fantasy' && (
                <KawaiiBookCover genre="fantasy" width={200} height={300} />
              )}
              {book.coverUrl === 'kawaii-cookbook' && (
                <KawaiiBookCover genre="cookbook" width={200} height={300} />
              )}
              {book.coverUrl === 'kawaii-sci-fi' && (
                <KawaiiBookCover genre="sci-fi" width={200} height={300} />
              )}
              {book.coverUrl === 'kawaii-self-help' && (
                <KawaiiBookCover genre="self-help" width={200} height={300} />
              )}
            </div>
          ) : !imageError ? (
            // Use regular image for external URLs
            <motion.img
              src={book.coverUrl}
              alt={`${book.title} by ${book.author}`}
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="loading"
              animate={imageLoaded ? "loaded" : "loading"}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            // Fallback for missing images
            <motion.div 
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100"
              variants={imageVariants}
              initial="loading"
              animate="error"
            >
              <div className="text-center p-4">
                <div className="flex justify-center mb-2">
                  <BookIcon size="xl" animate={true} className="text-pink-500" />
                </div>
                <div className="text-xs text-gray-500 font-medium">{book.title}</div>
              </div>
            </motion.div>
          )}

          {/* Like Button Overlay */}
          {showActions && (
            <motion.button
              className={`
                absolute top-2 right-2 w-8 h-8 rounded-full
                ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/80 text-pink-500'}
                flex items-center justify-center shadow-md
                hover:scale-110 transition-transform
              `}
              onClick={(e) => {
                e.stopPropagation()
                handleLike()
              }}
              whileTap={{ scale: 0.9 }}
              data-testid="like-button"
            >
              <motion.span
                animate={isLiked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HeartIcon size="sm" animate={isLiked} className={isLiked ? 'text-red-500' : 'text-gray-400'} />
              </motion.span>
            </motion.button>
          )}

          {/* Reading Progress Bar */}
          {showProgress && readingProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="p-4 space-y-2">
          <div>
            <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
              {book.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-1">
              {book.author}
            </p>
          </div>

          {/* Book Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {book.pages && (
              <span className="flex items-center space-x-1">
                <PageIcon size="sm" animate={true} className="text-blue-500" />
                <span>{book.pages}p</span>
              </span>
            )}
            {book.rating && (
              <span className="flex items-center space-x-1">
                <StarIcon size="sm" animate={true} className="text-yellow-400" />
                <span>{book.rating.toFixed(1)}</span>
              </span>
            )}
            {book.genre && (
              <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                {book.genre}
              </span>
            )}
          </div>

          {/* Reading Progress Text */}
          {showProgress && readingProgress > 0 && (
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <BookIcon size="sm" animate={true} className="text-pink-500" />
              <span>{readingProgress}% complete</span>
            </div>
          )}

          {/* Description */}
          {book.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mt-2">
              {book.description}
            </p>
          )}

          {/* Action Buttons */}
          {showActions && (
            <div className="flex gap-2 mt-3">
              <KawaiiButtonAdvanced
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onRead?.(book)
                }}
                className="flex-1 text-xs"
                particleEffect="sparkles"
                data-testid="read-button"
              >
                <div className="flex items-center space-x-1">
                  <BookIcon size="sm" animate={true} className="text-white" />
                  <span>Read</span>
                </div>
              </KawaiiButtonAdvanced>
              
              <KawaiiButtonAdvanced
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToList()
                }}
                className="text-xs"
                particleEffect="stars"
                data-testid="add-to-list-button"
              >
                <div className="flex items-center justify-center">
                  <span className="text-lg font-bold">+</span>
                </div>
              </KawaiiButtonAdvanced>
            </div>
          )}
        </div>

        {/* Hover Overlay Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent pointer-events-none"
          variants={{
            rest: { opacity: 0 },
            hover: { 
              opacity: 1,
              transition: { duration: 0.2 }
            }
          }}
        />
      </motion.div>

      {/* Particle Effects */}
      {particles.length > 0 && (
        <ParticleRenderer particles={particles} data-testid="book-card-particles" />
      )}
    </>
  )
}

export default BookCard