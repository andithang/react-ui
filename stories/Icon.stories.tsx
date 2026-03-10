import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../src/components/Icon/Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: 'search',
    size: 24
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['search', 'close', 'check', 'chevronDown', 'info', 'sun', 'moon', 'alert']
    },
    size: { control: { type: 'number', min: 12, max: 64, step: 2 } }
  }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
