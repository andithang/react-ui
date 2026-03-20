import { forwardRef, type ReactElement, type ReactNode } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps as AntDatePickerProps, MonthPickerProps, RangePickerProps, WeekPickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import { Icon } from '../Icon/Icon';
import './DatePicker.scss';

export type DatePickerProps<ValueType = Dayjs, IsMultiple extends boolean = boolean> = AntDatePickerProps<ValueType, IsMultiple>;
export type { RangePickerProps, MonthPickerProps, WeekPickerProps };
export type YearPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
export type QuarterPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;

type AllowClear = boolean | { clearIcon?: ReactNode };

const DEFAULT_CLEAR_ICON = <Icon name="closeOutline" className="ui-date-picker__clear-icon" size="0.75rem" />;
const DEFAULT_SUFFIX_ICON = <Icon name="chevronDown" className="ui-date-picker__suffix-icon" size="0.75rem" />;

function mergeAllowClear(allowClear: AllowClear | undefined): AllowClear {
  if (allowClear === false) {
    return false;
  }

  if (allowClear && typeof allowClear === 'object') {
    return {
      ...allowClear,
      clearIcon: allowClear.clearIcon ?? DEFAULT_CLEAR_ICON
    };
  }

  return {
    clearIcon: DEFAULT_CLEAR_ICON
  };
}

function withDefaultIcons<T extends { allowClear?: AllowClear; suffixIcon?: ReactNode }>(
  PickerComponent: (props: T) => ReactElement
) {
  return forwardRef<unknown, T>(function WrappedPicker({ allowClear, suffixIcon, ...props }, ref) {
    return (
      <PickerComponent
        {...(props as unknown as T)}
        ref={ref as never}
        allowClear={mergeAllowClear(allowClear)}
        suffixIcon={suffixIcon ?? DEFAULT_SUFFIX_ICON}
      />
    );
  });
}

const WrappedDatePicker = withDefaultIcons<DatePickerProps<Dayjs, boolean>>(AntDatePicker as never);
const WrappedRangePicker = withDefaultIcons<RangePickerProps>(AntDatePicker.RangePicker as never);
const WrappedMonthPicker = withDefaultIcons<MonthPickerProps>(AntDatePicker.MonthPicker as never);
const WrappedWeekPicker = withDefaultIcons<WeekPickerProps>(AntDatePicker.WeekPicker as never);
const WrappedYearPicker = withDefaultIcons<YearPickerProps>(AntDatePicker.YearPicker as never);
const WrappedQuarterPicker = withDefaultIcons<QuarterPickerProps>(AntDatePicker.QuarterPicker as never);

export const DatePicker = Object.assign(WrappedDatePicker, {
  RangePicker: WrappedRangePicker,
  MonthPicker: WrappedMonthPicker,
  WeekPicker: WrappedWeekPicker,
  YearPicker: WrappedYearPicker,
  QuarterPicker: WrappedQuarterPicker
}) as unknown as typeof AntDatePicker;
