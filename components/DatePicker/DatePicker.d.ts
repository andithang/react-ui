import { ReactNode } from '../../../node_modules/react';
import { Dayjs } from 'dayjs';
import { DatePickerProps as AntDatePickerProps, MonthPickerProps, RangePickerProps, WeekPickerProps } from 'antd/es/date-picker';
export type DatePickerProps<ValueType = Dayjs, IsMultiple extends boolean = boolean> = AntDatePickerProps<ValueType, IsMultiple>;
export type { RangePickerProps, MonthPickerProps, WeekPickerProps };
export type YearPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
export type QuarterPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';
type PickerSize = 'small' | 'middle' | 'large';
type AllowClear = boolean | {
    clearIcon?: ReactNode;
};
type DateValue = Dayjs | null;
type RangeValue = [DateValue, DateValue] | null;
interface PickerBaseProps {
    allowClear?: AllowClear;
    className?: string;
    disabled?: boolean;
    disabledDate?: (date: Dayjs) => boolean;
    format?: string;
    id?: string;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    defaultOpen?: boolean;
    placeholder?: string;
    size?: PickerSize;
    status?: 'warning' | 'error';
}
export interface SinglePickerInternalProps extends PickerBaseProps {
    defaultValue?: Dayjs;
    onChange?: (date: DateValue, dateString: string) => void;
    picker?: PickerMode;
    presets?: Array<{
        label: ReactNode;
        value: Dayjs;
    }>;
    showTime?: boolean;
    value?: Dayjs;
}
export interface RangePickerInternalProps extends PickerBaseProps {
    defaultValue?: [Dayjs, Dayjs];
    onChange?: (date: RangeValue, dateString: [string, string]) => void;
    picker?: PickerMode;
    presets?: Array<{
        label: ReactNode;
        value: [Dayjs, Dayjs];
    }>;
    value?: [Dayjs, Dayjs];
}
export declare const DatePicker: import('../../../node_modules/react').ForwardRefExoticComponent<SinglePickerInternalProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>> & {
    RangePicker: import('../../../node_modules/react').ForwardRefExoticComponent<RangePickerInternalProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    MonthPicker: import('../../../node_modules/react').ForwardRefExoticComponent<SinglePickerInternalProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    WeekPicker: import('../../../node_modules/react').ForwardRefExoticComponent<SinglePickerInternalProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    YearPicker: import('../../../node_modules/react').ForwardRefExoticComponent<SinglePickerInternalProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    QuarterPicker: import('../../../node_modules/react').ForwardRefExoticComponent<SinglePickerInternalProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
};
//# sourceMappingURL=DatePicker.d.ts.map