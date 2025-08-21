import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { kawaiiPresets } from '@/lib/kawaii-animations'
import KawaiiButtonAdvanced from '@/components/kawaii/KawaiiButtonAdvanced'
import BookCard, { type Book } from '@/components/reading/BookCard'
import ReadingProgress, { type ReadingStats } from '@/components/reading/ReadingProgress'

// Sample data for demonstration
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Enchanted Garden',
    author: 'Luna Sakura',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop',
    description: 'A magical tale of friendship and adventure in a mysterious garden.',
    pages: 280,
    rating: 4.8,
    genre: 'Fantasy',
    publishedYear: 2023
  },
  {
    id: '2',
    title: 'Kawaii Cooking Adventures',
    author: 'Chef Momo',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop',
    description: 'Discover the joy of cooking with cute and delicious recipes.',
    pages: 156,
    rating: 4.6,
    genre: 'Cookbook',
    publishedYear: 2023
  },
  {
    id: '3',
    title: 'Digital Dreams',
    author: 'Yuki Tanaka',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    description: 'A futuristic romance set in a world of virtual reality.',
    pages: 324,
    rating: 4.5,
    genre: 'Sci-Fi Romance',
    publishedYear: 2022
  },
  {
    id: '4',
    title: 'The Art of Mindful Reading',
    author: 'Serenity Willow',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop',
    description: 'Learn to find peace and wisdom through mindful reading practices.',
    pages: 198,
    rating: 4.9,
    genre: 'Self-Help',
    publishedYear: 2023
  }
]

const sampleStats: ReadingStats = {
  booksRead: 24,
  pagesRead: 6240,
  minutesRead: 3780,
  currentStreak: 12,
  weeklyGoal: 2,
  monthlyGoal: 8,
  yearlyGoal: 50
}

const HomePage: NextPage = () => {
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set(['1', '3']))
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleLike = (book: Book) => {
    const newLikedBooks = new Set(likedBooks)
    if (likedBooks.has(book.id)) {
      newLikedBooks.delete(book.id)
    } else {
      newLikedBooks.add(book.id)
    }
    setLikedBooks(newLikedBooks)
  }

  const handleRead = (book: Book) => {
    setSelectedBook(book)
    // In a real app, this would navigate to the reading page
    console.log('Reading:', book.title)
  }

  const handleAddToList = (book: Book) => {
    // In a real app, this would add to reading list
    console.log('Added to list:', book.title)
  }

  return (
    <>
      <Head>
        <title>Kawaii Reading Blog - Discover Your Next Favorite Book! 📚</title>
        <meta name="description" content="A cute and delightful reading blog with kawaii animations, book recommendations, and reading progress tracking." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Header */}
        <motion.header
          className="bg-white/80 backdrop-blur-lg border-b-2 border-pink-100 sticky top-0 z-40"
          variants={kawaiiPresets.pageEnter}
          initial="initial"
          animate="animate"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl">📚</div>
                <div>
                  <h1 className="text-2xl font-bold kawaii-text-gradient">
                    Kawaii Reading Blog
                  </h1>
                  <p className="text-sm text-gray-600">Discover magical books ✨</p>
                </div>
              </motion.div>

              <div className="flex items-center space-x-4">
                <KawaiiButtonAdvanced
                  variant="secondary"
                  size="sm"
                  particleEffect="sparkles"
                  glowEffect={true}
                >
                  🔍 Search Books
                </KawaiiButtonAdvanced>
                
                <KawaiiButtonAdvanced
                  variant="primary"
                  size="sm"
                  particleEffect="hearts"
                  pulseEffect={true}
                >
                  📖 My Library
                </KawaiiButtonAdvanced>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <motion.section
            className="text-center mb-12"
            variants={kawaiiPresets.pageEnter}
            initial="initial"
            animate="animate"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-4 kawaii-text-gradient"
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 0.5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Welcome to Your Reading Adventure! 🌟
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
              variants={kawaiiPresets.itemAppear}
            >
              Discover amazing books, track your reading progress, and join a community 
              of book lovers in the most kawaii way possible! ✨📚💖
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={kawaiiPresets.listStagger}
            >
              <KawaiiButtonAdvanced
                variant="primary"
                size="lg"
                particleEffect="hearts"
                glowEffect={true}
                onClick={() => console.log('Start reading!')}
              >
                🚀 Start Reading Adventure
              </KawaiiButtonAdvanced>
              
              <KawaiiButtonAdvanced
                variant="accent"
                size="lg"
                particleEffect="stars"
                onClick={() => console.log('Browse books')}
              >
                📚 Browse Books
              </KawaiiButtonAdvanced>
            </motion.div>
          </motion.section>

          {/* Reading Progress Section */}
          <motion.section
            className="mb-12"
            variants={kawaiiPresets.itemAppear}
            initial="initial"
            animate="animate"
          >
            <ReadingProgress stats={sampleStats} />
          </motion.section>

          {/* Featured Books Section */}
          <motion.section
            variants={kawaiiPresets.listStagger}
            initial="initial"
            animate="animate"
          >
            <motion.h3
              className="text-3xl font-bold text-center mb-8 text-gray-800"
              variants={kawaiiPresets.itemAppear}
            >
              ✨ Featured Books ✨
            </motion.h3>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={kawaiiPresets.listStagger}
            >
              {sampleBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  variants={kawaiiPresets.itemAppear}
                  whileHover={{ y: -5 }}
                >
                  <BookCard
                    book={book}
                    isLiked={likedBooks.has(book.id)}
                    readingProgress={index === 0 ? 65 : index === 2 ? 23 : 0}
                    onLike={handleLike}
                    onRead={handleRead}
                    onAddToList={handleAddToList}
                    size="md"
                    showProgress={true}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Call to Action Section */}
          <motion.section
            className="mt-16 text-center"
            variants={kawaiiPresets.itemAppear}
            initial="initial"
            animate="animate"
          >
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 border-2 border-pink-200">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                📖💫
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Ready to Start Your Reading Journey?
              </h3>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Join thousands of readers who have discovered their new favorite books 
                through our kawaii reading community!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <KawaiiButtonAdvanced
                  variant="primary"
                  size="lg"
                  particleEffect="sparkles"
                  glowEffect={true}
                  pulseEffect={true}
                >
                  🌟 Join Community
                </KawaiiButtonAdvanced>
                
                <KawaiiButtonAdvanced
                  variant="secondary"
                  size="lg"
                  particleEffect="hearts"
                >
                  💌 Get Recommendations
                </KawaiiButtonAdvanced>
              </div>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <motion.footer
          className="bg-white/80 backdrop-blur-lg border-t-2 border-pink-100 mt-16"
          variants={kawaiiPresets.itemAppear}
          initial="initial"
          animate="animate"
        >
          <div className="container mx-auto px-6 py-8 text-center">
            <div className="text-2xl mb-4">📚✨💖</div>
            <p className="text-gray-600 mb-4">
              Made with love for book enthusiasts everywhere
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-pink-500 transition-colors">About</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Help</a>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Selected Book Modal (simple implementation) */}
      {selectedBook && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          variants={kawaiiPresets.modalSlide}
          initial="initial"
          animate="animate"
          onClick={() => setSelectedBook(null)}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">📖 {selectedBook.title}</h3>
            <p className="text-gray-600 mb-4">by {selectedBook.author}</p>
            <p className="text-gray-700 mb-6">{selectedBook.description}</p>
            
            <div className="flex gap-4">
              <KawaiiButtonAdvanced
                variant="primary"
                className="flex-1"
                particleEffect="sparkles"
                onClick={() => setSelectedBook(null)}
              >
                Start Reading
              </KawaiiButtonAdvanced>
              
              <KawaiiButtonAdvanced
                variant="secondary"
                onClick={() => setSelectedBook(null)}
              >
                Close
              </KawaiiButtonAdvanced>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default HomePage