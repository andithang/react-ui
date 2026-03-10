import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../src/components/Spinner/Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {
    size: 24
  },
  argTypes: {
    size: { control: { type: 'number', min: 12, max: 64, step: 2 } }
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
