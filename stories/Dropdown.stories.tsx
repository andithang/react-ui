import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../src/components/Dropdown/Dropdown';

const meta = { title: 'Components/Dropdown', component: Dropdown } satisfies Meta<typeof Dropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    trigger: 'Actions',
    items: [
      { key: '1', label: '1st menu item' },
      { key: '2', label: '2nd menu item' },
      { key: '3', label: 'Delete', danger: true }
    ]
  }
};
