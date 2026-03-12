import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Dropdown } from '../src/components/Dropdown/Dropdown';

const meta = { title: 'Components/Dropdown', component: Dropdown } satisfies Meta<typeof Dropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    trigger: ['hover'],
    menu: {
      items: [
        { key: '1', label: '1st menu item' },
        { key: '2', label: '2nd menu item' },
        { key: '3', label: 'Delete', danger: true }
      ]
    },
    children: <Button>Actions</Button>
  },
  render: (args) => <Dropdown {...args}>{args.children}</Dropdown>
};

export const ClickTrigger: Story = {
  args: {
    trigger: ['click'],
    placement: 'bottomRight',
    menu: {
      items: [
        { key: 'profile', label: 'Profile' },
        { key: 'settings', label: 'Settings' },
        { key: 'logout', label: 'Log out', danger: true }
      ]
    },
    children: <Button type="primary">Open menu</Button>
  },
  render: (args) => <Dropdown {...args}>{args.children}</Dropdown>
};

export const WithArrow: Story = {
  args: {
    trigger: ['click'],
    arrow: { pointAtCenter: true },
    placement: 'topCenter',
    menu: {
      items: [
        { key: 'copy', label: 'Copy' },
        { key: 'rename', label: 'Rename' },
        { key: 'archive', label: 'Archive' }
      ]
    },
    children: <Button>Arrow menu</Button>
  },
  render: (args) => <Dropdown {...args}>{args.children}</Dropdown>
};

export const DropdownButtonStory: Story = {
  render: () => (
    <Dropdown.Button
      type="primary"
      trigger={['click']}
      menu={{
        items: [
          { key: 'edit', label: 'Edit' },
          { key: 'duplicate', label: 'Duplicate' },
          { key: 'remove', label: 'Remove', danger: true }
        ]
      }}
    >
      Primary action
    </Dropdown.Button>
  )
};
