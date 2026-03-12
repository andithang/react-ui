import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../src/components/DatePicker/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
    label: 'Date',
    picker: 'date',
    allowClear: true,
    size: 'middle',
    status: undefined,
    placeholder: 'Select date',
    format: 'YYYY-MM-DD'
  },
  argTypes: {
    picker: { control: 'select', options: ['date', 'month', 'year'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    status: { control: 'select', options: [undefined, 'error', 'warning'] },
    format: { control: 'text' },
    disabledDate: { control: false },
    onChange: { action: 'change' },
    onOpenChange: { action: 'openChange' }
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <DatePicker
        {...args}
        value={value}
        onChange={(next, nextString) => {
          setValue(next);
          args.onChange?.(next, nextString);
        }}
      />
    );
  }
};

export const WithDisabledDates: Story = {
  args: {
    disabledDate: (date) => date < new Date(new Date().setHours(0, 0, 0, 0))
  },
  render: Basic.render
};
