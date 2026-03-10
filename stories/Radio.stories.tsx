import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../src/components/Radio/Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    name: 'size',
    value: 'md',
    label: 'Medium',
    defaultChecked: false,
    disabled: false
  }
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
