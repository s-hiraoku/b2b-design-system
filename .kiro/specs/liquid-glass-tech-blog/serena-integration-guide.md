# Serena MCP Integration Guide - Liquid Glass Tech Blog

## Integration Workflow with CC-Deck Orchestration

This document outlines how Serena MCP should be integrated with the CC-Deck workflow orchestration system for the Liquid Glass Tech Blog project.

## Phase-Based Serena Context Loading

### 1. Pre-Development Initialization

**Trigger Point**: Before any code generation begins
**Command**: When `/orchestrator` is executed for liquid-glass-tech-blog

```bash
# Orchestrator should execute:
mcp__serena__initial_instructions
mcp__serena__load_project_context --project "liquid-glass-tech-blog"
```

**Context to Load**:
- Project overview and technical architecture
- TDD methodology and testing patterns  
- Component naming conventions and file structure
- Performance requirements and quality gates
- Seasonal theming and AI integration patterns

### 2. TDD Phase Context Enhancement

**Trigger Point**: When TDD agent is activated
**Context Enhancement**:

```typescript
// Serena Memory Context for TDD Phase
const tddContext = {
  project: "liquid-glass-tech-blog",
  phase: "test_driven_development",
  patterns: {
    testStructure: "AAA (Arrange-Act-Assert)",
    testNaming: "descriptive behavior-driven naming",
    coverageRequirements: {
      lines: 95,
      branches: 90, 
      functions: 95
    },
    testTypes: [
      "component unit tests",
      "hook behavior tests", 
      "integration tests",
      "performance benchmarks",
      "accessibility compliance",
      "visual regression tests"
    ]
  }
};
```

### 3. Implementation Phase Context

**Trigger Point**: When implementation agent is activated  
**Context Enhancement**:

```typescript
// Serena Memory Context for Implementation Phase
const implementationContext = {
  project: "liquid-glass-tech-blog", 
  phase: "implementation",
  standards: {
    directory: "projects/liquid-glass-tech-blog/src/",
    framework: "Next.js 15 App Router + React 19",
    styling: "Tailwind CSS 4 + CSS-in-JS",
    typescript: "strict mode with comprehensive types",
    performance: {
      targetFPS: 60,
      gpuAcceleration: true,
      coreWebVitals: {
        LCP: "<2.5s",
        INP: "<200ms", 
        CLS: "<0.1"
      }
    }
  }
};
```

## Serena MCP Command Sequence

### Initialization Sequence
```bash
# 1. Initialize Serena with project context
mcp__serena__initial_instructions

# 2. Load project-specific memories
mcp__serena__store_memory --topic "project_overview" --content "$(cat .kiro/specs/liquid-glass-tech-blog/serena-onboarding-context.md)"

# 3. Load TDD patterns
mcp__serena__store_memory --topic "tdd_patterns" --content "$(cat .kiro/specs/liquid-glass-tech-blog/tdd-patterns.md)"

# 4. Load project structure requirements
mcp__serena__store_memory --topic "project_structure" --content "$(cat .kiro/specs/liquid-glass-tech-blog/project-structure-setup.md)"

# 5. Verify context loading
mcp__serena__list_memories

# 6. Test context retrieval
mcp__serena__find_symbol --query "LiquidGlassCard implementation patterns"
```

### Development Phase Commands
```bash
# Before component development
mcp__serena__get_symbols_overview --scope "liquid-glass components"

# During implementation
mcp__serena__find_symbol --query "seasonal theme integration patterns"
mcp__serena__find_symbol --query "GPU acceleration techniques"
mcp__serena__find_symbol --query "TDD test structure for React components"

# Code generation guidance
mcp__serena__read_memory --topic "component_patterns" --filter "LiquidGlassCard"
```

## Context-Aware Code Generation Patterns

### 1. Component Generation Pattern

When Serena generates React components, it should follow these patterns:

```typescript
// Pattern: Liquid Glass Component with TDD
// File: projects/liquid-glass-tech-blog/src/components/liquid-glass/LiquidGlassCard.tsx

import React from 'react';
import { useLiquidGlass } from '@/hooks/useLiquidGlass';
import { useSeasonalTheme } from '@/hooks/useSeasonalTheme';
import type { LiquidGlassProps } from '@/types/liquid-glass';

/**
 * LiquidGlassCard - Core glassmorphism effect component
 * 
 * Provides GPU-accelerated liquid glass effects with seasonal theming.
 * Supports interactive states and performance monitoring.
 * 
 * @param props - LiquidGlassProps configuration
 * @returns JSX.Element with liquid glass styling
 */
export const LiquidGlassCard: React.FC<LiquidGlassProps> = ({
  blur = 15,
  opacity = 0.1,
  saturation = 1.8,
  interactive = false,
  seasonalTheme = false,
  children,
  className = '',
  ...props
}) => {
  const { glassStyles } = useLiquidGlass({ blur, opacity, saturation });
  const { currentTheme } = useSeasonalTheme({ enabled: seasonalTheme });
  
  return (
    <div
      data-testid="liquid-glass-card"
      className={`liquid-glass-card ${seasonalTheme ? `${currentTheme.season}-theme` : ''} ${className}`}
      style={glassStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export default LiquidGlassCard;
```

### 2. Test Generation Pattern

When Serena generates tests, it should follow TDD patterns:

```typescript
// Pattern: TDD Test Structure
// File: projects/liquid-glass-tech-blog/src/tests/components/liquid-glass/LiquidGlassCard.test.tsx

import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LiquidGlassCard } from '@/components/liquid-glass/LiquidGlassCard';
import { SeasonalThemeProvider } from '@/components/liquid-glass/SeasonalThemeProvider';
import type { LiquidGlassProps } from '@/types/liquid-glass';

describe('LiquidGlassCard', () => {
  const defaultProps: LiquidGlassProps = {
    blur: 15,
    opacity: 0.1,
    saturation: 1.8,
    children: <div>Test content</div>
  };

  beforeEach(() => {
    // Reset CSS mocks and performance API
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      // ARRANGE
      render(<LiquidGlassCard {...defaultProps} />);
      
      // ACT & ASSERT
      const card = screen.getByTestId('liquid-glass-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('liquid-glass-card');
    });

    it('should apply backdrop-filter styles', () => {
      // ARRANGE & ACT
      render(<LiquidGlassCard {...defaultProps} />);
      
      // ASSERT
      const card = screen.getByTestId('liquid-glass-card');
      expect(card).toHaveStyle({
        backdropFilter: 'blur(15px) saturate(180%)'
      });
    });
  });

  describe('Seasonal Theme Integration', () => {
    it('should apply seasonal theme classes when enabled', () => {
      // ARRANGE
      const props = { ...defaultProps, seasonalTheme: true };
      
      // ACT
      render(
        <SeasonalThemeProvider season="spring">
          <LiquidGlassCard {...props} />
        </SeasonalThemeProvider>
      );
      
      // ASSERT
      const card = screen.getByTestId('liquid-glass-card');
      expect(card).toHaveClass('spring-theme');
    });
  });
});
```

### 3. Hook Generation Pattern

When Serena generates custom hooks:

```typescript
// Pattern: Custom Hook with Performance Monitoring
// File: projects/liquid-glass-tech-blog/src/hooks/useLiquidGlass.ts

import { useMemo, useEffect } from 'react';
import { usePerformanceMonitor } from './usePerformanceMonitor';
import type { LiquidGlassConfig, LiquidGlassStyles } from '@/types/liquid-glass';

/**
 * useLiquidGlass - Custom hook for liquid glass effect generation
 * 
 * Generates CSS styles for glassmorphism effects with GPU acceleration.
 * Monitors performance and adjusts effects based on device capabilities.
 * 
 * @param config - Liquid glass configuration options
 * @returns Object containing generated styles and performance metrics
 */
export function useLiquidGlass(config: LiquidGlassConfig): {
  glassStyles: LiquidGlassStyles;
  performanceMetrics: PerformanceMetrics;
} {
  const { monitorPerformance } = usePerformanceMonitor();
  
  const glassStyles = useMemo(() => {
    // GPU acceleration optimization
    const transform3d = 'translate3d(0, 0, 0)';
    
    return {
      backdropFilter: `blur(${config.blur}px) saturate(${config.saturation * 100}%)`,
      backgroundColor: `rgba(255, 255, 255, ${config.opacity})`,
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      transform: transform3d,
      willChange: 'transform, opacity',
    } as LiquidGlassStyles;
  }, [config.blur, config.opacity, config.saturation]);
  
  useEffect(() => {
    // Monitor performance impact of effects
    monitorPerformance('liquid-glass-effect', glassStyles);
  }, [glassStyles, monitorPerformance]);
  
  return { glassStyles, performanceMetrics: monitorPerformance.getMetrics() };
}
```

## Quality Gate Integration

### Serena Quality Validation
```typescript
// Quality gates that Serena should enforce during code generation
const qualityGates = {
  tddCompliance: {
    requireTests: true,
    coverageThreshold: 95,
    testStructure: 'AAA'
  },
  performanceStandards: {
    gpuAcceleration: true,
    sixtyFPS: true,
    coreWebVitals: true
  },
  accessibilityCompliance: {
    wcagLevel: 'AA',
    keyboardNavigation: true,
    screenReaderSupport: true
  },
  typeScriptStrictness: {
    strictMode: true,
    explicitTypes: true,
    jsDocRequired: true
  }
};
```

### Context Validation Commands
```bash
# Validate Serena context is properly loaded
mcp__serena__validate_context --project "liquid-glass-tech-blog"

# Check if Serena understands key patterns
mcp__serena__find_symbol --query "TDD test structure patterns"
mcp__serena__find_symbol --query "GPU acceleration techniques"
mcp__serena__find_symbol --query "seasonal theme implementation"

# Verify project structure understanding
mcp__serena__get_project_structure
```

## Error Handling & Recovery

### Context Loading Failures
```bash
# If Serena MCP fails to initialize
if ! mcp__serena__initial_instructions; then
  echo "Serena initialization failed - proceeding with standard development"
  # Fallback to local context files
  export SERENA_CONTEXT_PATH=".kiro/specs/liquid-glass-tech-blog/"
fi

# Verify essential context is available
mcp__serena__list_memories | grep -q "liquid-glass-tech-blog" || {
  echo "Warning: Serena context not properly loaded"
  mcp__serena__store_memory --topic "project_overview" --file ".kiro/specs/liquid-glass-tech-blog/serena-onboarding-context.md"
}
```

### Development Workflow Integration
```bash
# CC-Deck Orchestrator integration points

# Phase 1: Serena Onboarding
execute_serena_onboarding() {
  mcp__serena__initial_instructions
  load_project_context
  validate_context_loading
  return $?
}

# Phase 2: TDD Agent with Serena Context  
execute_tdd_with_serena() {
  mcp__serena__read_memory --topic "tdd_patterns"
  mcp__serena__find_symbol --query "component test patterns"
  # Proceed with TDD agent execution
}

# Phase 3: Implementation with Serena Guidance
execute_implementation_with_serena() {
  mcp__serena__get_symbols_overview --scope "implementation patterns"
  mcp__serena__find_symbol --query "performance optimization patterns"
  # Proceed with implementation agent execution
}
```

This integration guide ensures Serena MCP has comprehensive, context-aware understanding of the Liquid Glass Tech Blog project and can provide intelligent assistance throughout all development phases while maintaining strict adherence to TDD methodology and project quality standards.