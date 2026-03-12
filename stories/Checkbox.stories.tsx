import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Flex } from '../src/components/Box/Box';
import { Checkbox } from '../src/components/Checkbox/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    children: 'Enable notifications',
    defaultChecked: false,
    disabled: false
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Indeterminate: Story = {
  render: () => {
    const options = ['Read', 'Write', 'Deploy'];
    const [value, setValue] = useState<string[]>(['Read']);
    const allChecked = value.length === options.length;
    const isIndeterminate = value.length > 0 && !allChecked;

    return (
      <Flex direction="column" gap="sm">
        <Checkbox
          indeterminate={isIndeterminate}
          checked={allChecked}
          onChange={(event) => {
            setValue(event.target.checked ? options : []);
          }}
        >
          Select all permissions
        </Checkbox>
        <Checkbox.Group
          options={options}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue as string[]);
          }}
        />
      </Flex>
    );
  }
};

export const GroupOptions: Story = {
  render: () => (
    <Checkbox.Group
      defaultValue={['banana']}
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange (disabled)', value: 'orange', disabled: true }
      ]}
    />
  )
};
