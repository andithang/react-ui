import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import dayjs, { type Dayjs } from 'dayjs';
import { DatePicker } from '../src/components/DatePicker/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
    allowClear: true,
    format: 'YYYY-MM-DD',
    placeholder: 'Select date',
    picker: 'date',
    size: 'middle'
  },
  argTypes: {
    picker: { control: 'select', options: ['date', 'week', 'month', 'quarter', 'year'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    status: { control: 'select', options: [undefined, 'warning', 'error'] },
    variant: { control: 'select', options: [undefined, 'outlined', 'borderless', 'filled', 'underlined'] },
    value: { control: false },
    defaultValue: { control: false },
    disabledDate: { control: false },
    presets: { control: false },
    showTime: { control: 'boolean' },
    onChange: { action: 'change' },
    onOpenChange: { action: 'openChange' }
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Dayjs | null>(dayjs('2026-03-12'));

    return (
      <DatePicker
        {...args}
        value={value}
        onChange={(nextValue, dateString) => {
          setValue(nextValue as Dayjs | null);
          args.onChange?.(nextValue as never, dateString as never);
        }}
      />
    );
  }
};

export const WithTime: Story = {
  args: {
    format: 'YYYY-MM-DD HH:mm:ss',
    showTime: true
  },
  render: Basic.render
};

export const MonthPicker: Story = {
  args: {
    format: 'YYYY-MM',
    picker: 'month'
  },
  render: Basic.render
};

export const DisabledDate: Story = {
  args: {
    disabledDate: (current) => current.isBefore(dayjs().startOf('day'))
  },
  render: Basic.render
};

export const WithPresets: Story = {
  args: {
    presets: [
      { label: 'Today', value: dayjs() },
      { label: 'Tomorrow', value: dayjs().add(1, 'day') },
      { label: 'End of Month', value: dayjs().endOf('month') }
    ]
  },
  render: Basic.render
};

export const RangePicker: Story = {
  render: () => (
    <DatePicker.RangePicker
      allowClear
      format="YYYY-MM-DD"
      presets={[
        { label: 'This Week', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
        { label: 'This Month', value: [dayjs().startOf('month'), dayjs().endOf('month')] }
      ]}
    />
  )
};

export const ControlledOpen: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <DatePicker
        {...args}
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          args.onOpenChange?.(nextOpen);
        }}
      />
    );
  }
};
