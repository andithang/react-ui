import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Form } from '../src/components/Form/Form';
import { Input } from '../src/components/Input/Input';

const meta = {
  title: 'Components/Form',
  component: Form,
  args: {
    gap: 'md'
  },
  argTypes: {
    gap: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
  }
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Form {...args} style={{ width: 'min(24rem, 90vw)' }} onSubmit={(event) => event.preventDefault()}>
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Name" placeholder="Alex Doe" />
      <Button type="submit">Submit</Button>
    </Form>
  )
};
