import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.mdx"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions", 
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Ensure proper handling of ESM modules
    config.resolve = config.resolve || {};
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.mts'],
    };

    // Optimize chunk splitting for better loading
    config.optimization = config.optimization || {};
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
        radix: {
          test: /[\\/]node_modules[\\/]@radix-ui/,
          name: 'radix-ui',
          chunks: 'all',
          enforce: true,
        },
        lucide: {
          test: /[\\/]node_modules[\\/]lucide-react/,
          name: 'lucide-react',
          chunks: 'all',
          enforce: true,
        },
      },
    };

    return config;
  },
};

export default config;