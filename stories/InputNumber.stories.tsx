import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputNumber } from '../src/components/InputNumber/InputNumber';

const meta = {
  title: 'Components/InputNumber',
  component: InputNumber,
  args: {
    label: 'Quantity',
    min: 0,
    max: 100,
    step: 1,
    controls: true,
    placeholder: 'Enter value'
  }
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: 12,
    hint: 'Uses Ant Design InputNumber props with theme-aware styling.'
  }
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<number | string | null>(2);
    return <InputNumber {...args} value={value ?? undefined} onChange={setValue} />;
  }
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '18rem' }}>
      <InputNumber {...args} size="small" label="Small" defaultValue={3} />
      <InputNumber {...args} size="middle" label="Middle" defaultValue={6} />
      <InputNumber {...args} size="large" label="Large" defaultValue={9} />
    </div>
  ),
  args: {
    controls: true
  }
};

export const Status: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '18rem' }}>
      <InputNumber {...args} label="Warning" status="warning" defaultValue={4} hint="Double-check this value." />
      <InputNumber {...args} label="Error" error="Quantity is required." />
    </div>
  )
};

export const FormatterAndParser: Story = {
  args: {
    label: 'Price',
    defaultValue: 1200,
    min: 0,
    step: 100,
    formatter: (value) => (value ? `$ ${value}` : ''),
    parser: (value) => value?.replace(/\$\s?|(,*)/g, '') ?? ''
  }
};
