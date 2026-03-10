import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../src/components/Select/Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Role',
    hint: 'Choose one role.',
    error: '',
    defaultValue: 'frontend'
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
  )
};

export const ErrorState: Story = {
  args: {
    error: 'Please select a role.'
  },
  render: (args) => (
    <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
  )
};
