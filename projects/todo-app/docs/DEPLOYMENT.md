# Deployment Guide

## Overview

This guide covers deploying the TODO app to various hosting platforms, from development to production environments.

## Build Configuration

### Production Build

The application uses Vite for building and bundling:

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### Build Output

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].js     # Main JavaScript bundle
│   ├── index-[hash].css    # Compiled CSS
│   └── vendor-[hash].js    # Third-party dependencies (if split)
└── vite.svg               # Favicon and assets
```

### Build Optimization

The build process includes:
- **Tree Shaking**: Removes unused code
- **Minification**: Compresses JavaScript and CSS
- **Asset Optimization**: Optimizes images and fonts
- **Cache Busting**: Adds content hashes to filenames

## Environment Configuration

### Environment Variables

Create environment files for different stages:

#### `.env.production`
```bash
VITE_APP_TITLE="Todo App"
VITE_APP_VERSION="1.0.0"
VITE_STORAGE_KEY="todos"
VITE_STORAGE_VERSION="1"
VITE_ENABLE_ERROR_REPORTING="true"
VITE_ENABLE_ANALYTICS="true"
```

#### `.env.staging`
```bash
VITE_APP_TITLE="Todo App (Staging)"
VITE_APP_VERSION="1.0.0-staging"
VITE_STORAGE_KEY="todos-staging"
VITE_STORAGE_VERSION="1"
VITE_ENABLE_ERROR_REPORTING="true"
VITE_ENABLE_ANALYTICS="false"
```

#### `.env.development`
```bash
VITE_APP_TITLE="Todo App (Development)"
VITE_APP_VERSION="1.0.0-dev"
VITE_STORAGE_KEY="todos-dev"
VITE_STORAGE_VERSION="1"
VITE_ENABLE_ERROR_REPORTING="false"
VITE_ENABLE_ANALYTICS="false"
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Target modern browsers
    target: 'es2020',
    
    // Generate sourcemaps for debugging
    sourcemap: true,
    
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['uuid', 'date-fns']
        }
      }
    },
    
    // Asset optimization
    assetsDir: 'assets',
    
    // Build size warnings
    chunkSizeWarningLimit: 1000
  },
  
  server: {
    port: 5173,
    host: true, // Expose to network
    
    // Proxy API requests (if needed)
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  preview: {
    port: 4173,
    host: true
  }
});
```

## Static Hosting Platforms

### 1. Netlify

#### Manual Deployment
1. Build the project: `npm run build`
2. Drag `dist` folder to Netlify dashboard
3. Configure custom domain (optional)

#### Continuous Deployment
Create `netlify.toml`:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

# Redirect all routes to index.html for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'"

# Cache static assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Environment Variables
In Netlify dashboard:
- Go to Site Settings → Environment Variables
- Add production environment variables

### 2. Vercel

#### Manual Deployment
```bash
npm install -g vercel
vercel --prod
```

#### Continuous Deployment
Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Environment Variables
```bash
vercel env add VITE_APP_TITLE production
vercel env add VITE_ENABLE_ERROR_REPORTING production
```

### 3. GitHub Pages

#### GitHub Actions Deployment
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  
  # Allow manual trigger
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run test -- --coverage --watchAll=false
      
    - name: Build
      run: npm run build
      env:
        VITE_APP_TITLE: "Todo App"
        VITE_ENABLE_ERROR_REPORTING: "true"
        
    - name: Setup Pages
      uses: actions/configure-pages@v4
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v3
```

#### Configuration
For GitHub Pages with custom domain, add `CNAME` file to `public/` directory:

```
# public/CNAME
yourdomain.com
```

### 4. AWS S3 + CloudFront

#### S3 Bucket Setup
```bash
# Create S3 bucket
aws s3 mb s3://your-todo-app-bucket

# Upload build files
aws s3 sync dist/ s3://your-todo-app-bucket --delete

# Configure bucket for website hosting
aws s3 website s3://your-todo-app-bucket --index-document index.html --error-document index.html
```

#### CloudFront Distribution
```json
{
  "Origins": [{
    "DomainName": "your-todo-app-bucket.s3-website-region.amazonaws.com",
    "Id": "S3-Website",
    "CustomOriginConfig": {
      "HTTPPort": 80,
      "OriginProtocolPolicy": "http-only"
    }
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-Website",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "optimized-caching"
  },
  "CustomErrorResponses": [{
    "ErrorCode": 404,
    "ResponseCode": 200,
    "ResponsePagePath": "/index.html"
  }]
}
```

#### Deployment Script
```bash
#!/bin/bash
# deploy.sh

set -e

echo "Building application..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://your-todo-app-bucket --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
```

## Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build output to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json;

    server {
        listen 80;
        server_name localhost;

        root /usr/share/nginx/html;
        index index.html;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Handle SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  todo-app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Building and Running
```bash
# Build Docker image
docker build -t todo-app .

# Run container
docker run -p 80:80 todo-app

# Using Docker Compose
docker-compose up -d
```

## Kubernetes Deployment

### Deployment Manifest
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: todo-app
  labels:
    app: todo-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: todo-app
  template:
    metadata:
      labels:
        app: todo-app
    spec:
      containers:
      - name: todo-app
        image: todo-app:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: todo-app-service
spec:
  selector:
    app: todo-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: todo-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - yourdomain.com
    secretName: todo-app-tls
  rules:
  - host: yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: todo-app-service
            port:
              number: 80
```

### Deployment Commands
```bash
# Apply manifests
kubectl apply -f k8s/

# Check deployment status
kubectl rollout status deployment/todo-app

# View pods
kubectl get pods -l app=todo-app

# Check logs
kubectl logs -l app=todo-app

# Update deployment
kubectl set image deployment/todo-app todo-app=todo-app:v1.1.0
```

## Performance Optimization

### Build Performance

#### Vite Optimizations
```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'utils': ['uuid'],
        }
      }
    }
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'uuid']
  }
});
```

#### Bundle Analysis
```bash
# Analyze bundle size
npm install -g rollup-plugin-analyzer
npm run build -- --analyze

# Alternative using bundlephobia
npx bundlephobia analyze package.json
```

### Runtime Performance

#### Service Worker for Caching
```javascript
// public/sw.js
const CACHE_NAME = 'todo-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

Register service worker:
```typescript
// src/main.tsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

## Monitoring and Analytics

### Error Tracking

#### Sentry Integration
```typescript
// src/monitoring/sentry.ts
import * as Sentry from '@sentry/react';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
  });
}

export { Sentry };
```

#### Error Boundary Integration
```typescript
// src/components/ErrorBoundary.tsx
import { Sentry } from '../monitoring/sentry';

componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // Report to Sentry
  Sentry.captureException(error, {
    contexts: {
      react: {
        componentStack: errorInfo.componentStack
      }
    }
  });
}
```

### Performance Monitoring

#### Web Vitals
```typescript
// src/monitoring/vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // Send to your analytics service
  console.log(metric);
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Health Checks

#### Application Health Endpoint
```typescript
// src/utils/health.ts
export const getHealthStatus = () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VITE_APP_VERSION,
    localStorage: {
      available: typeof Storage !== 'undefined',
      used: JSON.stringify(localStorage).length,
      quota: 'unknown' // Browser dependent
    },
    performance: {
      loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart
    }
  };
};
```

## Security Considerations

### Content Security Policy

```html
<!-- In index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  connect-src 'self';
  img-src 'self' data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
">
```

### Security Headers

```nginx
# Additional nginx security headers
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

### Environment Variable Security

```bash
# Never commit sensitive data
.env.local
.env.production.local

# Use build-time environment variables for public data only
VITE_API_URL=https://api.example.com  # ✓ Safe (public)
VITE_SECRET_KEY=secret123             # ✗ Dangerous (exposed)
```

## Troubleshooting Deployment

### Common Issues

#### 404 Errors on Page Refresh
**Problem**: SPA routing not configured on server
**Solution**: Configure server to serve `index.html` for all routes

#### Build Failures
**Problem**: Memory issues during build
**Solution**: 
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### Environment Variables Not Working
**Problem**: Variables not prefixed with `VITE_`
**Solution**: Ensure all client-side variables start with `VITE_`

#### Caching Issues
**Problem**: Users seeing old version
**Solution**: Implement proper cache headers and versioning

```nginx
location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    # Use hash-based filenames from Vite
}

location = /index.html {
    expires -1;
    add_header Cache-Control "no-cache, public, must-revalidate";
}
```

### Debugging Deployment

#### Check Build Output
```bash
# Verify build contents
ls -la dist/
cat dist/index.html | grep -E "(js|css)"

# Test build locally
npx serve dist
```

#### Monitor Deployment
```bash
# Check application status
curl -I https://yourdomain.com

# Test health endpoint
curl https://yourdomain.com/health

# Check response headers
curl -I https://yourdomain.com/assets/index.js
```

This deployment guide provides comprehensive coverage of deploying the TODO app across different platforms and environments, from simple static hosting to enterprise Kubernetes deployments.