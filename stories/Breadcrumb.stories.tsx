import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../src/components/Breadcrumb/Breadcrumb';

const meta = { title: 'Components/Breadcrumb', component: Breadcrumb } satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { title: 'Home', href: '#' },
      { title: 'Application Center', href: '#' },
      { title: 'Application List', href: '#' },
      { title: 'An Application' }
    ]
  }
};
