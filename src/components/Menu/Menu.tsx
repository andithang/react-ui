import { useMemo, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Menu.scss';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';
export type MenuTheme = 'light' | 'dark';

export interface MenuItemType {
  key: string;
  label?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export interface MenuItemGroupType {
  type: 'group';
  key?: string;
  label?: ReactNode;
  children?: ItemType[];
}

export interface MenuDividerType {
  type: 'divider';
  key?: string;
  dashed?: boolean;
}

export interface SubMenuType extends Omit<MenuItemType, 'onClick'> {
  children: ItemType[];
}

export type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType | null;

export interface MenuInfo {
  key: string;
  keyPath: string[];
  item: ItemType;
  domEvent?: React.MouseEvent<HTMLButtonElement>;
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onClick'> {
  items?: ItemType[];
  mode?: MenuMode;
  theme?: MenuTheme;
  selectable?: boolean;
  multiple?: boolean;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  inlineCollapsed?: boolean;
  disabled?: boolean;
  triggerSubMenuAction?: 'hover' | 'click';
  expandIcon?: ReactNode;
  onClick?: (info: MenuInfo) => void;
  onSelect?: (info: MenuInfo) => void;
  onDeselect?: (info: MenuInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
}

function isDivider(item: ItemType): item is MenuDividerType {
  return Boolean(item && typeof item === 'object' && 'type' in item && item.type === 'divider');
}

function isGroup(item: ItemType): item is MenuItemGroupType {
  return Boolean(item && typeof item === 'object' && 'type' in item && item.type === 'group');
}

function isSubMenu(item: ItemType): item is SubMenuType {
  return Boolean(item && typeof item === 'object' && 'children' in item && Array.isArray(item.children));
}

export function Menu({
  items = [],
  mode = 'vertical',
  theme = 'light',
  selectable = true,
  multiple = false,
  selectedKeys,
  defaultSelectedKeys,
  openKeys,
  defaultOpenKeys,
  inlineCollapsed,
  disabled,
  triggerSubMenuAction = 'click',
  expandIcon,
  onClick,
  onSelect,
  onDeselect,
  onOpenChange,
  className,
  ...props
}: MenuProps) {
  const [innerSelectedKeys, setInnerSelectedKeys] = useState<string[]>(defaultSelectedKeys ?? []);
  const [innerOpenKeys, setInnerOpenKeys] = useState<string[]>(defaultOpenKeys ?? []);

  const mergedSelectedKeys = selectedKeys ?? innerSelectedKeys;
  const mergedOpenKeys = openKeys ?? innerOpenKeys;

  const nestedKeySet = useMemo(() => new Set(mergedSelectedKeys), [mergedSelectedKeys]);

  const setOpenState = (nextOpenKeys: string[]) => {
    if (!openKeys) {
      setInnerOpenKeys(nextOpenKeys);
    }

    onOpenChange?.(nextOpenKeys);
  };

  const setSelectedState = (nextKeys: string[], info: MenuInfo) => {
    if (!selectedKeys) {
      setInnerSelectedKeys(nextKeys);
    }

    if (selectable) {
      if (nextKeys.includes(info.key)) {
        onSelect?.(info);
      } else {
        onDeselect?.(info);
      }
    }
  };

  const toggleOpen = (key: string) => {
    const nextOpenKeys = mergedOpenKeys.includes(key) ? mergedOpenKeys.filter((openKey) => openKey !== key) : [...mergedOpenKeys, key];
    setOpenState(nextOpenKeys);
  };

  const handleItemClick = (item: MenuItemType, keyPath: string[], event?: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || item.disabled) {
      return;
    }

    const nextKeys = !selectable
      ? mergedSelectedKeys
      : multiple
        ? nestedKeySet.has(item.key)
          ? mergedSelectedKeys.filter((key) => key !== item.key)
          : [...mergedSelectedKeys, item.key]
        : [item.key];

    const info: MenuInfo = {
      key: item.key,
      keyPath,
      item,
      domEvent: event
    };

    if (selectable) {
      setSelectedState(nextKeys, info);
    }

    item.onClick?.();
    onClick?.(info);
  };

  const renderItems = (menuItems: ItemType[], keyPath: string[] = []): ReactNode =>
    menuItems.map((item, index) => {
      if (!item) {
        return null;
      }

      if (isDivider(item)) {
        return <li key={item.key ?? `divider-${index}`} className={cn('ui-menu__divider', item.dashed && 'ui-menu__divider--dashed')} />;
      }

      if (isGroup(item)) {
        return (
          <li key={item.key ?? `group-${index}`} className="ui-menu__group">
            {item.label ? <div className="ui-menu__group-title">{item.label}</div> : null}
            <ul className="ui-menu__group-list">{renderItems(item.children ?? [], keyPath)}</ul>
          </li>
        );
      }

      if (isSubMenu(item)) {
        const currentPath = [item.key, ...keyPath];
        const opened = mergedOpenKeys.includes(item.key);

        return (
          <li key={item.key} className={cn('ui-menu__submenu', opened && 'is-open')}>
            <button
              type="button"
              className={cn('ui-menu__item', 'ui-menu__submenu-trigger', item.className)}
              style={item.style}
              onClick={() => {
                if (triggerSubMenuAction === 'click') {
                  toggleOpen(item.key);
                }
              }}
              onMouseEnter={() => {
                if (triggerSubMenuAction === 'hover' && !mergedOpenKeys.includes(item.key)) {
                  setOpenState([...mergedOpenKeys, item.key]);
                }
              }}
              title={item.title}
              disabled={disabled || item.disabled}
            >
              <span className="ui-menu__item-content">
                {item.icon ? <span className="ui-menu__icon">{item.icon}</span> : null}
                <span>{item.label}</span>
              </span>
              <span className="ui-menu__expand">{expandIcon ?? '▾'}</span>
            </button>
            {(opened || mode === 'inline') && !inlineCollapsed ? <ul className="ui-menu__submenu-list">{renderItems(item.children, currentPath)}</ul> : null}
          </li>
        );
      }

      const selected = nestedKeySet.has(item.key);
      return (
        <li key={item.key} className="ui-menu__item-wrap">
          <button
            type="button"
            className={cn(
              'ui-menu__item',
              selected && 'is-selected',
              item.danger && 'is-danger',
              item.className
            )}
            style={item.style}
            onClick={(event) => handleItemClick(item, [item.key, ...keyPath], event)}
            title={item.title}
            disabled={disabled || item.disabled}
          >
            {item.icon ? <span className="ui-menu__icon">{item.icon}</span> : null}
            <span className="ui-menu__label">{item.label}</span>
          </button>
        </li>
      );
    });

  return (
    <nav
      className={cn('ui-menu', `ui-menu--${mode}`, `ui-menu--${theme}`, inlineCollapsed && 'ui-menu--collapsed', className)}
      aria-label="Menu"
      {...props}
    >
      <ul className="ui-menu__list">{renderItems(items)}</ul>
    </nav>
  );
}
