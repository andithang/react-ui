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

export const WithPrefixTitle: Story = {
  args: {
    prefixTitle: 'Role:'
  },
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

export const MultipleWithSelectAll: Story = {
  args: {
    label: 'Skills',
    multiple: true,
    enableSelectAll: true,
    selectAllValue: -1,
    maxSelectedItemsShown: 1,
    defaultValue: ['react']
  },
  render: (args) => (
    <Select {...args}>
      <optgroup label="Frontend">
        <option value="react">React</option>
        <option value="typescript">TypeScript</option>
      </optgroup>
      <optgroup label="Tools">
        <option value="storybook">Storybook</option>
        <option value="a11y" disabled>
          Accessibility (disabled)
        </option>
      </optgroup>
    </Select>
  )
};

export const InfiniteScrollHook: Story = {
  args: {
    label: 'Data source',
    multiple: true,
    onScrollToLoad: () => {
      console.log('load more options...');
    }
  },
  render: (args) => (
    <Select {...args}>
      {Array.from({ length: 30 }, (_, index) => (
        <option key={index} value={`item-${index + 1}`}>
          Item {index + 1}
        </option>
      ))}
    </Select>
  )
};


export const NotSearchable: Story = {
  args: {
    searchable: false
  },
  render: (args) => (
    <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
  )
};

export const NotClearable: Story = {
  args: {
    clearable: false
  },
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
