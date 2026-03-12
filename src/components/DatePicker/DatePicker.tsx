import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './DatePicker.scss';

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

const inputTypeMap: Record<DatePickerPicker, InputHTMLAttributes<HTMLInputElement>['type']> = {
  date: 'date',
  week: 'week',
  month: 'month',
  quarter: 'month',
  year: 'number'
};

export function DatePicker({
  id,
  className,
  label,
  hint,
  error,
  picker = 'date',
  size = 'middle',
  status,
  allowClear = true,
  value,
  defaultValue,
  onChange,
  ...props
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label className={cn('ui-date-picker', className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <span className="ui-date-picker__wrap">
        <input
          id={inputId}
          type={inputTypeMap[picker]}
          className={cn('ui-control', `ui-date-picker--${size}`, (error || status === 'error') && 'ui-control--error', status === 'warning' && 'ui-date-picker--warning')}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
        />
        {allowClear && (value ?? defaultValue) ? (
          <button
            type="button"
            className="ui-date-picker__clear"
            onClick={(event) => {
              event.preventDefault();
              onChange?.({ target: { value: '' } } as never);
            }}
            aria-label="Clear date"
          >
            ×
          </button>
        ) : null}
      </span>
      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
