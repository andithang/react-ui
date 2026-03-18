import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../src/components/Button/Button';
import { Drawer } from '../src/components/Drawer/Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          Drawer content area
        </Drawer>
      </>
    );
  },
  args: {
    title: 'Basic Drawer'
  }
};
