import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Tooltip } from '../src/components/Tooltip/Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Deploy latest preview',
    position: 'top',
    children: null
  },
  argTypes: {
    position: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] }
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: null
  },
  render: ({ children: _children, ...args }) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  )
};
