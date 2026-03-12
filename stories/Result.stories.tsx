import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Result } from '../src/components/Result/Result';

const meta = { title: 'Components/Result', component: Result, args: { status: 'success', title: 'Successfully Purchased Cloud Server ECS', subTitle: 'Order no: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.' } } satisfies Meta<typeof Result>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { extra: <Button>Go Console</Button> } };
