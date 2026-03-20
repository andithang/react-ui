import { InputHTMLAttributes, KeyboardEventHandler, ReactNode } from '../../../node_modules/react';
export type InputNumberSize = 'small' | 'middle' | 'large';
export type InputNumberStatus = 'error' | 'warning';
export type InputNumberVariant = 'outlined' | 'borderless' | 'filled' | 'underlined';
export type InputNumberValue = number | string | null;
export interface InputNumberFormatterInfo {
    userTyping: boolean;
    input: string;
}
export interface InputNumberStepInfo {
    offset: number;
    type: 'up' | 'down';
}
export interface InputNumberControlsConfig {
    upIcon?: ReactNode;
    downIcon?: ReactNode;
}
export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'prefix' | 'size' | 'type' | 'value'> {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    bordered?: boolean;
    changeOnWheel?: boolean;
    className?: string;
    controls?: boolean | InputNumberControlsConfig;
    defaultValue?: number | string | null;
    error?: string;
    formatter?: (value: number | string | undefined, info: InputNumberFormatterInfo) => string;
    hint?: string;
    keyboard?: boolean;
    label?: string;
    max?: number;
    min?: number;
    onChange?: (value: InputNumberValue) => void;
    onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
    onStep?: (value: number | string, info: InputNumberStepInfo) => void;
    parser?: (displayValue: string | undefined) => string | number;
    precision?: number;
    prefix?: ReactNode;
    rootClassName?: string;
    size?: InputNumberSize;
    status?: InputNumberStatus;
    step?: number;
    stringMode?: boolean;
    suffix?: ReactNode;
    value?: number | string | null;
    variant?: InputNumberVariant;
    wrapperClassName?: string;
}
export declare const InputNumber: import('../../../node_modules/react').ForwardRefExoticComponent<InputNumberProps & import('../../../node_modules/react').RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=InputNumber.d.ts.map