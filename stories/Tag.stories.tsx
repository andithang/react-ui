import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../src/components/Tag/Tag';
import { useState } from 'react';

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
      console.log('close tag');
    }
  }
};

export const Variants: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Tag variant="filled">Filled</Tag>
        <Tag variant="outlined">Outlined</Tag>
        <Tag variant="solid">Solid</Tag>
        <Tag bordered={false}>Borderless (Deprecated API)</Tag>
      </div>
    );
  }
};

export const ColorsAndIcons: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Tag color="magenta">Magenta</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="#2db7f5">Custom Hex</Tag>
        <Tag icon={<span aria-hidden="true">#</span>}>With Icon</Tag>
        <Tag closable closeIcon={<span aria-hidden="true">x</span>}>
          Custom Close
        </Tag>
      </div>
    );
  }
};

export const LinkAndDisabled: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Tag href="https://ant.design" target="_blank" rel="noreferrer">
          Link Tag
        </Tag>
        <Tag href="https://ant.design" disabled>
          Disabled Link Tag
        </Tag>
        <Tag closable disabled>
          Disabled Closable
        </Tag>
      </div>
    );
  }
};

export const Checkable: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return (
      <Tag.CheckableTag checked={checked} onChange={setChecked}>
        {checked ? 'Checked' : 'Unchecked'}
      </Tag.CheckableTag>
    );
  }
};

export const CheckableGroupSingle: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>('React');

    return (
      <Tag.CheckableTagGroup
        options={['React', 'TypeScript', 'Storybook']}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const CheckableGroupMultiple: Story = {
  render: function Render() {
    const [value, setValue] = useState<Array<string>>(['React']);

    return (
      <Tag.CheckableTagGroup
        multiple
        options={['React', 'TypeScript', 'Storybook']}
        value={value}
        onChange={(nextValue) => {
          if (Array.isArray(nextValue)) {
            setValue(nextValue as string[]);
          }
        }}
      />
    );
  }
};
