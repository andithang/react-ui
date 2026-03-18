import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../src/components/Divider/Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div>
      <span>Section A</span>
      <Divider />
      <span>Section B</span>
      <Divider dashed>Dashed Divider</Divider>
      <span>Section C</span>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div>
      Text <Divider type="vertical" /> Link <Divider type="vertical" dashed /> Action
    </div>
  )
};
