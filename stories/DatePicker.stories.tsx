import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../src/components/DatePicker/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: { label: 'Date', picker: 'date', allowClear: true }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
