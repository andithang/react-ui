import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Grid } from '../src/components/Box/Box';
import { Typography } from '../src/components/Typography/Typography';

const meta = {
  title: 'Components/Layout'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoxFlexGrid: Story = {
  render: () => (
    <Flex direction="column" gap="lg" style={{ width: 'min(46rem, 90vw)' }}>
      <Box surface padding="lg" radius="md">
        <Typography variant="subtitle">Surface Box</Typography>
        <Typography tone="muted">Uses global color, spacing and radius variables.</Typography>
      </Box>
      <Grid columns={3} gap="md">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Box key={idx} surface padding="md" radius="sm">
            Item {idx + 1}
          </Box>
        ))}
      </Grid>
    </Flex>
  )
};
