import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../src/components/Box/Box';
import { Checkbox } from '../src/components/Checkbox/Checkbox';
import { Input } from '../src/components/Input/Input';
import { Radio } from '../src/components/Radio/Radio';
import { Select } from '../src/components/Select/Select';
import { Switch } from '../src/components/Switch/Switch';
import { Textarea } from '../src/components/Textarea/Textarea';

const meta = {
  title: 'Components/Inputs'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {
  render: () => (
    <Flex direction="column" gap="lg" style={{ minWidth: '20rem' }}>
      <Input label="Email" placeholder="you@example.com" hint="We keep your email private." />
      <Select label="Role" defaultValue="frontend">
        <option value="frontend">Frontend Engineer</option>
        <option value="backend">Backend Engineer</option>
        <option value="design">Product Designer</option>
      </Select>
      <Textarea label="Description" placeholder="Short project note" />
      <Checkbox label="Enable notifications" hint="You can disable this later." />
      <Flex gap="lg">
        <Radio name="size" value="sm" label="Small" defaultChecked />
        <Radio name="size" value="md" label="Medium" />
      </Flex>
      <Switch label="Use compact mode" defaultChecked />
    </Flex>
  )
};
