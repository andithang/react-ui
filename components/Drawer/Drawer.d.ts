import { CSSProperties, HTMLAttributes, ReactNode } from '../../../node_modules/react';
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
export interface DrawerClassNames {
    mask?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
}
export interface DrawerStyles {
    mask?: CSSProperties;
    content?: CSSProperties;
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
}
export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open?: boolean;
    afterOpenChange?: (open: boolean) => void;
    onClose?: (event: MouseEvent | globalThis.KeyboardEvent | React.MouseEvent<HTMLElement>) => void;
    placement?: DrawerPlacement;
    size?: 'default' | 'large';
    title?: ReactNode;
    extra?: ReactNode;
    footer?: ReactNode;
    footerStyle?: CSSProperties;
    width?: string | number;
    height?: string | number;
    zIndex?: number;
    keyboard?: boolean;
    closable?: boolean;
    closeIcon?: ReactNode;
    mask?: boolean;
    maskClosable?: boolean;
    push?: boolean | {
        distance: string | number;
    };
    getContainer?: HTMLElement | string | false | (() => HTMLElement);
    rootClassName?: string;
    classNames?: DrawerClassNames;
    styles?: DrawerStyles;
    destroyOnClose?: boolean;
    children?: ReactNode;
}
export declare function Drawer({ open, afterOpenChange, onClose, placement, size, title, extra, footer, footerStyle, width, height, zIndex, keyboard, closable, closeIcon, mask, maskClosable, getContainer, rootClassName, classNames, styles, destroyOnClose, className, children, ...props }: DrawerProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Drawer.d.ts.map