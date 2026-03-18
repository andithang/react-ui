import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/Badge/Badge';
import { Avatar } from '../src/components/Avatar/Avatar';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    count: 5
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Badge {...args}>
      <Avatar>U</Avatar>
    </Badge>
  )
};

export const DotAndStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Badge dot>
        <Avatar>A</Avatar>
      </Badge>
      <Badge status="processing" text="Processing" />
      <Badge status="error" text="Error" />
      <Badge color="#722ed1" text="Custom" />
    </div>
  )
};

export const Ribbon: Story = {
  render: () => (
    <Badge.Ribbon text="New" color="#e03">
      <div style={{ width: 240, height: 120, border: '1px solid var(--ui-border)', borderRadius: 'var(--ui-radius-sm)' }} />
    </Badge.Ribbon>
  )
};
