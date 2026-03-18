import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../src/components/Progress/Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    percent: 65
  }
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {};

export const Steps: Story = {
  args: {
    percent: 60,
    steps: 8
  }
};

export const Circle: Story = {
  args: {
    type: 'circle',
    percent: 72,
    width: 100
  }
};

export const Dashboard: Story = {
  args: {
    type: 'dashboard',
    percent: 80,
    status: 'active'
  }
};
