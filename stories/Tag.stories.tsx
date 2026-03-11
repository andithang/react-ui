import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../src/components/Tag/Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'React'
  }
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Closable: Story = {
  args: {
    closable: true,
    onClose: () => {
      // eslint-disable-next-line no-console
      console.log('close tag');
    }
  }
};
