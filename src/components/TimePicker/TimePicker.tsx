import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils';
import './TimePicker.scss';

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

function pad(v: number) {
  return String(v).padStart(2, '0');
}

function formatTime(date: Date, format: TimePickerProps['format'], use12Hours: boolean) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (format === 'h:mm a' || use12Hours) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${pad(minutes)} ${period}`;
  }

  if (format === 'HH:mm') {
    return `${pad(hours)}:${pad(minutes)}`;
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
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
  disabled,
  placeholder = 'Select time',
  format = 'HH:mm:ss',
  value,
  defaultValue,
  open,
  defaultOpen = false,
  onOpenChange,
  onChange,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  use12Hours = false
}: TimePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const rootRef = useRef<HTMLLabelElement | null>(null);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internalValue;

  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const mergedOpen = isOpenControlled ? open : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const [hour, setHour] = useState(selected?.getHours() ?? 0);
  const [minute, setMinute] = useState(selected?.getMinutes() ?? 0);
  const [second, setSecond] = useState(selected?.getSeconds() ?? 0);

  useEffect(() => {
    if (selected) {
      setHour(selected.getHours());
      setMinute(selected.getMinutes());
      setSecond(selected.getSeconds());
    }
  }, [selected]);

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const emit = (next: Date | null) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next, next ? formatTime(next, format, use12Hours) : '');
  };

  const hours = useMemo(() => Array.from({ length: use12Hours ? 12 : 24 }, (_, i) => i).filter((h) => h % Math.max(1, hourStep) === 0), [hourStep, use12Hours]);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i).filter((m) => m % Math.max(1, minuteStep) === 0), [minuteStep]);
  const seconds = useMemo(() => Array.from({ length: 60 }, (_, i) => i).filter((s) => s % Math.max(1, secondStep) === 0), [secondStep]);

  const commit = (nextHour = hour, nextMinute = minute, nextSecond = second) => {
    const next = new Date();
    next.setHours(nextHour, nextMinute, nextSecond, 0);
    emit(next);
  };

  return (
    <label ref={rootRef} className={cn('ui-time-picker', className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}

      <span className={cn('ui-time-picker__wrap', `ui-time-picker__wrap--${size}`)}>
        <button
          id={inputId}
          type="button"
          className={cn('ui-control', 'ui-time-picker__trigger', (error || status === 'error') && 'ui-control--error', status === 'warning' && 'ui-time-picker__trigger--warning')}
          onClick={() => !disabled && setOpen(!mergedOpen)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={mergedOpen}
        >
          <span className={cn('ui-time-picker__value', !selected && 'ui-time-picker__value--placeholder')}>
            {selected ? formatTime(selected, format, use12Hours) : placeholder}
          </span>
          <span className="ui-time-picker__suffix">🕒</span>
        </button>

        {allowClear && selected && !disabled ? (
          <button
            type="button"
            className="ui-time-picker__clear"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              emit(null);
            }}
            aria-label="Clear time"
          >
            ×
          </button>
        ) : null}

        {mergedOpen ? (
          <div className="ui-time-picker__panel" role="dialog" aria-label="Time picker panel">
            <div className="ui-time-picker__lists">
              <div className="ui-time-picker__column">
                {hours.map((h) => {
                  const displayHour = use12Hours ? (h === 0 ? 12 : h) : h;
                  return (
                    <button
                      key={h}
                      type="button"
                      className={cn('ui-time-picker__cell', hour === h && 'ui-time-picker__cell--selected')}
                      onClick={() => {
                        setHour(h);
                        commit(h, minute, second);
                      }}
                    >
                      {pad(displayHour)}
                    </button>
                  );
                })}
              </div>

              <div className="ui-time-picker__column">
                {minutes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={cn('ui-time-picker__cell', minute === m && 'ui-time-picker__cell--selected')}
                    onClick={() => {
                      setMinute(m);
                      commit(hour, m, second);
                    }}
                  >
                    {pad(m)}
                  </button>
                ))}
              </div>

              {format !== 'HH:mm' ? (
                <div className="ui-time-picker__column">
                  {seconds.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={cn('ui-time-picker__cell', second === s && 'ui-time-picker__cell--selected')}
                      onClick={() => {
                        setSecond(s);
                        commit(hour, minute, s);
                      }}
                    >
                      {pad(s)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </span>

      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
