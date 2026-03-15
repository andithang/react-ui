import { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ICON_NAMES, ICON_NAMES_BY_SOURCE, Icon } from '../src/components/Icon/Icon';

const INITIAL_VISIBLE_ICONS = 100;
const LOAD_MORE_STEP = 100;

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: ICON_NAMES[0] ?? 'search',
    size: '1em'
  },
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES
    },
    size: { control: { type: 'text' } }
  }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

function renderFamilyPage(title: string, names: readonly string[]) {
  return function FamilyPage({ name, size }: { name: string; size?: string | number }) {
    const [query, setQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ICONS);
    const normalizedQuery = query.trim().toLowerCase();
    const filteredIcons = useMemo(
      () =>
        normalizedQuery
          ? names.filter((iconName) => iconName.toLowerCase().includes(normalizedQuery))
          : names,
      [names, normalizedQuery]
    );
    const visibleIcons = filteredIcons.slice(0, visibleCount);
    const hasMore = visibleCount < filteredIcons.length;

    useEffect(() => {
      setVisibleCount(INITIAL_VISIBLE_ICONS);
    }, [normalizedQuery]);

    return (
      <div style={{ display: 'grid', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            border: '1px solid var(--ui-border)',
            borderRadius: '8px'
          }}
        >
          <Icon name={name} size={size ?? '1em'} />
          <code>{name}</code>
        </div>
        <div
          style={{
            padding: '12px',
            border: '1px solid var(--ui-border)',
            borderRadius: '8px'
          }}
        >
          <h4 style={{ margin: 0, marginBottom: '12px' }}>
            {title} ({visibleIcons.length}/{filteredIcons.length} matches, {names.length} total)
          </h4>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="search"
              value={query}
              placeholder="Search icon names"
              onChange={(event) => setQuery(event.target.value)}
              style={{
                width: '100%',
                maxWidth: '320px',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid var(--ui-border)',
                background: 'var(--ui-bg)',
                color: 'var(--ui-text)'
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '10px'
            }}
          >
            {visibleIcons.map((iconName) => (
              <div
                key={iconName}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  border: '1px solid var(--ui-border)',
                  borderRadius: '6px'
                }}
              >
                <Icon name={iconName} size={20} />
                <code>{iconName}</code>
              </div>
            ))}
          </div>
          {filteredIcons.length === 0 ? (
            <div style={{ marginTop: '12px' }}>No icons found.</div>
          ) : null}
          {hasMore ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredIcons.length))}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ui-border)',
                  background: 'var(--ui-bg)',
                  color: 'var(--ui-text)',
                  cursor: 'pointer'
                }}
              >
                Load more ({Math.min(LOAD_MORE_STEP, filteredIcons.length - visibleCount)})
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
}

function familyNameControl(names: readonly string[]) {
  return {
    name: {
      control: 'select',
      options: names
    }
  } as const;
}

export const AntDesign: Story = {
  args: {
    name: ICON_NAMES_BY_SOURCE.antd[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.antd),
  render: renderFamilyPage('Ant Design', ICON_NAMES_BY_SOURCE.antd)
};

export const Bootstrap: Story = {
  args: {
    name: ICON_NAMES_BY_SOURCE.bootstrap[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.bootstrap),
  render: renderFamilyPage('Bootstrap', ICON_NAMES_BY_SOURCE.bootstrap)
};

export const FontAwesome: Story = {
  args: {
    name: ICON_NAMES_BY_SOURCE.fontAwesome[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.fontAwesome),
  render: renderFamilyPage('Font Awesome', ICON_NAMES_BY_SOURCE.fontAwesome)
};

export const Material: Story = {
  args: {
    name: ICON_NAMES_BY_SOURCE.material[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.material),
  render: renderFamilyPage('Material', ICON_NAMES_BY_SOURCE.material)
};

export const VT: Story = {
  args: {
    name: ICON_NAMES_BY_SOURCE.vt[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.vt),
  render: renderFamilyPage('VT', ICON_NAMES_BY_SOURCE.vt)
};
