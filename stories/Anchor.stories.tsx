import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from '../src/components/Anchor/Anchor';

const meta = {
  title: 'Components/Anchor',
  component: Anchor
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '14rem 1fr', gap: '1rem' }}>
      <Anchor {...args} />
      <div style={{ display: 'grid', gap: '6rem' }}>
        <section id="part-1" style={{ minHeight: '40vh' }}>Section 1 content</section>
        <section id="part-2" style={{ minHeight: '40vh' }}>Section 2 content</section>
        <section id="part-3" style={{ minHeight: '40vh' }}>Section 3 content</section>
      </div>
    </div>
  ),
  args: {
    offsetTop: 16,
    items: [
      { key: '1', href: '#part-1', title: 'Part 1' },
      { key: '2', href: '#part-2', title: 'Part 2' },
      { key: '3', href: '#part-3', title: 'Part 3' }
    ]
  }
};
