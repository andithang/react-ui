import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../src/components/TimePicker/TimePicker';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
  args: {
    label: 'Time',
    allowClear: true,
    size: 'middle',
    status: undefined,
    minuteStep: 5,
    secondStep: 5,
    format: 'HH:mm:ss'
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    status: { control: 'select', options: [undefined, 'error', 'warning'] },
    format: { control: 'select', options: ['HH:mm', 'HH:mm:ss', 'h:mm a'] },
    onChange: { action: 'change' },
    onOpenChange: { action: 'openChange' }
  }
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <TimePicker
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

export const TwelveHours: Story = {
  args: {
    use12Hours: true,
    format: 'h:mm a'
  },
  render: Basic.render
};
