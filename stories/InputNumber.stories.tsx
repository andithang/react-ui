import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputNumber } from '../src/components/InputNumber/InputNumber';

const meta = { title: 'Components/InputNumber', component: InputNumber, args: { label: 'Quantity', min: 0, max: 100, step: 1, controls: true } } satisfies Meta<typeof InputNumber>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<number | null>(2);
    return <InputNumber {...args} value={value ?? undefined} onChange={setValue} />;
  }
};
