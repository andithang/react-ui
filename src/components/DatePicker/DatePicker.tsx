import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils';
import './DatePicker.scss';

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

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function pad(v: number) {
  return String(v).padStart(2, '0');
}

function formatDate(date: Date, format: string) {
  return format
    .replace('YYYY', String(date.getFullYear()))
    .replace('MM', pad(date.getMonth() + 1))
    .replace('DD', pad(date.getDate()));
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

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
  disabled,
  placeholder = 'Select date',
  format = 'YYYY-MM-DD',
  value,
  defaultValue,
  open,
  defaultOpen = false,
  onOpenChange,
  onChange,
  disabledDate
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const rootRef = useRef<HTMLLabelElement | null>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internalValue;

  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const mergedOpen = isOpenControlled ? open : internalOpen;

  const [viewDate, setViewDate] = useState<Date>(selected ?? new Date());

  const setOpen = (nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  useEffect(() => {
    if (selected) {
      setViewDate(selected);
    }
  }, [selected]);

  const monthStart = startOfMonth(viewDate);
  const monthStartDay = monthStart.getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();

  const dateCells = useMemo(() => {
    const cells: Array<{ date: Date; inMonth: boolean }> = [];
    for (let i = 0; i < monthStartDay; i += 1) {
      const prevDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), i - monthStartDay + 1);
      cells.push({ date: prevDate, inMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({ date: new Date(viewDate.getFullYear(), viewDate.getMonth(), day), inMonth: true });
    }
    while (cells.length < 42) {
      const nextDay = cells.length - (monthStartDay + daysInMonth) + 1;
      cells.push({ date: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, nextDay), inMonth: false });
    }
    return cells;
  }, [daysInMonth, monthStartDay, viewDate]);

  const emit = (nextDate: Date | null) => {
    if (!isControlled) {
      setInternalValue(nextDate);
    }
    onChange?.(nextDate, nextDate ? formatDate(nextDate, format) : '');
  };

  return (
    <label ref={rootRef} className={cn('ui-date-picker', className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <span className={cn('ui-date-picker__wrap', `ui-date-picker__wrap--${size}`)}>
        <button
          id={inputId}
          type="button"
          className={cn('ui-control', 'ui-date-picker__trigger', (error || status === 'error') && 'ui-control--error', status === 'warning' && 'ui-date-picker__trigger--warning')}
          onClick={() => !disabled && setOpen(!mergedOpen)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={mergedOpen}
        >
          <span className={cn('ui-date-picker__value', !selected && 'ui-date-picker__value--placeholder')}>
            {selected ? formatDate(selected, format) : placeholder}
          </span>
          <span className="ui-date-picker__suffix">📅</span>
        </button>

        {allowClear && selected && !disabled ? (
          <button
            type="button"
            className="ui-date-picker__clear"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              emit(null);
            }}
            aria-label="Clear date"
          >
            ×
          </button>
        ) : null}

        {mergedOpen ? (
          <div className="ui-date-picker__panel" role="dialog" aria-label="Date picker panel">
            <div className="ui-date-picker__header">
              <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}>
                ‹
              </button>
              <strong>
                {viewDate.toLocaleString(undefined, { month: 'long' })} {viewDate.getFullYear()}
              </strong>
              <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}>
                ›
              </button>
            </div>

            {picker === 'date' ? (
              <>
                <div className="ui-date-picker__weekdays">
                  {WEEK_DAYS.map((weekday) => (
                    <span key={weekday}>{weekday}</span>
                  ))}
                </div>
                <div className="ui-date-picker__grid">
                  {dateCells.map((cell) => {
                    const isDisabled = disabledDate?.(cell.date) ?? false;
                    const isSelected = selected ? isSameDay(cell.date, selected) : false;
                    return (
                      <button
                        key={cell.date.toISOString()}
                        type="button"
                        className={cn('ui-date-picker__cell', !cell.inMonth && 'ui-date-picker__cell--outside', isSelected && 'ui-date-picker__cell--selected')}
                        disabled={isDisabled}
                        onClick={() => {
                          emit(cell.date);
                          setOpen(false);
                        }}
                      >
                        {cell.date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : picker === 'month' ? (
              <div className="ui-date-picker__month-grid">
                {Array.from({ length: 12 }, (_, month) => (
                  <button
                    key={month}
                    type="button"
                    className="ui-date-picker__month-cell"
                    onClick={() => {
                      const next = new Date(viewDate.getFullYear(), month, 1);
                      emit(next);
                      setOpen(false);
                    }}
                  >
                    {new Date(2000, month, 1).toLocaleString(undefined, { month: 'short' })}
                  </button>
                ))}
              </div>
            ) : (
              <div className="ui-date-picker__year-grid">
                {Array.from({ length: 12 }, (_, index) => viewDate.getFullYear() - 6 + index).map((year) => (
                  <button
                    key={year}
                    type="button"
                    className="ui-date-picker__year-cell"
                    onClick={() => {
                      const next = new Date(year, 0, 1);
                      emit(next);
                      setOpen(false);
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </span>
      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
