/**
 * Kawaii Image Loader - Optimized image delivery for the reading blog
 * Supports multiple CDNs and automatic format optimization
 */

const kawaiiImageLoader = ({ src, width, quality = 75 }) => {
  // Handle different image sources
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // External images - check for specific CDN optimizations
    
    // Cloudinary optimization
    if (src.includes('res.cloudinary.com')) {
      return optimizeCloudinaryImage(src, width, quality)
    }
    
    // Unsplash optimization
    if (src.includes('images.unsplash.com')) {
      return optimizeUnsplashImage(src, width, quality)
    }
    
    // Google Books API optimization
    if (src.includes('books.google.com')) {
      return optimizeGoogleBooksImage(src, width)
    }
    
    // Open Library covers
    if (src.includes('covers.openlibrary.org')) {
      return optimizeOpenLibraryImage(src, width)
    }
    
    // Generic external image - return as-is with width hint
    return `${src}${src.includes('?') ? '&' : '?'}w=${width}&q=${quality}`
  }
  
  // Local images - use Next.js built-in optimization
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

/**
 * Cloudinary image optimization
 */
function optimizeCloudinaryImage(src, width, quality) {
  // Extract the base URL and transformation parameters
  const cloudinaryBase = 'https://res.cloudinary.com/'
  const urlParts = src.split(cloudinaryBase)[1].split('/')
  const cloudName = urlParts[0]
  const imageId = urlParts[urlParts.length - 1]
  
  // Build optimized URL with kawaii-specific optimizations
  const transformations = [
    `w_${width}`,
    `q_${quality}`,
    'f_auto', // Automatic format selection (WebP, AVIF)
    'dpr_auto', // Auto DPR for retina displays
    'c_fill', // Fill the specified dimensions
    'g_auto', // Automatic gravity for better cropping
    'e_improve', // Auto enhance for better quality
    'fl_progressive' // Progressive loading
  ].join(',')
  
  return `${cloudinaryBase}${cloudName}/image/upload/${transformations}/${imageId}`
}

/**
 * Unsplash image optimization
 */
function optimizeUnsplashImage(src, width, quality) {
  const url = new URL(src)
  
  // Unsplash URL parameters for optimization
  url.searchParams.set('w', width)
  url.searchParams.set('q', quality)
  url.searchParams.set('fm', 'webp') // Prefer WebP format
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('crop', 'faces,focalpoint') // Smart cropping for book covers
  
  return url.toString()
}

/**
 * Google Books API image optimization
 */
function optimizeGoogleBooksImage(src, width) {
  // Google Books covers are relatively simple
  // Just ensure we get an appropriate size
  const sizeParam = width > 400 ? '&zoom=1' : '&zoom=0'
  return `${src}${sizeParam}&edge=curl` // Add the curled edge effect for books
}

/**
 * Open Library covers optimization
 */
function optimizeOpenLibraryImage(src, width) {
  // Open Library uses size-based URLs
  let size = 'S' // Small by default
  
  if (width > 300) {
    size = 'L' // Large
  } else if (width > 180) {
    size = 'M' // Medium
  }
  
  // Replace the size parameter in the URL
  return src.replace(/-(S|M|L)\./, `-${size}.`)
}

/**
 * Generate kawaii-optimized placeholder image
 */
export const getKawaiiPlaceholder = (width = 200, height = 300, type = 'book') => {
  const placeholders = {
    book: `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#fce7f3;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f3e8ff;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)"/>
        <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" fill="#9333ea">📚</text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#7c3aed">Loading...</text>
      </svg>
    `)}`,
    
    avatar: `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="40%" fill="#fce7f3"/>
        <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="30" text-anchor="middle" fill="#9333ea">👤</text>
      </svg>
    `)}`
  }
  
  return placeholders[type] || placeholders.book
}

/**
 * Get blur data URL for kawaii loading effect
 */
export const getKawaiiBlurDataURL = () => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fce7f3"/>
    </svg>
  `)}`
}

export default kawaiiImageLoader