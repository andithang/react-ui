import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components/Checkbox/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Enable notifications',
    hint: 'You can disable this later.',
    defaultChecked: false,
    disabled: false
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
