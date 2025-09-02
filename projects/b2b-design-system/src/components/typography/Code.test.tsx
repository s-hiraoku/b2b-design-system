import React from 'react';
import { render, screen, setupUserEvent } from '../../tests/utils/test-utils';
import { expectNoAccessibilityViolations } from '../../tests/setup/test-setup';
import { vi } from 'vitest';
import { Code } from './Code';

describe('Code Component - TDD Cycle', () => {
  describe('Basic Rendering', () => {
    it('should render inline code by default', () => {
      // Arrange: Basic inline code rendering test
      const codeText = 'console.log("hello")';

      // Act: Render the code
      render(<Code>{codeText}</Code>);

      // Assert: Should render as inline code element
      const code = screen.getByText(codeText);
      expect(code).toBeInTheDocument();
      expect(code.tagName).toBe('CODE');
    });

    it('should render block code when block prop is true', () => {
      // Arrange: Test block code
      const codeText = 'function hello() {\n  return "world";\n}';

      // Act: Render block code
      render(<Code block>{codeText}</Code>);

      // Assert: Should render as pre > code structure
      const code = screen.getByRole('region', { name: 'Code block' }).querySelector('code');
      expect(code?.tagName).toBe('CODE');
      expect(code?.parentElement?.tagName).toBe('PRE');
    });

    it('should apply language-specific styling', () => {
      // Arrange: Test language prop
      const codeText = 'const x = 42;';

      // Act: Render code with JavaScript language
      render(<Code language="javascript">{codeText}</Code>);

      // Assert: Should have language classes
      const code = screen.getByText(codeText);
      expect(code).toHaveClass('language-javascript');
    });

    it('should render with different size variants', () => {
      // Arrange: Test size variants
      const codeText = 'npm install';

      // Act: Render code with large size
      render(<Code size="large">{codeText}</Code>);

      // Assert: Should have large size classes
      const code = screen.getByText(codeText);
      expect(code).toHaveClass('text-base'); // Large maps to text-base
    });
  });

  describe('Component Variants', () => {
    it('should apply color variant classes', () => {
      // Arrange: Test color variant
      const codeText = 'error.log';

      // Act: Render code with error color
      render(<Code color="error">{codeText}</Code>);

      // Assert: Should have error color classes
      const code = screen.getByText(codeText);
      expect(code).toHaveClass('text-red-600');
    });

    it('should render with copy functionality', () => {
      // Arrange: Test copyable prop
      const codeText = 'git clone repo.git';

      // Act: Render copyable code
      render(<Code copyable>{codeText}</Code>);

      // Assert: Should show copy button
      const copyButton = screen.getByRole('button', { name: /copy/i });
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).toHaveAttribute('aria-label', 'Copy code');
    });

    it('should show line numbers for block code', () => {
      // Arrange: Test line numbers
      const codeText = 'line 1\nline 2\nline 3';

      // Act: Render block code with line numbers
      render(<Code block lineNumbers>{codeText}</Code>);

      // Assert: Should have line numbers container
      const codeContainer = screen.getByRole('region', { name: 'Code block' });
      expect(codeContainer).toHaveAttribute('data-line-numbers', 'true');
    });

    it('should highlight specific lines', () => {
      // Arrange: Test line highlighting
      const codeText = 'line 1\nline 2\nline 3';

      // Act: Render code with highlighted lines
      render(<Code block highlightLines={[2]}>{codeText}</Code>);

      // Assert: Should have highlight classes
      const codeElement = screen.getByRole('region', { name: 'Code block' }).querySelector('code');
      expect(codeElement).toHaveAttribute('data-highlight-lines', '2');
    });
  });

  describe('Interactive Behavior', () => {
    it('should copy code to clipboard when copy button is clicked', async () => {
      // Arrange: Mock clipboard API
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText },
      });

      const codeText = 'const copied = true;';

      // Act: Render copyable code and click copy button
      render(<Code copyable>{codeText}</Code>);
      const copyButton = screen.getByRole('button', { name: /copy/i });
      await copyButton.click();

      // Assert: Should copy to clipboard
      expect(writeText).toHaveBeenCalledWith(codeText);
    });

    it('should show success feedback after copying', async () => {
      // Arrange: Mock clipboard API
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText },
      });

      const codeText = 'copied code';

      // Act: Render copyable code and click copy button
      render(<Code copyable>{codeText}</Code>);
      const copyButton = screen.getByRole('button', { name: /copy/i });
      await copyButton.click();

      // Assert: Should show success feedback
      expect(screen.getByText(/copied/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility Requirements', () => {
    it('should have no accessibility violations', async () => {
      // Arrange: Render code for accessibility testing
      const { container } = render(<Code>accessible code</Code>);

      // Assert: Should pass accessibility audit
      await expectNoAccessibilityViolations(container);
    });

    it('should provide proper semantic structure for block code', () => {
      // Arrange: Test semantic structure
      const codeText = 'semantic code block';

      // Act: Render block code
      render(<Code block>{codeText}</Code>);

      // Assert: Should have proper semantic structure
      const pre = screen.getByText(codeText).parentElement;
      expect(pre?.tagName).toBe('PRE');
      expect(pre).toHaveAttribute('role', 'region');
      expect(pre).toHaveAttribute('aria-label', 'Code block');
    });

    it('should have accessible copy button', () => {
      // Arrange: Test copy button accessibility
      const codeText = 'accessible copy';

      // Act: Render copyable code
      render(<Code copyable>{codeText}</Code>);

      // Assert: Copy button should be accessible
      const copyButton = screen.getByRole('button', { name: /copy/i });
      expect(copyButton).toHaveAttribute('aria-label', 'Copy code');
      expect(copyButton).toHaveAttribute('type', 'button');
    });

    it('should provide language information for screen readers', () => {
      // Arrange: Test language accessibility
      const codeText = 'const accessible = true;';

      // Act: Render code with language
      render(<Code language="javascript">{codeText}</Code>);

      // Assert: Should provide language info
      const code = screen.getByText(codeText);
      expect(code).toHaveAttribute('data-language', 'javascript');
    });
  });

  describe('Enterprise B2B Requirements', () => {
    it('should render with enterprise-specific styling', () => {
      // Arrange: Test enterprise variant
      const codeText = 'enterprise.config.js';

      // Act: Render with enterprise variant
      render(<Code variant="enterprise">{codeText}</Code>);

      // Assert: Should have enterprise classes
      const code = screen.getByText(codeText);
      expect(code).toHaveEnterpriseClass('code');
    });

    it('should support professional code documentation', () => {
      // Arrange: Test professional styling
      const codeText = 'API_KEY=your_key_here';

      // Act: Render with default professional styling
      render(<Code>{codeText}</Code>);

      // Assert: Should have professional code styling
      const code = screen.getByText(codeText);
      expect(code).toHaveClass('bg-gray-100'); // Professional background
      expect(code).toHaveClass('px-2'); // Professional padding
      expect(code).toHaveClass('py-1');
      expect(code).toHaveClass('rounded');
    });

    it('should maintain proper contrast for readability', () => {
      // Arrange: Test contrast requirements
      const codeText = 'high-contrast-code';

      // Act: Render code with default styling
      render(<Code>{codeText}</Code>);

      // Assert: Should have proper contrast
      const code = screen.getByText(codeText);
      expect(code).toHaveClass('text-gray-900'); // High contrast text
    });

    it('should support technical documentation workflows', () => {
      // Arrange: Test technical documentation features
      const codeText = 'curl -X GET https://api.example.com';

      // Act: Render technical documentation code
      render(<Code block copyable language="bash">{codeText}</Code>);

      // Assert: Should support technical workflows
      const code = screen.getByText(codeText);
      const copyButton = screen.getByRole('button', { name: /copy/i });
      
      expect(code).toHaveClass('language-bash');
      expect(copyButton).toBeInTheDocument();
      expect(code.parentElement).toHaveAttribute('role', 'region');
    });
  });
});