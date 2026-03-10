import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/Input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    hint: 'We keep your email private.',
    placeholder: 'you@example.com',
    error: ''
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ErrorState: Story = {
  args: {
    error: 'Email is required.'
  }
};
