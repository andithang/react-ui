import { type HTMLAttributes, type KeyboardEvent, type ReactNode, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils';
import './Tabs.scss';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultTabId?: string;
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({
  items,
  defaultTabId,
  activeTabId,
  onTabChange,
  className,
  id,
  ...props
}: TabsProps) {
  const generatedId = useId().replace(/:/g, '');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rootId = id ?? `ui-tabs-${generatedId}`;
  const tabDomId = (tabId: string) => `${rootId}-tab-${tabId.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  const panelDomId = (tabId: string) => `${rootId}-panel-${tabId.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  const [uncontrolledTabId, setUncontrolledTabId] = useState<string | undefined>(() => defaultTabId ?? items[0]?.id);
  const normalizedUncontrolledTabId = items.some((item) => item.id === uncontrolledTabId)
    ? uncontrolledTabId
    : defaultTabId ?? items[0]?.id;
  const selectedTabId = activeTabId ?? normalizedUncontrolledTabId;
  const active = useMemo(() => items.find((item) => item.id === selectedTabId) ?? items[0], [items, selectedTabId]);

  if (!items.length) return null;

  const selectTab = (nextTabId: string) => {
    if (activeTabId === undefined) {
      setUncontrolledTabId(nextTabId);
    }
    onTabChange?.(nextTabId);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % items.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + items.length) % items.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = items.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextItem = items[nextIndex];
    selectTab(nextItem.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={cn('ui-tabs', className)} id={rootId} {...props}>
      <div className="ui-tabs__list" role="tablist">
        {items.map((item, index) => {
          const selected = item.id === active?.id;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              id={tabDomId(item.id)}
              aria-controls={panelDomId(item.id)}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={cn('ui-tabs__tab', selected && 'is-active')}
              onClick={() => selectTab(item.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        className="ui-tabs__panel"
        role="tabpanel"
        id={active ? panelDomId(active.id) : undefined}
        aria-labelledby={active ? tabDomId(active.id) : undefined}
        tabIndex={0}
      >
        {active?.content}
      </div>
    </div>
  );
}
