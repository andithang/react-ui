import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../src/components/Textarea/Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    label: 'Description',
    hint: 'Provide a short summary.',
    placeholder: 'Type your description',
    error: ''
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ErrorState: Story = {
  args: {
    error: 'Description is required.'
  }
};
