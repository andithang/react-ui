import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src/components/Skeleton/Skeleton';

const meta = { title: 'Components/Skeleton', component: Skeleton, args: { active: true, avatar: true } } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
