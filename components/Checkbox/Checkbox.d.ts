import { CSSProperties, FocusEventHandler, InputHTMLAttributes, KeyboardEventHandler, MouseEventHandler, ReactNode } from '../../../node_modules/react';
export interface AbstractCheckboxProps<T> {
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    style?: CSSProperties;
    disabled?: boolean;
    title?: string;
    onChange?: (e: T) => void;
    onClick?: MouseEventHandler<HTMLElement>;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    onKeyPress?: KeyboardEventHandler<HTMLElement>;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    value?: any;
    tabIndex?: number;
    name?: string;
    children?: ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
}
type NativeCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onKeyPress' | 'onKeyDown' | 'onFocus' | 'onBlur' | 'className' | 'style' | 'title' | 'defaultChecked' | 'checked' | 'disabled' | 'value' | 'tabIndex' | 'name' | 'children' | 'id' | 'autoFocus' | 'type' | 'required'>;
export interface CheckboxChangeEventTarget extends CheckboxProps {
    checked: boolean;
}
export interface CheckboxChangeEvent {
    target: CheckboxChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}
export type CheckboxSemanticClassNames = {
    root?: string;
    icon?: string;
    label?: string;
};
export type CheckboxSemanticStyles = {
    root?: CSSProperties;
    icon?: CSSProperties;
    label?: CSSProperties;
};
export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent>, NativeCheckboxProps {
    indeterminate?: boolean;
    classNames?: Partial<CheckboxSemanticClassNames>;
    styles?: Partial<CheckboxSemanticStyles>;
}
export interface CheckboxOptionType<T = any> {
    label: ReactNode;
    value: T;
    style?: CSSProperties;
    className?: string;
    disabled?: boolean;
    title?: string;
    id?: string;
    onChange?: (e: CheckboxChangeEvent) => void;
    required?: boolean;
}
export interface AbstractCheckboxGroupProps<T = any> extends Omit<InputHTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'> {
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    options?: Array<CheckboxOptionType<T> | string | number>;
    disabled?: boolean;
    style?: CSSProperties;
}
export interface CheckboxGroupProps<T = any> extends AbstractCheckboxGroupProps<T> {
    name?: string;
    defaultValue?: T[];
    value?: T[];
    onChange?: (checkedValue: T[]) => void;
    children?: ReactNode;
}
declare const InternalCheckbox: import('../../../node_modules/react').ForwardRefExoticComponent<CheckboxProps & import('../../../node_modules/react').RefAttributes<HTMLInputElement>>;
declare const CheckboxGroup: import('../../../node_modules/react').ForwardRefExoticComponent<CheckboxGroupProps<any> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
type CompoundedCheckbox = typeof InternalCheckbox & {
    Group: typeof CheckboxGroup;
};
export declare const Checkbox: CompoundedCheckbox;
export {};
//# sourceMappingURL=Checkbox.d.ts.map