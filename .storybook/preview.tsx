import type { Decorator, Preview } from '@storybook/react';
import { ThemeProvider, type ThemeMode } from '../src/theme';
import '../src/styles/index.scss';

const withTheme: Decorator = (Story, context) => {
  const selectedTheme: ThemeMode = context.globals.theme === 'dark' ? 'dark' : 'light';

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }

  return (
    <ThemeProvider key={selectedTheme} defaultTheme={selectedTheme} storageKey="react-ui-storybook-theme">
      <div
        style={{
          minHeight: '100vh',
          padding: '1rem',
          background: 'var(--ui-bg)',
          color: 'var(--ui-text)'
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for all stories',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: ['Docs', 'Foundation', 'Components']
      }
    },
    layout: 'padded'
  }
};

export default preview;
