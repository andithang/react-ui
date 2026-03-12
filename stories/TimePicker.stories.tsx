import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../src/components/TimePicker/TimePicker';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
  args: { label: 'Time', allowClear: true, minuteStep: 5 }
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
