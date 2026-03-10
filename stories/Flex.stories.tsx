import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex } from '../src/components/Box/Box';

const meta = {
  title: 'Components/Flex',
  component: Flex,
  args: {
    direction: 'row',
    align: 'center',
    justify: 'start',
    gap: 'md',
    wrap: false
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    wrap: { control: 'boolean' }
  }
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Flex {...args} style={{ width: 'min(30rem, 90vw)' }}>
      <Box surface padding="md" radius="sm">
        Item 1
      </Box>
      <Box surface padding="md" radius="sm">
        Item 2
      </Box>
      <Box surface padding="md" radius="sm">
        Item 3
      </Box>
    </Flex>
  )
};
