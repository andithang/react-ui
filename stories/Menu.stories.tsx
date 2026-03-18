import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '../src/components/Menu/Menu';

const meta = {
  title: 'Components/Menu',
  component: Menu
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    items: [
      { key: 'mail', label: 'Navigation One' },
      { key: 'app', label: 'Navigation Two' },
      {
        key: 'sub1',
        label: 'Navigation Three',
        children: [
          { key: 'sub1-1', label: 'Option 1' },
          { key: 'sub1-2', label: 'Option 2' }
        ]
      },
      { type: 'divider' },
      { key: 'danger', label: 'Delete', danger: true }
    ],
    defaultSelectedKeys: ['mail'],
    defaultOpenKeys: ['sub1']
  }
};

export const Horizontal: Story = {
  args: {
    mode: 'horizontal',
    items: [
      { key: 'home', label: 'Home' },
      { key: 'products', label: 'Products' },
      { key: 'pricing', label: 'Pricing' }
    ],
    defaultSelectedKeys: ['products']
  }
};
