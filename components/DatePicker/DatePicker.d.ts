import { InputHTMLAttributes } from '../../../node_modules/react';
export type DatePickerPicker = 'date' | 'week' | 'month' | 'quarter' | 'year';
export type DatePickerSize = 'small' | 'middle' | 'large';
export type DatePickerStatus = 'error' | 'warning';
export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    label?: string;
    hint?: string;
    error?: string;
    picker?: DatePickerPicker;
    size?: DatePickerSize;
    status?: DatePickerStatus;
    allowClear?: boolean;
}
export declare function DatePicker({ id, className, label, hint, error, picker, size, status, allowClear, value, defaultValue, onChange, ...props }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map