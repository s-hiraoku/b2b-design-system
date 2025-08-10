import type { Preview } from '@storybook/nextjs';
import React from 'react';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        'div',
        {
          style: {
            background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(15, 23, 42) 100%)',
            minHeight: '100vh',
            padding: '2rem',
            color: 'white'
          }
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;