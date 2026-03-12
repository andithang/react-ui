import { InputHTMLAttributes } from '../../../node_modules/react';
export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
    label?: string;
    hint?: string;
    error?: string;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    size?: 'small' | 'middle' | 'large';
    value?: number;
    defaultValue?: number;
    controls?: boolean;
    onChange?: (value: number | null) => void;
}
export declare function InputNumber({ id, className, label, hint, error, min, max, step, precision, size, value, defaultValue, controls, onChange, disabled, ...props }: InputNumberProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InputNumber.d.ts.map