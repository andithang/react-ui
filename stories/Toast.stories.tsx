import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Toast } from '../src/components/Toast/Toast';

const meta = { title: 'Components/Toast', component: Toast, args: { type: 'success', message: 'Saved successfully', description: 'Your changes have been published.' } } satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  }
};
