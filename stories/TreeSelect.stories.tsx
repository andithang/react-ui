import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  SHOW_ALL,
  SHOW_CHILD,
  SHOW_PARENT,
  TreeSelect,
  type TreeSelectLabeledValue,
  type TreeSelectOption,
  type TreeSelectValue
} from '../src/components/TreeSelect/TreeSelect';

const treeData: TreeSelectOption[] = [
  {
    title: 'Design',
    value: 'design',
    children: [
      { title: 'Tokens', value: 'design-tokens' },
      { title: 'Typography', value: 'design-type' }
    ]
  },
  {
    title: 'Frontend',
    value: 'frontend',
    children: [
      { title: 'Components', value: 'frontend-components' },
      { title: 'Storybook', value: 'frontend-storybook' }
    ]
  },
  {
    title: 'Backend',
    value: 'backend',
    disabled: true,
    children: [{ title: 'API', value: 'backend-api' }]
  }
];

const meta = {
  title: 'Components/TreeSelect',
  component: TreeSelect,
  args: {
    style: { width: 340 },
    treeData,
    allowClear: true,
    placeholder: 'Please select'
  }
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>();

    return (
      <TreeSelect
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
        }}
      />
    );
  }
};

export const MultipleCheckable: Story = {
  args: {
    multiple: true,
    treeCheckable: true,
    showSearch: true
  },
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>(['design-tokens']);

    return (
      <TreeSelect
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
        }}
      />
    );
  }
};

export const LabelInValue: Story = {
  args: {
    multiple: true,
    labelInValue: true,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT
  },
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>([
      {
        value: 'frontend-components',
        label: 'Components'
      } as TreeSelectLabeledValue
    ]);

    return (
      <TreeSelect
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
        }}
      />
    );
  }
};

export const CheckedStrategies: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>(['design', 'design-tokens', 'design-type']);

    return (
      <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
        <TreeSelect {...args} treeCheckable multiple showCheckedStrategy={SHOW_CHILD} value={value} onChange={setValue} />
        <TreeSelect {...args} treeCheckable multiple showCheckedStrategy={SHOW_PARENT} value={value} onChange={setValue} />
        <TreeSelect {...args} treeCheckable multiple showCheckedStrategy={SHOW_ALL} value={value} onChange={setValue} />
      </div>
    );
  }
};

export const SimpleModeData: Story = {
  args: {
    treeDataSimpleMode: true,
    treeData: [
      { id: 1, pId: 0, value: '1', title: 'Parent 1' },
      { id: 2, pId: 1, value: '1-1', title: 'Child 1-1' },
      { id: 3, pId: 1, value: '1-2', title: 'Child 1-2' },
      { id: 4, pId: 0, value: '2', title: 'Parent 2' }
    ] as TreeSelectOption[]
  },
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>();
    return <TreeSelect {...args} value={value} onChange={setValue} />;
  }
};
