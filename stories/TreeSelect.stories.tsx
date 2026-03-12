import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeSelect } from '../src/components/TreeSelect/TreeSelect';

const treeData = [
  { title: 'Node1', value: '0-0', children: [{ title: 'Child Node1', value: '0-0-1' }] },
  { title: 'Node2', value: '0-1' }
];

const meta = { title: 'Components/TreeSelect', component: TreeSelect, args: { treeData, multiple: true, treeCheckable: true } } satisfies Meta<typeof TreeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return <TreeSelect {...args} value={value} onChange={(next) => setValue(Array.isArray(next) ? next : [next])} />;
  }
};
