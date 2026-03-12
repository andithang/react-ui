import type { Meta, StoryObj } from '@storybook/react';
import { ICON_NAMES, Icon } from '../src/components/Icon/Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: 'search',
    size: '1em'
  },
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES
    },
    size: { control: { type: 'text' } }
  }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '12px'
      }}
    >
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px',
            border: '1px solid var(--ui-border)',
            borderRadius: '8px'
          }}
        >
          <Icon name={name} size={20} />
          <code>{name}</code>
        </div>
      ))}
    </div>
  )
};
