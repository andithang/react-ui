import { CSSProperties, HTMLAttributes, ReactNode } from '../../../node_modules/react';
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
export declare function Menu({ items, mode, theme, selectable, multiple, selectedKeys, defaultSelectedKeys, openKeys, defaultOpenKeys, inlineCollapsed, disabled, triggerSubMenuAction, expandIcon, onClick, onSelect, onDeselect, onOpenChange, className, ...props }: MenuProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Menu.d.ts.map