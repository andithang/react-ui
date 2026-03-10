import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Icon } from '../src/components/Icon/Icon';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Primary Action',
    variant: 'primary'
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
};

export const WithIcon: Story = {
  render: () => <Button leftIcon={<Icon name="check" />}>Save</Button>
};
