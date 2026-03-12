import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../src/components/Avatar/Avatar';

const meta = { title: 'Components/Avatar', component: Avatar, args: { children: 'U', shape: 'circle', size: 'default' } } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
