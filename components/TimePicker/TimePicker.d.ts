export type TimePickerSize = 'small' | 'middle' | 'large';
export type TimePickerStatus = 'error' | 'warning';
export interface TimePickerProps {
    id?: string;
    className?: string;
    label?: string;
    hint?: string;
    error?: string;
    size?: TimePickerSize;
    status?: TimePickerStatus;
    allowClear?: boolean;
    disabled?: boolean;
    placeholder?: string;
    format?: 'HH:mm' | 'HH:mm:ss' | 'h:mm a';
    value?: Date | null;
    defaultValue?: Date;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (time: Date | null, timeString: string) => void;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    use12Hours?: boolean;
}
export declare function TimePicker({ id, className, label, hint, error, size, status, allowClear, disabled, placeholder, format, value, defaultValue, open, defaultOpen, onOpenChange, onChange, hourStep, minuteStep, secondStep, use12Hours }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TimePicker.d.ts.map