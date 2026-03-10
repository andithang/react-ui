import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../src/components/Box/Box';
import { Typography } from '../src/components/Typography/Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  args: {
    as: 'p',
    variant: 'body',
    tone: 'default',
    children: 'Body text tokenized using CSS variables.'
  },
  argTypes: {
    as: { control: 'select', options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'label', 'code'] },
    variant: { control: 'select', options: ['display', 'title', 'subtitle', 'body', 'caption', 'code'] },
    tone: { control: 'select', options: ['default', 'muted', 'primary', 'danger', 'success'] }
  }
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Scale: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ minWidth: '28rem' }}>
      <Typography variant="display">Display Text</Typography>
      <Typography variant="title">Title Text</Typography>
      <Typography variant="subtitle">Subtitle Text</Typography>
      <Typography>Body text tokenized using CSS variables.</Typography>
      <Typography variant="caption" tone="muted">
        Caption text
      </Typography>
      <Typography variant="code">npm run storybook</Typography>
    </Flex>
  )
};
