import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../src/components/typography/Code';
import React from 'react';

const meta: Meta<typeof Code> = {
  title: 'Typography/Code',
  component: Code,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enterprise code display component with WCAG 2.1 AA compliance, inline and block code support, copy functionality, and professional B2B styling for technical documentation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'enterprise'],
      description: 'Visual variant of the code component',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for different contexts',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'success', 'warning', 'error'],
      description: 'Color variant for different contexts',
    },
    block: {
      control: { type: 'boolean' },
      description: 'Whether to render as block code (pre > code)',
    },
    language: {
      control: { type: 'text' },
      description: 'Programming language for syntax highlighting',
    },
    copyable: {
      control: { type: 'boolean' },
      description: 'Whether to show copy button',
    },
    lineNumbers: {
      control: { type: 'boolean' },
      description: 'Whether to show line numbers (block code only)',
    },
    highlightLines: {
      control: { type: 'object' },
      description: 'Lines to highlight (block code only)',
    },
    children: {
      control: { type: 'text' },
      description: 'Code content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Code>;

// Basic Examples
export const InlineCode: Story = {
  args: {
    children: 'const greeting = "Hello, World!";',
  },
};

export const BlockCode: Story = {
  args: {
    block: true,
    language: 'javascript',
    children: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  },
};

export const WithCopy: Story = {
  args: {
    block: true,
    copyable: true,
    language: 'typescript',
    children: `interface User {
  id: number;
  name: string;
  email: string;
}`,
  },
};

export const Enterprise: Story = {
  args: {
    block: true,
    variant: 'enterprise',
    language: 'sql',
    copyable: true,
    children: `SELECT users.name, orders.total
FROM users 
JOIN orders ON users.id = orders.user_id
WHERE orders.created_at > '2024-01-01';`,
  },
};

// Inline Code Variants
export const InlineVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different inline code variants for various contexts and emphasis levels.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <p className="text-gray-700">
        The default inline code looks like this: <Code>npm install react</Code> in your terminal.
      </p>
      
      <p className="text-gray-700">
        For API endpoints, you might use: <Code color="primary">GET /api/users</Code> to fetch users.
      </p>
      
      <p className="text-gray-700">
        Error codes can be highlighted: <Code color="error">404 Not Found</Code> or <Code color="error">500 Internal Server Error</Code>.
      </p>
      
      <p className="text-gray-700">
        Success responses: <Code color="success">200 OK</Code> or <Code color="success">201 Created</Code>.
      </p>
      
      <p className="text-gray-700">
        Warnings might include: <Code color="warning">DEPRECATED: useQuery</Code> in favor of newer methods.
      </p>
      
      <p className="text-gray-700">
        Environment variables: <Code color="muted">NODE_ENV</Code> and <Code color="muted">API_KEY</Code>.
      </p>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for various contexts and text scales.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Inline Size Variants</h4>
        <div className="space-y-2">
          <p className="text-lg">
            Large text with <Code size="large">large inline code</Code> for headings.
          </p>
          <p className="text-base">
            Regular text with <Code size="medium">medium inline code</Code> for body content.
          </p>
          <p className="text-sm">
            Small text with <Code size="small">small inline code</Code> for captions.
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Block Size Variants</h4>
        <div className="space-y-4">
          <Code block size="large" language="javascript">
console.log("Large code block for prominent examples");
          </Code>
          
          <Code block size="medium" language="javascript">
console.log("Medium code block (default size)");
          </Code>
          
          <Code block size="small" language="javascript">
console.log("Small code block for compact layouts");
          </Code>
        </div>
      </div>
    </div>
  ),
};

// Programming Languages
export const ProgrammingLanguages: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Code blocks with different programming language specifications for syntax highlighting context.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">JavaScript/TypeScript</h4>
        <Code block language="typescript" copyable>
{`interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`}
        </Code>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Python</h4>
        <Code block language="python" copyable>
{`def calculate_fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

# Example usage
result = calculate_fibonacci(10)
print(f"The 10th Fibonacci number is {result}")`}
        </Code>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">SQL</h4>
        <Code block language="sql" copyable variant="enterprise">
{`-- Complex financial reporting query
SELECT 
    u.name,
    SUM(o.total) as revenue,
    COUNT(o.id) as order_count,
    AVG(o.total) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY u.id, u.name
HAVING SUM(o.total) > 1000
ORDER BY revenue DESC;`}
        </Code>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Shell/Bash</h4>
        <Code block language="bash" copyable>
{`#!/bin/bash
# Production deployment script

echo "Starting deployment..."

# Build the application
npm run build

# Run tests
npm test

# Deploy to production
docker build -t app:latest .
docker push registry.example.com/app:latest

echo "Deployment complete!"`}
        </Code>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">JSON</h4>
        <Code block language="json" copyable>
{`{
  "name": "@company/design-system",
  "version": "1.0.0",
  "description": "Enterprise B2B Design System",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "vite build",
    "test": "vitest",
    "storybook": "storybook dev"
  }
}`}
        </Code>
      </div>
    </div>
  ),
};

// Copy Functionality
export const CopyFunctionality: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of copy functionality for both inline and block code.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Inline Code with Copy</h4>
        <p className="text-gray-700">
          You can copy this API key: <Code copyable>sk-1234567890abcdef</Code> for testing.
        </p>
        <p className="text-gray-700 mt-2">
          Or this command: <Code copyable>npm install @company/design-system</Code>
        </p>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Block Code with Copy</h4>
        <Code block language="javascript" copyable>
{`// Configuration example
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

export default config;`}
        </Code>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Enterprise Code with Copy</h4>
        <Code block variant="enterprise" language="yaml" copyable>
{`# Docker Compose for production
version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
  
  app:
    image: node:18-alpine
    environment:
      - NODE_ENV=production
    command: npm start`}
        </Code>
      </div>
    </div>
  ),
};

// Advanced Features
export const AdvancedFeatures: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Advanced features including line numbers and line highlighting for complex code examples.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Line Numbers</h4>
        <Code block language="typescript" lineNumbers copyable>
{`interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

class DatabaseConnection {
  private config: DatabaseConfig;
  
  constructor(config: DatabaseConfig) {
    this.config = config;
  }
  
  async connect(): Promise<void> {
    // Connection implementation
  }
}`}
        </Code>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Highlighted Lines</h4>
        <Code block language="javascript" highlightLines={[3, 7, 11]} copyable>
{`function processPayment(amount, method) {
  // Validate input parameters
  if (amount <= 0) {
    throw new Error('Invalid amount');
  }
  
  if (!['card', 'bank', 'paypal'].includes(method)) {
    throw new Error('Invalid payment method');
  }
  
  // Process the payment
  return paymentGateway.charge(amount, method);
}`}
        </Code>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Enterprise Code with All Features</h4>
        <Code 
          block 
          variant="enterprise" 
          language="sql" 
          lineNumbers 
          highlightLines={[1, 8, 12]}
          copyable
        >
{`-- Enterprise financial reporting query with CTE
WITH monthly_revenue AS (
  SELECT 
    DATE_TRUNC('month', order_date) as month,
    SUM(total_amount) as revenue
  FROM orders 
  WHERE order_date >= '2024-01-01'
  GROUP BY DATE_TRUNC('month', order_date)
),
growth_analysis AS (
  SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) as previous_revenue,
    ((revenue - LAG(revenue) OVER (ORDER BY month)) / 
     LAG(revenue) OVER (ORDER BY month)) * 100 as growth_rate
  FROM monthly_revenue
)
SELECT * FROM growth_analysis ORDER BY month;`}
        </Code>
      </div>
    </div>
  ),
};

// Enterprise B2B Examples
export const EnterpriseExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enterprise-focused examples with business-specific code and technical documentation.',
      },
    },
  },
  render: () => (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h3>
        <div className="p-4 bg-white rounded border">
          <h4 className="font-medium text-gray-700 mb-3">Authentication</h4>
          <p className="text-gray-600 mb-3">
            Include your API key in the Authorization header:
          </p>
          
          <Code block language="http" copyable>
{`POST /api/v1/auth/login
Authorization: Bearer your-api-key-here
Content-Type: application/json

{
  "username": "user@company.com",
  "password": "secure-password"
}`}
          </Code>
          
          <h4 className="font-medium text-gray-700 mb-3 mt-6">Response</h4>
          <Code block language="json" copyable>
{`{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "user": {
      "id": 12345,
      "email": "user@company.com",
      "role": "admin"
    }
  }
}`}
          </Code>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Examples</h3>
        <div className="p-4 bg-white rounded border">
          <h4 className="font-medium text-gray-700 mb-3">Environment Configuration</h4>
          <Code block language="env" copyable variant="enterprise">
{`# Production Environment Variables
NODE_ENV=production
API_BASE_URL=https://api.company.com
DATABASE_URL=postgresql://user:pass@db.company.com:5432/prod
REDIS_URL=redis://cache.company.com:6379
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-encryption-key-here
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=1000`}
          </Code>
          
          <h4 className="font-medium text-gray-700 mb-3 mt-6">Docker Configuration</h4>
          <Code block language="dockerfile" copyable variant="enterprise">
{`# Multi-stage production Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]`}
          </Code>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Queries</h3>
        <div className="p-4 bg-white rounded border">
          <h4 className="font-medium text-gray-700 mb-3">Financial Reporting</h4>
          <Code block language="sql" copyable variant="enterprise" lineNumbers>
{`-- Monthly revenue and growth analysis
WITH monthly_stats AS (
    SELECT 
        DATE_TRUNC('month', created_at) AS month,
        COUNT(*) AS total_orders,
        SUM(total_amount) AS revenue,
        AVG(total_amount) AS avg_order_value
    FROM orders 
    WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)
    GROUP BY DATE_TRUNC('month', created_at)
),
growth_calculation AS (
    SELECT 
        month,
        total_orders,
        revenue,
        avg_order_value,
        LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
        (revenue - LAG(revenue) OVER (ORDER BY month)) / 
        NULLIF(LAG(revenue) OVER (ORDER BY month), 0) * 100 AS growth_rate
    FROM monthly_stats
)
SELECT 
    TO_CHAR(month, 'YYYY-MM') AS month,
    total_orders,
    ROUND(revenue::numeric, 2) AS revenue,
    ROUND(avg_order_value::numeric, 2) AS avg_order_value,
    ROUND(growth_rate::numeric, 1) || '%' AS growth_rate
FROM growth_calculation 
ORDER BY month;`}
          </Code>
          
          <h4 className="font-medium text-gray-700 mb-3 mt-6">User Analytics</h4>
          <Code block language="sql" copyable variant="enterprise">
{`-- User engagement and retention metrics
SELECT 
    u.id,
    u.email,
    u.created_at AS signup_date,
    COUNT(DISTINCT DATE(l.created_at)) AS active_days,
    MAX(l.created_at) AS last_login,
    CASE 
        WHEN MAX(l.created_at) > CURRENT_DATE - INTERVAL '7 days' 
        THEN 'Active'
        WHEN MAX(l.created_at) > CURRENT_DATE - INTERVAL '30 days' 
        THEN 'At Risk'
        ELSE 'Inactive'
    END AS status
FROM users u
LEFT JOIN login_logs l ON u.id = l.user_id
WHERE u.created_at >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY u.id, u.email, u.created_at
ORDER BY active_days DESC;`}
          </Code>
        </div>
      </section>
    </div>
  ),
};

// Accessibility Showcase
export const AccessibilityShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including proper semantic structure and screen reader support.',
      },
    },
  },
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900">Accessibility Features:</h4>
        <ul className="text-sm text-blue-800 mt-2 list-disc list-inside">
          <li>Semantic HTML structure with proper code elements</li>
          <li>Language specification for syntax highlighting context</li>
          <li>Accessible copy button with proper ARIA labels</li>
          <li>Screen reader friendly code block regions</li>
          <li>High contrast support for code readability</li>
          <li>Keyboard navigation for copy functionality</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Semantic Structure</h4>
          <p className="text-gray-600 mb-2">
            Inline code uses semantic <Code>&lt;code&gt;</Code> elements, while block code 
            uses <Code>&lt;pre&gt;&lt;code&gt;</Code> structure for proper document semantics.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Language Information</h4>
          <Code block language="javascript" copyable>
{`// Language is specified for assistive technologies
function example() {
  console.log("Screen readers can announce this as JavaScript");
}`}
          </Code>
          <p className="text-sm text-gray-600 mt-2">
            The language attribute helps screen readers provide appropriate context.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Copy Button Accessibility</h4>
          <Code block language="typescript" copyable>
{`interface AccessibleComponent {
  ariaLabel: string;
  role: string;
  tabIndex: number;
}`}
          </Code>
          <p className="text-sm text-gray-600 mt-2">
            Copy button includes proper ARIA labels and keyboard support.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Region Labels</h4>
          <Code block language="html" copyable>
{`<!-- Block code includes region role for screen readers -->
<pre role="region" aria-label="Code block">
  <code>Content here</code>
</pre>`}
          </Code>
          <p className="text-sm text-gray-600 mt-2">
            Block code uses region role for proper navigation landmarks.
          </p>
        </div>
      </div>
    </div>
  ),
};