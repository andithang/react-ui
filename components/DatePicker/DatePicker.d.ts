import { DatePickerProps as AntDatePickerProps, MonthPickerProps, RangePickerProps, WeekPickerProps } from 'antd/es/date-picker';
import { Dayjs } from 'dayjs';
export type DatePickerProps<ValueType = Dayjs, IsMultiple extends boolean = boolean> = AntDatePickerProps<ValueType, IsMultiple>;
export type { RangePickerProps, MonthPickerProps, WeekPickerProps };
export type YearPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
export type QuarterPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
export declare const DatePicker: import('antd/es/date-picker').DatePickerType;
//# sourceMappingURL=DatePicker.d.ts.map