import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../src/components/Modal/Modal';
import { Typography } from '../src/components/Typography/Typography';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    open: true,
    title: 'Release checklist',
    onClose: () => undefined,
    children: null
  },
  argTypes: {
    onClose: { action: 'closed' }
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicModal: Story = {
  args: {
    onClose: () => undefined,
    children: null
  },
  render: (args) => (
    <Modal {...args}>
      <Typography>Run build, review docs, publish package.</Typography>
    </Modal>
  )
};
