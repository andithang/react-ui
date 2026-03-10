import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex } from '../src/components/Box/Box';
import { ThemeSwitch } from '../src/components/ThemeSwitch/ThemeSwitch';
import { Typography } from '../src/components/Typography/Typography';

const meta = {
  title: 'Foundation/Theming'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeTokens: Story = {
  render: () => (
    <Flex direction="column" gap="lg" style={{ width: 'min(44rem, 90vw)' }}>
      <ThemeSwitch />
      <Flex gap="md">
        <Box surface padding="lg" radius="md" style={{ width: '100%' }}>
          <Typography variant="subtitle">Surface token</Typography>
          <Typography tone="muted">Driven by `--ui-surface` + `--ui-text`.</Typography>
        </Box>
        <Box
          padding="lg"
          radius="md"
          style={{ width: '100%', background: 'var(--ui-primary)', color: 'var(--ui-primary-contrast)' }}
        >
          <Typography variant="subtitle" style={{ color: 'inherit' }}>
            Brand token
          </Typography>
          <Typography style={{ color: 'inherit' }}>Driven by `--ui-primary` variables.</Typography>
        </Box>
      </Flex>
    </Flex>
  )
};
