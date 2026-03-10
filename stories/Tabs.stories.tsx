import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from '../src/components/Tabs/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTabs: Story = {
  args: {
    items: [
      { id: 'one', label: 'Overview', content: 'This is the overview tab content.' },
      { id: 'two', label: 'Usage', content: 'This tab shows usage guidance.' },
      { id: 'three', label: 'Tokens', content: 'Everything is powered by CSS variables.' }
    ]
  }
};

export const ControlledTabs: Story = {
  args: {
    items: []
  },
  render: () => {
    const [activeTabId, setActiveTabId] = useState('one');

    return (
      <Tabs
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        items={[
          { id: 'one', label: 'Overview', content: `Controlled tab: ${activeTabId}` },
          { id: 'two', label: 'Usage', content: 'This tab is controlled by story state.' },
          { id: 'three', label: 'Tokens', content: 'Primary-driven state styling is applied.' }
        ]}
      />
    );
  }
};
