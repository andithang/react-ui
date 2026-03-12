import type { Meta, StoryObj } from '@storybook/react';
import { Steps } from '../src/components/Steps/Steps';

const meta = { title: 'Components/Steps', component: Steps, args: { current: 1, direction: 'horizontal' } } satisfies Meta<typeof Steps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { title: 'Finished', description: 'This is a description.' },
      { title: 'In Progress', description: 'This is a description.' },
      { title: 'Waiting', description: 'This is a description.' }
    ]
  }
};
