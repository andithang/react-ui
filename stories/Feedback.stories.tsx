import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../src/components/Box/Box';
import { Spinner } from '../src/components/Spinner/Spinner';
import { Tooltip } from '../src/components/Tooltip/Tooltip';
import { Button } from '../src/components/Button/Button';

const meta = {
  title: 'Components/Feedback'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingAndTooltips: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Spinner />
      <Tooltip content="Deploy latest preview">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </Flex>
  )
};
