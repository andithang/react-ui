import { InputHTMLAttributes } from '../../../node_modules/react';
export type TimePickerSize = 'small' | 'middle' | 'large';
export type TimePickerStatus = 'error' | 'warning';
export interface TimePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    label?: string;
    hint?: string;
    error?: string;
    size?: TimePickerSize;
    status?: TimePickerStatus;
    allowClear?: boolean;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    use12Hours?: boolean;
}
export declare function TimePicker({ id, className, label, hint, error, size, status, allowClear, minuteStep, secondStep, value, defaultValue, onChange, ...props }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TimePicker.d.ts.map