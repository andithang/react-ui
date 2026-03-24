import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode
} from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import type {
  DatePickerProps as AntDatePickerProps,
  MonthPickerProps,
  RangePickerProps,
  WeekPickerProps
} from 'antd/es/date-picker';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import './DatePicker.scss';

export type DatePickerProps<ValueType = Dayjs, IsMultiple extends boolean = boolean> = AntDatePickerProps<ValueType, IsMultiple>;
export type { RangePickerProps, MonthPickerProps, WeekPickerProps };
export type YearPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
export type QuarterPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';
type PickerSize = 'small' | 'middle' | 'large';
type AllowClear = boolean | { clearIcon?: ReactNode };
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
  presets?: Array<{ label: ReactNode; value: Dayjs }>;
  showTime?: boolean;
  value?: Dayjs;
}

export interface RangePickerInternalProps extends PickerBaseProps {
  defaultValue?: [Dayjs, Dayjs];
  onChange?: (date: RangeValue, dateString: [string, string]) => void;
  picker?: PickerMode;
  presets?: Array<{ label: ReactNode; value: [Dayjs, Dayjs] }>;
  value?: [Dayjs, Dayjs];
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DEFAULT_CLEAR_ICON = <Icon name="closeOutline" className="ui-date-picker__clear-icon" size="0.75rem" />;
const DEFAULT_SUFFIX_ICON = <Icon name="chevronDown" className="ui-date-picker__suffix-icon" size="0.75rem" />;

function mergeAllowClear(allowClear: AllowClear | undefined): { enabled: boolean; icon: ReactNode } {
  if (allowClear === false) {
    return { enabled: false, icon: DEFAULT_CLEAR_ICON };
  }

  if (allowClear && typeof allowClear === 'object') {
    return {
      enabled: true,
      icon: allowClear.clearIcon ?? DEFAULT_CLEAR_ICON
    };
  }

  return { enabled: true, icon: DEFAULT_CLEAR_ICON };
}

function getFormat(picker: PickerMode, explicit?: string, showTime?: boolean) {
  if (explicit) return explicit;
  if (showTime) return 'YYYY-MM-DD HH:mm:ss';
  if (picker === 'month') return 'YYYY-MM';
  if (picker === 'quarter') return 'YYYY-[Q]Q';
  if (picker === 'year') return 'YYYY';
  if (picker === 'week') return 'YYYY-[W]WW';
  return 'YYYY-MM-DD';
}

function buildMonthGrid(viewDate: Dayjs) {
  const start = viewDate.startOf('month').startOf('week');
  return Array.from({ length: 42 }, (_, index) => start.add(index, 'day'));
}

function matchByPicker(candidate: Dayjs, current: Dayjs, picker: PickerMode) {
  if (picker === 'month') return candidate.isSame(current, 'month');
  if (picker === 'quarter') return Math.floor(candidate.month() / 3) === Math.floor(current.month() / 3) && candidate.year() === current.year();
  if (picker === 'year') return candidate.isSame(current, 'year');
  if (picker === 'week') return candidate.isSame(current, 'week');
  return candidate.isSame(current, 'day');
}

function formatValue(value: Dayjs | null, format: string) {
  return value ? value.format(format) : '';
}

function DatePanel({
  panelValue,
  picker,
  disabledDate,
  selected,
  range,
  onSelect
}: {
  panelValue: Dayjs;
  picker: PickerMode;
  disabledDate?: (date: Dayjs) => boolean;
  selected?: Dayjs | null;
  range?: [Dayjs | null, Dayjs | null] | null;
  onSelect: (date: Dayjs) => void;
}) {
  const items = useMemo(() => {
    if (picker === 'month') {
      return MONTHS.map((m, i) => ({ label: m, value: panelValue.month(i).date(1) }));
    }
    if (picker === 'year') {
      const start = Math.floor(panelValue.year() / 12) * 12;
      return Array.from({ length: 12 }, (_, i) => {
        const year = start + i;
        return { label: String(year), value: panelValue.year(year).startOf('year') };
      });
    }
    if (picker === 'quarter') {
      return [0, 1, 2, 3].map((q) => ({ label: `Q${q + 1}`, value: panelValue.month(q * 3).startOf('month') }));
    }
    return buildMonthGrid(panelValue).map((d) => ({ label: String(d.date()), value: d }));
  }, [panelValue, picker]);

  return (
    <div className={cn('ui-date-picker__grid', `ui-date-picker__grid--${picker}`)}>
      {picker === 'date' || picker === 'week' ? (
        <>
          {WEEKDAYS.map((day) => (
            <span key={day} className="ui-date-picker__weekday">{day}</span>
          ))}
        </>
      ) : null}
      {items.map(({ label, value }) => {
        const isDisabled = disabledDate?.(value) ?? false;
        const isSelected = selected ? matchByPicker(value, selected, picker) : false;
        const isInRange = range && range[0] && range[1] ? value.isAfter(range[0], 'day') && value.isBefore(range[1], 'day') : false;
        const isRangeEdge = range ? Boolean((range[0] && value.isSame(range[0], 'day')) || (range[1] && value.isSame(range[1], 'day'))) : false;

        return (
          <button
            key={value.toISOString() + picker}
            type="button"
            disabled={isDisabled}
            className={cn(
              'ui-date-picker__cell',
              value.month() !== panelValue.month() && (picker === 'date' || picker === 'week') && 'ui-date-picker__cell--muted',
              isSelected && 'ui-date-picker__cell--selected',
              isInRange && 'ui-date-picker__cell--in-range',
              isRangeEdge && 'ui-date-picker__cell--range-edge'
            )}
            onClick={() => onSelect(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function PickerShell({
  children,
  className,
  status,
  size,
  disabled,
  inputId,
  displayValue,
  placeholder,
  clearEnabled,
  clearIcon,
  showClear,
  suffixIcon,
  open,
  onToggle,
  onClear,
  onKeyDown,
  panel
}: {
  children?: ReactNode;
  className?: string;
  status?: 'warning' | 'error';
  size: PickerSize;
  disabled?: boolean;
  inputId: string;
  displayValue: string;
  placeholder?: string;
  clearEnabled: boolean;
  clearIcon: ReactNode;
  showClear: boolean;
  suffixIcon: ReactNode;
  open: boolean;
  onToggle: () => void;
  onClear: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  panel: ReactNode;
}) {
  return (
    <div className={cn('ui-date-picker', className)}>
      <button
        id={inputId}
        type="button"
        className={cn(
          'ui-date-picker__control',
          `ui-date-picker__control--${size}`,
          status === 'error' && 'ui-date-picker__control--error',
          status === 'warning' && 'ui-date-picker__control--warning'
        )}
        disabled={disabled}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={cn('ui-date-picker__value', !displayValue && 'ui-date-picker__value--placeholder')}>
          {displayValue || placeholder}
        </span>
        <span className="ui-date-picker__actions">
          {clearEnabled && showClear && !disabled ? (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear value"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onClear();
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  event.stopPropagation();
                  onClear();
                }
              }}
            >
              {clearIcon}
            </span>
          ) : null}
          {suffixIcon}
        </span>
      </button>

      {open ? <div className="ui-date-picker__dropdown">{panel}</div> : null}
      {children}
    </div>
  );
}

const DatePickerBase = forwardRef<HTMLButtonElement, SinglePickerInternalProps>(function DatePickerBase(
  {
    allowClear,
    className,
    defaultOpen = false,
    defaultValue,
    disabled,
    disabledDate,
    format,
    id,
    onChange,
    onOpenChange,
    open,
    picker = 'date',
    placeholder,
    presets,
    showTime,
    size = 'middle',
    status,
    value
  },
  _ref
) {
  const pickerFormat = getFormat(picker, format, showTime);
  const mergedPlaceholder = placeholder ?? (showTime ? 'Select date & time' : 'Select date');
  const clearConfig = mergeAllowClear(allowClear);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Dayjs | null>(defaultValue ?? null);
  const mergedValue = isValueControlled ? value ?? null : internalValue;

  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const mergedOpen = isOpenControlled ? open : internalOpen;

  const [panelDate, setPanelDate] = useState((mergedValue ?? dayjs()).startOf('month'));
  const rootRef = useRef<HTMLDivElement | null>(null);

  const setOpen = useCallback((nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }, [isOpenControlled, onOpenChange]);

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [setOpen]);

  const emitChange = (next: Dayjs | null) => {
    if (!isValueControlled) {
      setInternalValue(next);
    }
    onChange?.(next, formatValue(next, pickerFormat));
  };

  return (
    <div ref={rootRef}>
      <PickerShell
        className={className}
        status={status}
        size={size}
        disabled={disabled}
        inputId={inputId}
        displayValue={formatValue(mergedValue, pickerFormat)}
        placeholder={mergedPlaceholder}
        clearEnabled={clearConfig.enabled}
        clearIcon={clearConfig.icon}
        showClear={Boolean(mergedValue)}
        suffixIcon={DEFAULT_SUFFIX_ICON}
        open={mergedOpen}
        onToggle={() => !disabled && setOpen(!mergedOpen)}
        onClear={() => emitChange(null)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
        panel={
          <>
            <div className="ui-date-picker__header">
              <button type="button" onClick={() => setPanelDate(panelDate.subtract(1, picker === 'year' ? 'year' : 'month'))}>
                <Icon name="chevronDown" className="ui-date-picker__nav ui-date-picker__nav--left" size="0.75rem" />
              </button>
              <span>{panelDate.format(picker === 'year' ? 'YYYY' : 'MMMM YYYY')}</span>
              <button type="button" onClick={() => setPanelDate(panelDate.add(1, picker === 'year' ? 'year' : 'month'))}>
                <Icon name="chevronDown" className="ui-date-picker__nav ui-date-picker__nav--right" size="0.75rem" />
              </button>
            </div>
            <DatePanel
              panelValue={panelDate}
              picker={picker}
              selected={mergedValue}
              disabledDate={disabledDate}
              onSelect={(nextValue) => {
                emitChange(nextValue);
                setOpen(false);
              }}
            />
            {presets?.length ? (
              <div className="ui-date-picker__presets">
                {presets.map((preset) => (
                  <button
                    key={String(preset.label)}
                    type="button"
                    onClick={() => {
                      emitChange(preset.value);
                      setPanelDate(preset.value);
                      setOpen(false);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}
          </>
        }
      />
    </div>
  );
});

const RangePickerBase = forwardRef<HTMLButtonElement, RangePickerInternalProps>(function RangePickerBase(
  {
    allowClear,
    className,
    defaultOpen = false,
    defaultValue,
    disabled,
    disabledDate,
    format,
    id,
    onChange,
    onOpenChange,
    open,
    picker = 'date',
    placeholder,
    presets,
    size = 'middle',
    status,
    value
  },
  _ref
) {
  const pickerFormat = getFormat(picker, format, false);
  const mergedPlaceholder = placeholder ?? 'Start date ~ End date';
  const clearConfig = mergeAllowClear(allowClear);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<[Dayjs | null, Dayjs | null]>(defaultValue ?? [null, null]);
  const mergedValue = isValueControlled ? (value ?? [null, null]) : internalValue;

  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const mergedOpen = isOpenControlled ? open : internalOpen;

  const [panelDate, setPanelDate] = useState((mergedValue[0] ?? dayjs()).startOf('month'));
  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const setOpen = useCallback((nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }, [isOpenControlled, onOpenChange]);

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [setOpen]);

  const emitChange = (next: [Dayjs | null, Dayjs | null]) => {
    if (!isValueControlled) {
      setInternalValue(next);
    }

    if (next[0] && next[1]) {
      onChange?.([next[0], next[1]], [next[0].format(pickerFormat), next[1].format(pickerFormat)]);
      return;
    }

    onChange?.(null, ['', '']);
  };

  const displayValue = mergedValue[0] && mergedValue[1]
    ? `${mergedValue[0].format(pickerFormat)} ~ ${mergedValue[1].format(pickerFormat)}`
    : '';

  return (
    <div ref={rootRef}>
      <PickerShell
        className={className}
        status={status}
        size={size}
        disabled={disabled}
        inputId={inputId}
        displayValue={displayValue}
        placeholder={mergedPlaceholder}
        clearEnabled={clearConfig.enabled}
        clearIcon={clearConfig.icon}
        showClear={Boolean(mergedValue[0] || mergedValue[1])}
        suffixIcon={DEFAULT_SUFFIX_ICON}
        open={mergedOpen}
        onToggle={() => !disabled && setOpen(!mergedOpen)}
        onClear={() => emitChange([null, null])}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
        panel={
          <>
            <div className="ui-date-picker__header">
              <button type="button" onClick={() => setPanelDate(panelDate.subtract(1, 'month'))}>
                <Icon name="chevronDown" className="ui-date-picker__nav ui-date-picker__nav--left" size="0.75rem" />
              </button>
              <span>{panelDate.format('MMMM YYYY')}</span>
              <button type="button" onClick={() => setPanelDate(panelDate.add(1, 'month'))}>
                <Icon name="chevronDown" className="ui-date-picker__nav ui-date-picker__nav--right" size="0.75rem" />
              </button>
            </div>
            <DatePanel
              panelValue={panelDate}
              picker={picker}
              range={mergedValue}
              disabledDate={disabledDate}
              onSelect={(nextValue) => {
                const next: [Dayjs | null, Dayjs | null] = [...mergedValue] as [Dayjs | null, Dayjs | null];
                next[activeIndex] = nextValue;

                if (next[0] && next[1] && next[0].isAfter(next[1], 'day')) {
                  emitChange([next[1], next[0]]);
                } else {
                  emitChange(next);
                }

                if (activeIndex === 0) {
                  setActiveIndex(1);
                } else {
                  setOpen(false);
                  setActiveIndex(0);
                }
              }}
            />
            {presets?.length ? (
              <div className="ui-date-picker__presets">
                {presets.map((preset) => (
                  <button
                    key={String(preset.label)}
                    type="button"
                    onClick={() => {
                      emitChange(preset.value);
                      setPanelDate(preset.value[0]);
                      setOpen(false);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}
          </>
        }
      />
    </div>
  );
});

const withPicker = (picker: PickerMode) => {
  const Picker = forwardRef<HTMLButtonElement, SinglePickerInternalProps>((props, ref) => (
    <DatePickerBase {...props} picker={picker} ref={ref} />
  ));

  Picker.displayName = `DatePicker${picker[0].toUpperCase()}${picker.slice(1)}`;
  return Picker;
};

export const DatePicker = Object.assign(DatePickerBase, {
  RangePicker: RangePickerBase,
  MonthPicker: withPicker('month'),
  WeekPicker: withPicker('week'),
  YearPicker: withPicker('year'),
  QuarterPicker: withPicker('quarter')
});
