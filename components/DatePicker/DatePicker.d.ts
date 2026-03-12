export type DatePickerPicker = 'date' | 'month' | 'year';
export type DatePickerSize = 'small' | 'middle' | 'large';
export type DatePickerStatus = 'error' | 'warning';
export interface DatePickerProps {
    id?: string;
    className?: string;
    label?: string;
    hint?: string;
    error?: string;
    picker?: DatePickerPicker;
    size?: DatePickerSize;
    status?: DatePickerStatus;
    allowClear?: boolean;
    disabled?: boolean;
    placeholder?: string;
    format?: string;
    value?: Date | null;
    defaultValue?: Date;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (date: Date | null, dateString: string) => void;
    disabledDate?: (date: Date) => boolean;
}
export declare function DatePicker({ id, className, label, hint, error, picker, size, status, allowClear, disabled, placeholder, format, value, defaultValue, open, defaultOpen, onOpenChange, onChange, disabledDate }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map