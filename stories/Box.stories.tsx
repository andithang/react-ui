import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../src/components/Box/Box';
import { Typography } from '../src/components/Typography/Typography';

const meta = {
  title: 'Components/Box',
  component: Box,
  args: {
    padding: 'lg',
    radius: 'md',
    surface: true
  },
  argTypes: {
    padding: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    surface: { control: 'boolean' }
  }
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Box {...args} style={{ width: '22rem' }}>
      <Typography variant="subtitle">Surface Box</Typography>
      <Typography tone="muted">Container primitive with spacing and radius tokens.</Typography>
    </Box>
  )
};
