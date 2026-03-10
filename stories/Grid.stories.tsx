import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '../src/components/Box/Box';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  args: {
    columns: 3,
    minColumnWidth: '10rem',
    gap: 'md'
  },
  argTypes: {
    columns: { control: { type: 'number', min: 1, max: 6, step: 1 } },
    minColumnWidth: { control: 'text' },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] }
  }
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Grid {...args} style={{ width: 'min(40rem, 90vw)' }}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Box key={idx} surface padding="md" radius="sm">
          Card {idx + 1}
        </Box>
      ))}
    </Grid>
  )
};
