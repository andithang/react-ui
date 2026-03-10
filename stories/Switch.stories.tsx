import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components/Switch/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    label: 'Use compact mode',
    defaultChecked: true,
    disabled: false
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
