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

export const Multiple: Story = {
  args: {
    label: 'Skills',
    hint: 'Choose one or more skills.',
    multiple: true,
    defaultValue: ['react', 'typescript']
  },
  render: (args) => (
    <Select {...args}>
      <option value="react">React</option>
      <option value="typescript">TypeScript</option>
      <option value="storybook">Storybook</option>
      <option value="a11y">Accessibility</option>
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
