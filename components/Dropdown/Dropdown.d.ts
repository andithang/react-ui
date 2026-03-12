import { CSSProperties, HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from '../../../node_modules/react';
import { ButtonGroupProps, ButtonHTMLType, ButtonProps, ButtonType } from '../Button/Button';
declare const DROPDOWN_PLACEMENTS: readonly ["topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight", "top", "bottom"];
declare const DROPDOWN_TRIGGERS: readonly ["click", "hover", "contextMenu"];
export type DropdownPlacement = (typeof DROPDOWN_PLACEMENTS)[number];
export type DropdownTrigger = (typeof DROPDOWN_TRIGGERS)[number];
export type DataAttributes = {
    [Key in `data-${string}`]?: unknown;
};
export interface DropdownMenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    domEvent: ReactMouseEvent<HTMLElement>;
}
export interface DropdownMenuItemType extends DataAttributes {
    key: React.Key;
    label?: ReactNode;
    disabled?: boolean;
    danger?: boolean;
    icon?: ReactNode;
    title?: string;
    className?: string;
    style?: CSSProperties;
    onClick?: (info: DropdownMenuInfo) => void;
}
export interface DropdownSubMenuType extends Omit<DropdownMenuItemType, 'onClick'> {
    children: DropdownMenuItemNode[];
}
export interface DropdownMenuItemGroupType extends DataAttributes {
    type: 'group';
    key?: React.Key;
    label?: ReactNode;
    children?: DropdownMenuItemNode[];
    className?: string;
    style?: CSSProperties;
}
export interface DropdownMenuDividerType extends DataAttributes {
    type: 'divider';
    key?: React.Key;
    dashed?: boolean;
    className?: string;
    style?: CSSProperties;
}
export type DropdownMenuItemNode = DropdownMenuItemType | DropdownSubMenuType | DropdownMenuItemGroupType | DropdownMenuDividerType | null;
export type DropdownMenuItem = DropdownMenuItemType;
export interface DropdownMenuProps {
    items?: DropdownMenuItemNode[];
    className?: string;
    style?: CSSProperties;
    selectable?: boolean;
    multiple?: boolean;
    selectedKeys?: React.Key[];
    defaultSelectedKeys?: React.Key[];
    activeKey?: React.Key;
    onClick?: (info: DropdownMenuInfo) => void;
    onSelect?: (info: DropdownMenuInfo) => void;
    onDeselect?: (info: DropdownMenuInfo) => void;
}
export interface DropdownArrowOptions {
    pointAtCenter?: boolean;
}
export type DropdownSemanticClassNames = {
    root?: string;
    item?: string;
    itemTitle?: string;
    itemIcon?: string;
    itemContent?: string;
};
export type DropdownSemanticStyles = {
    root?: CSSProperties;
    item?: CSSProperties;
    itemTitle?: CSSProperties;
    itemIcon?: CSSProperties;
    itemContent?: CSSProperties;
};
type Resolvable<T, P> = T | ((info: {
    props: P;
}) => T);
export type DropdownClassNamesType = Resolvable<Readonly<DropdownSemanticClassNames>, DropdownProps>;
export type DropdownStylesType = Resolvable<Readonly<DropdownSemanticStyles>, DropdownProps>;
export interface DropdownAdjustOverflow {
    adjustX?: boolean | number;
    adjustY?: boolean | number;
}
export interface DropdownAlign {
    offset?: [number, number];
    overflow?: DropdownAdjustOverflow;
}
export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
    classNames?: DropdownClassNamesType;
    styles?: DropdownStylesType;
    menu?: DropdownMenuProps;
    autoFocus?: boolean;
    arrow?: boolean | DropdownArrowOptions;
    trigger?: DropdownTrigger[];
    /** @deprecated Please use `popupRender` instead. */
    dropdownRender?: (originNode: ReactNode) => ReactNode;
    popupRender?: (originNode: ReactNode) => ReactNode;
    onOpenChange?: (open: boolean, info: {
        source: 'trigger' | 'menu';
    }) => void;
    open?: boolean;
    disabled?: boolean;
    /** @deprecated Please use `destroyOnHidden` instead. */
    destroyPopupOnHide?: boolean;
    destroyOnHidden?: boolean;
    align?: DropdownAlign;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    transitionName?: string;
    placement?: DropdownPlacement;
    /** @deprecated Please use `classNames.root` instead. */
    overlayClassName?: string;
    /** @deprecated Please use `styles.root` instead. */
    overlayStyle?: CSSProperties;
    forceRender?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    openClassName?: string;
    children?: ReactNode;
    autoAdjustOverflow?: boolean | DropdownAdjustOverflow;
    /** @deprecated Please use `open` instead. */
    visible?: boolean;
    /** @deprecated Please use `onOpenChange` instead. */
    onVisibleChange?: (open: boolean) => void;
    /** @deprecated Please use `menu.items` instead. */
    items?: DropdownMenuItemNode[];
}
export type DropdownButtonType = ButtonType;
export interface DropdownButtonProps extends ButtonGroupProps, Omit<DropdownProps, 'children'> {
    type?: DropdownButtonType;
    htmlType?: ButtonHTMLType;
    danger?: boolean;
    disabled?: boolean;
    loading?: ButtonProps['loading'];
    onClick?: React.MouseEventHandler<HTMLElement>;
    icon?: ReactNode;
    href?: string;
    children?: ReactNode;
    title?: string;
    buttonsRender?: (buttons: ReactNode[]) => ReactNode[];
}
declare function DropdownBase(rawProps: DropdownProps): import("react/jsx-runtime").JSX.Element;
declare function DropdownButton({ type, htmlType, danger, disabled, loading, onClick, icon, href, children, title, buttonsRender, className, size, style, prefixCls, trigger, menu, ...dropdownProps }: DropdownButtonProps): import("react/jsx-runtime").JSX.Element;
declare function WrapPurePanel(props: DropdownProps): import("react/jsx-runtime").JSX.Element;
type DropdownComponent = typeof DropdownBase & {
    Button: typeof DropdownButton;
    _InternalPanelDoNotUseOrYouWillBeFired: typeof WrapPurePanel;
};
export declare const Dropdown: DropdownComponent;
export {};
//# sourceMappingURL=Dropdown.d.ts.map