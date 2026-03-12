import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps as AntDatePickerProps, MonthPickerProps, RangePickerProps, WeekPickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import './DatePicker.scss';

export type DatePickerProps<ValueType = Dayjs, IsMultiple extends boolean = boolean> = AntDatePickerProps<ValueType, IsMultiple>;
export type { RangePickerProps, MonthPickerProps, WeekPickerProps };
export type YearPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
export type QuarterPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;

export const DatePicker = AntDatePicker;
