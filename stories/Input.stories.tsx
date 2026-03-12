import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../src/components/Icon/Icon';
import { Input } from '../src/components/Input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    hint: 'We keep your email private.',
    placeholder: 'you@example.com'
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ErrorState: Story = {
  args: {
    error: 'Email is required.'
  }
};

export const AllowClear: Story = {
  args: {
    label: 'Search',
    defaultValue: 'storybook',
    allowClear: true
  }
};

export const PrefixAndSuffix: Story = {
  args: {
    label: 'Amount',
    prefix: '$',
    suffix: 'USD',
    placeholder: '0.00'
  }
};

export const Addons: Story = {
  args: {
    label: 'Website',
    addonBefore: 'https://',
    addonAfter: '.com',
    placeholder: 'my-site'
  }
};

export const ShowCount: Story = {
  args: {
    label: 'Username',
    maxLength: 24,
    showCount: true,
    defaultValue: 'andithang'
  }
};

export const WarningStatus: Story = {
  args: {
    label: 'Display Name',
    status: 'warning',
    hint: 'Use 3 to 24 characters.',
    defaultValue: 'ab'
  }
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '28rem' }}>
      <Input {...args} variant="outlined" placeholder="Outlined" />
      <Input {...args} variant="filled" placeholder="Filled" />
      <Input {...args} variant="underlined" placeholder="Underlined" />
      <Input {...args} variant="borderless" placeholder="Borderless" />
    </div>
  ),
  args: {
    label: 'Variant'
  }
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '28rem' }}>
      <Input {...args} size="small" placeholder="Small" />
      <Input {...args} size="middle" placeholder="Middle" />
      <Input {...args} size="large" placeholder="Large" />
    </div>
  ),
  args: {
    label: 'Size'
  }
};

export const CustomClearIcon: Story = {
  args: {
    label: 'Filter',
    defaultValue: 'active',
    allowClear: {
      clearIcon: <Icon name="close" size={12} />
    }
  }
};
