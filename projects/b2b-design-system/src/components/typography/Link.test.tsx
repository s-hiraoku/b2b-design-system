import React from 'react';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { vi } from 'vitest';
import { Link } from './Link';

describe('Link Component - TDD Cycle', () => {
  const user = setupUserEvent();

  describe('Basic Rendering', () => {
    it('should render an anchor element', () => {
      // Arrange: Basic link rendering test
      const linkText = 'Click me';
      const href = 'https://example.com';

      // Act: Render the link
      render(<Link href={href}>{linkText}</Link>);

      // Assert: Should render as anchor element
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', href);
    });

    it('should render with different variants', () => {
      // Arrange: Test variant prop
      const linkText = 'Primary Link';

      // Act: Render link with primary variant
      render(<Link variant="primary" href="/test">{linkText}</Link>);

      // Assert: Should have primary styling
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toHaveClass('text-blue-600');
    });

    it('should render with different sizes', () => {
      // Arrange: Test size prop
      const linkText = 'Large Link';

      // Act: Render link with large size
      render(<Link size="large" href="/test">{linkText}</Link>);

      // Assert: Should have large size classes
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toHaveClass('text-lg');
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle click events', async () => {
      // Arrange: Setup click handler
      const handleClick = vi.fn();
      const linkText = 'Clickable Link';

      // Act: Render and click the link
      render(<Link onClick={handleClick} href="/test">{linkText}</Link>);
      await user.click(screen.getByRole('link', { name: linkText }));

      // Assert: Click handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should prevent navigation when disabled', async () => {
      // Arrange: Setup disabled link
      const handleClick = vi.fn();
      const linkText = 'Disabled Link';

      // Act: Render disabled link and attempt click
      render(<Link disabled onClick={handleClick} href="/test">{linkText}</Link>);
      const link = screen.getByText(linkText); // Use getByText since disabled links may not have link role
      await user.click(link);

      // Assert: Should be disabled and not navigate
      expect(link).toHaveClass('pointer-events-none');
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should show loading state', () => {
      // Arrange: Test loading state
      const linkText = 'Loading Link';

      // Act: Render loading link
      render(<Link loading href="/test">{linkText}</Link>);

      // Assert: Should show loading indicator
      const link = screen.getByText(linkText); // Use getByText since loading links may not have link role
      expect(link).toHaveAttribute('aria-busy', 'true');
      expect(link).toContainHTML('Loading Link'); // Should still show text
    });
  });

  describe('External Link Behavior', () => {
    it('should add security attributes for external links', () => {
      // Arrange: Test external link
      const linkText = 'External Link';
      const externalHref = 'https://external-site.com';

      // Act: Render external link
      render(<Link href={externalHref} external>{linkText}</Link>);

      // Assert: Should have security attributes
      const link = screen.getByRole('link', { name: `${linkText} opens in new tab` });
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should show external link indicator', () => {
      // Arrange: Test external link indicator
      const linkText = 'External Link';

      // Act: Render external link
      render(<Link external href="https://example.com">{linkText}</Link>);

      // Assert: Should show external indicator
      const link = screen.getByRole('link', { name: `${linkText} opens in new tab` });
      expect(link).toContainHTML('↗'); // External link icon
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have no accessibility violations', async () => {
      // Arrange: Render link for accessibility testing
      const { container } = render(<Link href="/test">Accessible Link</Link>);

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should be keyboard accessible', async () => {
      // Arrange: Setup keyboard interaction
      const handleClick = vi.fn();
      const linkText = 'Keyboard Link';

      // Act: Render, focus, and press Enter
      render(<Link onClick={handleClick} href="/test">{linkText}</Link>);
      const link = screen.getByRole('link', { name: linkText });
      link.focus();
      await user.keyboard('{Enter}');

      // Assert: Should be keyboard accessible
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have proper focus indicators', () => {
      // Arrange: Test focus styling
      const linkText = 'Focus Link';

      // Act: Render and focus link
      render(<Link href="/test">{linkText}</Link>);
      const link = screen.getByRole('link', { name: linkText });
      link.focus();

      // Assert: Should have focus indicators
      expect(link).toHaveClass('focus-visible:outline-none');
      expect(link).toHaveClass('focus-visible:ring-2');
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      // Arrange: Test enterprise variant
      const linkText = 'Enterprise Link';

      // Act: Render with enterprise variant
      render(<Link variant="enterprise" href="/test">{linkText}</Link>);

      // Assert: Should have enterprise classes
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toHaveEnterpriseClass('link');
    });

    it('should support professional navigation patterns', () => {
      // Arrange: Test professional styling
      const linkText = 'Professional Link';

      // Act: Render with default professional styling
      render(<Link href="/test">{linkText}</Link>);

      // Assert: Should have professional styling
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toHaveClass('underline'); // Professional link indication
      expect(link).toHaveClass('underline-offset-2'); // Proper spacing
    });

    it('should maintain consistent hover states', () => {
      // Arrange: Test hover behavior
      const linkText = 'Hover Link';

      // Act: Render link
      render(<Link href="/test">{linkText}</Link>);

      // Assert: Should have consistent hover styling
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toHaveClass('hover:text-blue-700'); // Consistent hover color
    });
  });
});