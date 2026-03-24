import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, CustomProTable, type SortType } from '../src';

type DemoRow = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
};

const meta: Meta<typeof CustomProTable> = {
  title: 'Data Display/CustomProTable',
  component: CustomProTable
};

export default meta;
type Story = StoryObj<typeof meta>;

function DemoCustomProTableStory() {
  const [query, setQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const rows: DemoRow[] = [
    { id: '1', name: 'Alpha', status: 'active' },
    { id: '2', name: 'Beta', status: 'inactive' }
  ];

  return (
    <CustomProTable<DemoRow, DemoRow['status'], { status: string }>
      vtsTableTitle="Custom Pro Table"
      data={rows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase()))}
      columns={{
        cols: [
          { title: 'Name', useField: 'name', sort: true },
          { title: 'Status', useField: 'status', typeRender: 'tag' }
        ],
        onSort: (_sort: SortType | null, key: string) => {
          console.log('sort', key);
        }
      }}
      statusOptions={{
        statusKey: 'status',
        stages: [
          { value: 'active', text: 'Active', preset: 'success' },
          { value: 'inactive', text: 'Inactive', preset: 'warning' }
        ]
      }}
      actionOptions={{
        actions: [{ type: 'icon', icon: 'editOutline', eventName: 'edit' }],
        onClick: (eventName, item) => {
          console.log(eventName, item);
        }
      }}
      pagingParams={{
        searchKey: query,
        pageIndex,
        pageSize,
        total: rows.length,
        onChangePagingParams: (value, key) => {
          if (key === 'search') setQuery(String(value));
          if (key === 'pageIndex') setPageIndex(Number(value));
          if (key === 'pageSize') setPageSize(Number(value));
          if (key === 'pageIndexAndSize' && typeof value === 'object') {
            setPageIndex(value.pageIndex);
            setPageSize(value.pageSize);
          }
        }
      }}
      vtsShowCheckbox
      moreTableButtonsConfig={<Button size="small">Custom</Button>}
    />
  );
}

export const Basic: Story = {
  render: () => <DemoCustomProTableStory />
};
