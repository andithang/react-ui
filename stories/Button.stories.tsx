import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Icon } from '../src/components/Icon/Icon';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    type: 'default',
    size: 'middle'
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'dashed', 'link', 'text']
    },
    color: {
      control: 'select',
      options: [
        undefined,
        'default',
        'primary',
        'danger',
        'blue',
        'purple',
        'cyan',
        'green',
        'magenta',
        'pink',
        'red',
        'orange',
        'yellow',
        'volcano',
        'geekblue',
        'lime',
        'gold'
      ]
    },
    variant: {
      control: 'select',
      options: [undefined, 'outlined', 'dashed', 'solid', 'filled', 'text', 'link']
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large']
    },
    shape: {
      control: 'select',
      options: ['default', 'circle', 'round', 'square']
    },
    iconPlacement: {
      control: 'inline-radio',
      options: ['start', 'end']
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: 'primary'
  }
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button type="primary">Primary</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button color="primary" variant="outlined">
        Outlined
      </Button>
      <Button color="primary" variant="solid">
        Solid
      </Button>
      <Button color="primary" variant="filled">
        Filled
      </Button>
      <Button color="primary" variant="text">
        Text
      </Button>
      <Button color="primary" variant="link">
        Link
      </Button>
      <Button color="primary" variant="dashed">
        Dashed
      </Button>
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button color="primary" variant="solid">
        Primary
      </Button>
      <Button color="danger" variant="solid">
        Danger
      </Button>
      <Button color="blue" variant="solid">
        Blue
      </Button>
      <Button color="purple" variant="solid">
        Purple
      </Button>
      <Button color="green" variant="solid">
        Green
      </Button>
      <Button color="gold" variant="filled">
        Gold Filled
      </Button>
    </div>
  )
};

export const LoadingAndIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button type="primary" icon={<Icon name="check" />}>
        Save
      </Button>
      <Button type="primary" icon={<Icon name="check" />} iconPlacement="end">
        Save
      </Button>
      <Button type="primary" loading>
        Loading
      </Button>
      <Button type="default" loading={{ delay: 600 }}>
        Delayed Loading
      </Button>
      <Button shape="circle" type="primary" icon={<Icon name="check" />} aria-label="Confirm" />
    </div>
  )
};

export const GhostAndBlock: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', width: '22rem', padding: '1rem', background: '#202733' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button type="primary" ghost>
          Primary Ghost
        </Button>
        <Button color="danger" variant="solid" ghost>
          Danger Ghost
        </Button>
      </div>
      <Button type="primary" block>
        Block Button
      </Button>
    </div>
  )
};

export const AsLink: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button href="https://ant.design" target="_blank" rel="noreferrer">
        Anchor Button
      </Button>
      <Button href="https://ant.design" disabled>
        Disabled Anchor
      </Button>
    </div>
  )
};

export const Group: Story = {
  render: () => (
    <Button.Group>
      <Button>Left</Button>
      <Button type="primary">Middle</Button>
      <Button>Right</Button>
    </Button.Group>
  )
};
