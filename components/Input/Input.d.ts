import { CSSProperties, InputHTMLAttributes, KeyboardEventHandler, ReactNode } from '../../../node_modules/react';
export type InputSize = 'small' | 'middle' | 'large';
export type InputStatus = 'error' | 'warning';
export type InputVariant = 'outlined' | 'borderless' | 'filled' | 'underlined';
export interface InputShowCountFormatterInfo {
    value: string;
    count: number;
    maxLength?: number;
}
export interface InputShowCountConfig {
    formatter?: (info: InputShowCountFormatterInfo) => ReactNode;
}
export interface InputAllowClearConfig {
    clearIcon?: ReactNode;
}
export type InputSemanticDOM = 'groupWrapper' | 'affixWrapper' | 'input' | 'prefix' | 'suffix' | 'count' | 'clear' | 'addonBefore' | 'addonAfter';
export type InputClassNames = Partial<Record<InputSemanticDOM, string>>;
export type InputStyles = Partial<Record<InputSemanticDOM, CSSProperties>>;
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
    label?: string;
    hint?: string;
    error?: string;
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    allowClear?: boolean | InputAllowClearConfig;
    bordered?: boolean;
    classNames?: InputClassNames;
    rootClassName?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    size?: InputSize;
    status?: InputStatus;
    variant?: InputVariant;
    styles?: InputStyles;
    showCount?: boolean | InputShowCountConfig;
    onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
    onClear?: () => void;
}
export declare function Input({ label, hint, error, id, className, rootClassName, addonBefore, addonAfter, allowClear, bordered, classNames, prefix, suffix, size, status, variant, styles, showCount, onPressEnter, onClear, onChange, onKeyDown, value, defaultValue, disabled, readOnly, maxLength, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Input.d.ts.map