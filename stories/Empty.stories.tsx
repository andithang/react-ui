import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from '../src/components/Empty/Empty';
import { Button } from '../src/components/Button/Button';

const meta = {
  title: 'Components/Empty',
  component: Empty
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const CustomDescriptionAndAction: Story = {
  args: {
    description: 'No records found',
    children: <Button type="primary">Create</Button>
  }
};

export const SimpleImage: Story = {
  args: {
    image: Empty.PRESENTED_IMAGE_SIMPLE,
    description: 'Nothing here yet'
  }
};
