import { CSSProperties, HTMLAttributes, ReactNode } from '../../../node_modules/react';
export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';
export type BadgeSize = 'default' | 'small';
export type BadgeRibbonPlacement = 'start' | 'end';
export interface BadgeClassNames {
    root?: string;
    indicator?: string;
    statusDot?: string;
    statusText?: string;
    ribbon?: string;
    ribbonText?: string;
}
export interface BadgeStyles {
    root?: CSSProperties;
    indicator?: CSSProperties;
    statusDot?: CSSProperties;
    statusText?: CSSProperties;
    ribbon?: CSSProperties;
    ribbonText?: CSSProperties;
}
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
    prefixCls?: string;
    classNames?: BadgeClassNames;
    styles?: BadgeStyles;
    count?: ReactNode;
    dot?: boolean;
    overflowCount?: number;
    showZero?: boolean;
    status?: BadgeStatus;
    color?: string;
    text?: ReactNode;
    offset?: [number, number];
    size?: BadgeSize;
    title?: string;
    children?: ReactNode;
}
export interface BadgeRibbonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'text'> {
    prefixCls?: string;
    text?: ReactNode;
    color?: string;
    placement?: BadgeRibbonPlacement;
    classNames?: Pick<BadgeClassNames, 'ribbon' | 'ribbonText'>;
    styles?: Pick<BadgeStyles, 'ribbon' | 'ribbonText'>;
    children?: ReactNode;
}
declare function InternalBadge({ prefixCls, className, style, classNames, styles, count, dot, overflowCount, showZero, status, color, text, offset, size, title, children, ...restProps }: BadgeProps): import("react/jsx-runtime").JSX.Element;
declare function BadgeRibbon({ prefixCls, className, style, classNames, styles, text, color, placement, children, ...restProps }: BadgeRibbonProps): import("react/jsx-runtime").JSX.Element;
export type BadgeType = typeof InternalBadge & {
    Ribbon: typeof BadgeRibbon;
};
export declare const Badge: BadgeType;
export {};
//# sourceMappingURL=Badge.d.ts.map