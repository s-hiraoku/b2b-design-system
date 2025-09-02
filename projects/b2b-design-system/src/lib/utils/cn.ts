import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper deduplication
 * Uses clsx for conditional classes and tailwind-merge for Tailwind-specific merging
 * 
 * @param inputs - Class values to merge (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * ```ts
 * // Basic usage
 * cn('px-2 py-1', 'bg-blue-500', 'text-white')
 * // → 'px-2 py-1 bg-blue-500 text-white'
 * 
 * // Conditional classes
 * cn('px-2 py-1', {
 *   'bg-blue-500': isActive,
 *   'bg-gray-300': !isActive
 * })
 * 
 * // Overriding Tailwind classes (tailwind-merge handles conflicts)
 * cn('px-2 px-4', 'py-1 py-2')
 * // → 'px-4 py-2' (later classes override earlier ones)
 * 
 * // With arrays and nested conditions
 * cn(['px-2', 'py-1'], {
 *   'bg-blue-500': isActive
 * }, isLarge && 'text-lg')
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn;