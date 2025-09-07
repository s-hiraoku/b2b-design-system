import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  BookIcon,
  ClockIcon,
  FireIcon,
  PageIcon,
  CalendarIcon,
  TargetIcon
} from './KawaiiIcons'

describe('KawaiiIcons Core Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('New Emoji Replacement Icons', () => {
    it('should_render_ClockIcon_successfully', () => {
      render(<ClockIcon />)
      // Should render without errors
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('should_render_FireIcon_successfully', () => {
      render(<FireIcon />)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('should_render_PageIcon_successfully', () => {
      render(<PageIcon />)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('should_render_CalendarIcon_successfully', () => {
      render(<CalendarIcon />)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('should_render_TargetIcon_successfully', () => {
      render(<TargetIcon />)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('should_apply_size_classes_correctly', () => {
      const { container } = render(<ClockIcon size="lg" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-8', 'h-8')
    })

    it('should_default_to_medium_size', () => {
      const { container } = render(<FireIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-6', 'h-6')
    })
  })

  describe('SVG Structure', () => {
    it('should_have_proper_viewBox_attribute', () => {
      const { container } = render(<PageIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    })

    it('should_have_fill_none_by_default', () => {
      const { container } = render(<CalendarIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('fill', 'none')
    })
  })

  describe('Animation Support', () => {
    it('should_render_with_animation_enabled', () => {
      const { container } = render(<TargetIcon animate={true} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should_render_with_animation_disabled', () => {
      const { container } = render(<BookIcon animate={false} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Kawaii Design Elements', () => {
    it('should_contain_kawaii_face_elements', () => {
      const { container } = render(<ClockIcon />)
      const svg = container.querySelector('svg')
      const svgContent = svg?.innerHTML || ''
      
      // Should contain circles (eyes) and paths (smiles)
      expect(svgContent).toMatch(/<circle/)
      expect(svgContent).toMatch(/<path/)
    })

    it('should_use_kawaii_color_palette', () => {
      const { container } = render(<FireIcon />)
      const svg = container.querySelector('svg')
      const svgContent = svg?.innerHTML || ''
      
      // Should contain kawaii colors
      expect(svgContent).toContain('#FF')
    })
  })

  describe('Accessibility Features', () => {
    it('should_be_svg_elements', () => {
      const icons = [ClockIcon, FireIcon, PageIcon, CalendarIcon, TargetIcon]
      
      icons.forEach((Icon, index) => {
        const { container } = render(<Icon />)
        const svg = container.querySelector('svg')
        expect(svg?.tagName.toLowerCase()).toBe('svg')
      })
    })
  })

  describe('Performance', () => {
    it('should_render_multiple_icons_efficiently', () => {
      const startTime = performance.now()
      
      render(
        <div>
          <ClockIcon />
          <FireIcon />
          <PageIcon />
          <CalendarIcon />
          <TargetIcon />
        </div>
      )
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render quickly (under 50ms)
      expect(renderTime).toBeLessThan(50)
      
      // All SVGs should be present
      const svgs = document.querySelectorAll('svg')
      expect(svgs.length).toBe(5)
    })
  })

  describe('Error Handling', () => {
    it('should_handle_invalid_props_gracefully', () => {
      expect(() => {
        // @ts-expect-error - Testing invalid prop
        render(<ClockIcon size="invalid" />)
      }).not.toThrow()
    })

    it('should_handle_undefined_props_gracefully', () => {
      expect(() => {
        render(<FireIcon size={undefined} className={undefined} />)
      }).not.toThrow()
    })
  })
})