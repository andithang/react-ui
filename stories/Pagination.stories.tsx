import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../src/components/Pagination/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    total: 500,
    defaultCurrent: 6,
    defaultPageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
  }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    size: "default"
  }
};

export const Small: Story = {
  args: {
    size: 'small'
  }
};

export const Simple: Story = {
  args: {
    simple: true,
    showQuickJumper: false,
    showSizeChanger: false
  }
};
