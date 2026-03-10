import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitch } from '../src/components/ThemeSwitch/ThemeSwitch';

const meta = {
  title: 'Components/ThemeSwitch',
  component: ThemeSwitch,
  args: {
    label: 'Dark mode'
  }
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
