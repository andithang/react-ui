import type { Meta, StoryObj } from '@storybook/react';
import { Table, type TableColumnType } from '../src/components/Table/Table';
import { Button } from '../src/components/Button/Button';
import { Tag } from '../src/components/Tag/Tag';

type UserRecord = {
  key: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  age: number;
  action: string;
};

const records: UserRecord[] = [
  { key: '1', name: 'Jane Cooper', email: 'jane@company.com', role: 'Admin', status: 'Active', age: 34, action: 'edit' },
  { key: '2', name: 'Arlene McCoy', email: 'arlene@company.com', role: 'Editor', status: 'Active', age: 29, action: 'edit' },
  { key: '3', name: 'Ronald Richards', email: 'ronald@company.com', role: 'Viewer', status: 'Inactive', age: 42, action: 'edit' },
  { key: '4', name: 'Cameron Williamson', email: 'cameron@company.com', role: 'Viewer', status: 'Active', age: 25, action: 'edit' },
  { key: '5', name: 'Savannah Nguyen', email: 'savannah@company.com', role: 'Editor', status: 'Inactive', age: 31, action: 'edit' },
  { key: '6', name: 'Wade Warren', email: 'wade@company.com', role: 'Admin', status: 'Active', age: 38, action: 'edit' }
];

const columns: Array<TableColumnType<UserRecord>> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    ellipsis: true
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    filters: [
      { text: 'Admin', value: 'Admin' },
      { text: 'Editor', value: 'Editor' },
      { text: 'Viewer', value: 'Viewer' }
    ],
    onFilter: (value, record) => record.role === value,
    render: (value) => <Tag color="blue">{String(value)}</Tag>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => <Tag color={value === 'Active' ? 'green' : 'red'}>{String(value)}</Tag>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    align: 'right',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: () => (
      <Button type="primary" size="small">
        Edit
      </Button>
    )
  }
];

const meta = {
  title: 'Components/Table',
  component: Table<UserRecord>,
  parameters: {
    actions: {
      disable: true
    }
  },
  args: {
    columns,
    dataSource: records,
    pagination: {
      defaultCurrent: 1,
      defaultPageSize: 4,
      showSizeChanger: true
    }
  }
} satisfies Meta<typeof Table<UserRecord>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Bordered: Story = {
  args: {
    bordered: true,
    size: 'large'
  }
};

export const Loading: Story = {
  args: {
    loading: true
  }
};

export const Empty: Story = {
  args: {
    dataSource: [],
    locale: {
      emptyText: 'No users found'
    }
  }
};
