import type { Meta, StoryObj } from '@storybook/react';
import { AutoComplete } from '../src/components/AutoComplete/AutoComplete';

const meta = {
  title: 'Components/AutoComplete',
  component: AutoComplete
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Search users',
    placeholder: 'Type a name',
    options: [
      { value: 'Alice' },
      { value: 'Bob' },
      { value: 'Charlie' },
      { value: 'David' }
    ]
  }
};
