import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './TimePicker.scss';

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

export function TimePicker({
  id,
  className,
  label,
  hint,
  error,
  size = 'middle',
  status,
  allowClear = true,
  minuteStep = 1,
  secondStep = 1,
  value,
  defaultValue,
  onChange,
  ...props
}: TimePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const step = Math.max(1, minuteStep) * 60 * Math.max(1, secondStep);

  return (
    <label className={cn('ui-time-picker', className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <span className="ui-time-picker__wrap">
        <input
          id={inputId}
          type="time"
          step={step}
          className={cn('ui-control', `ui-time-picker--${size}`, (error || status === 'error') && 'ui-control--error', status === 'warning' && 'ui-time-picker--warning')}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
        />
        {allowClear && (value ?? defaultValue) ? (
          <button
            type="button"
            className="ui-time-picker__clear"
            onClick={(event) => {
              event.preventDefault();
              onChange?.({ target: { value: '' } } as never);
            }}
            aria-label="Clear time"
          >
            ×
          </button>
        ) : null}
      </span>
      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
