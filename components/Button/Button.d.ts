import { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from '../../../node_modules/react';
declare const BUTTON_TYPES: readonly ["default", "primary", "dashed", "link", "text"];
declare const BUTTON_SHAPES: readonly ["default", "circle", "round", "square"];
declare const BUTTON_HTML_TYPES: readonly ["submit", "button", "reset"];
declare const BUTTON_VARIANTS: readonly ["outlined", "dashed", "solid", "filled", "text", "link"];
declare const BUTTON_COLORS: readonly ["default", "primary", "danger", "blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
export type ButtonType = (typeof BUTTON_TYPES)[number];
export type ButtonShape = (typeof BUTTON_SHAPES)[number];
export type ButtonHTMLType = (typeof BUTTON_HTML_TYPES)[number];
export type ButtonVariantType = (typeof BUTTON_VARIANTS)[number];
export type ButtonColorType = (typeof BUTTON_COLORS)[number];
export type LegacyButtonType = ButtonType | 'danger';
export type SizeType = 'small' | 'medium' | 'middle' | 'large' | undefined;
export type ButtonSize = SizeType;
export type ButtonVariant = ButtonVariantType;
export type ButtonSemanticClassNames = {
    root?: string;
    icon?: string;
    content?: string;
};
export type ButtonSemanticStyles = {
    root?: CSSProperties;
    icon?: CSSProperties;
    content?: CSSProperties;
};
type Resolvable<T, P> = T | ((info: {
    props: P;
}) => T);
export type ButtonClassNamesType = Resolvable<Readonly<ButtonSemanticClassNames>, BaseButtonProps>;
export type ButtonStylesType = Resolvable<Readonly<ButtonSemanticStyles>, BaseButtonProps>;
export interface BaseButtonProps {
    type?: ButtonType;
    color?: ButtonColorType;
    variant?: ButtonVariantType;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
    iconPlacement?: 'start' | 'end';
    shape?: ButtonShape;
    size?: SizeType;
    disabled?: boolean;
    loading?: boolean | {
        delay?: number;
        icon?: ReactNode;
    };
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    children?: ReactNode;
    [key: `data-${string}`]: string;
    classNames?: ButtonClassNamesType;
    styles?: ButtonStylesType;
    _skipSemantic?: boolean;
}
type MergedHTMLAttributes = Omit<HTMLAttributes<HTMLElement> & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'color'>;
export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
    href?: string;
    htmlType?: ButtonHTMLType;
    autoInsertSpace?: boolean;
}
export interface ButtonGroupProps {
    size?: SizeType;
    style?: CSSProperties;
    className?: string;
    prefixCls?: string;
    children?: ReactNode;
}
type ButtonElement = HTMLAnchorElement | HTMLButtonElement;
export declare const GroupSizeContext: import('../../../node_modules/react').Context<SizeType>;
declare function ButtonGroup({ size, style, className, prefixCls, children }: ButtonGroupProps): import("react/jsx-runtime").JSX.Element;
declare const InternalButton: import('../../../node_modules/react').ForwardRefExoticComponent<ButtonProps & import('../../../node_modules/react').RefAttributes<ButtonElement>>;
type ButtonComponent = typeof InternalButton & {
    Group: typeof ButtonGroup;
};
export declare const Button: ButtonComponent;
export {};
//# sourceMappingURL=Button.d.ts.map