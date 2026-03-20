import {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
  type ChangeEventHandler,
  type FocusEventHandler,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type ReactNode,
  type WheelEventHandler
} from 'react';
import { cn } from '../../utils';
import './InputNumber.scss';

export type InputNumberSize = 'small' | 'middle' | 'large';
export type InputNumberStatus = 'error' | 'warning';
export type InputNumberVariant = 'outlined' | 'borderless' | 'filled' | 'underlined';
export type InputNumberValue = number | string | null;

export interface InputNumberFormatterInfo {
  userTyping: boolean;
  input: string;
}

export interface InputNumberStepInfo {
  offset: number;
  type: 'up' | 'down';
}

export interface InputNumberControlsConfig {
  upIcon?: ReactNode;
  downIcon?: ReactNode;
}

export interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'prefix' | 'size' | 'type' | 'value'> {
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  bordered?: boolean;
  changeOnWheel?: boolean;
  className?: string;
  controls?: boolean | InputNumberControlsConfig;
  defaultValue?: number | string | null;
  error?: string;
  formatter?: (value: number | string | undefined, info: InputNumberFormatterInfo) => string;
  hint?: string;
  keyboard?: boolean;
  label?: string;
  max?: number;
  min?: number;
  onChange?: (value: InputNumberValue) => void;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  onStep?: (value: number | string, info: InputNumberStepInfo) => void;
  parser?: (displayValue: string | undefined) => string | number;
  precision?: number;
  prefix?: ReactNode;
  rootClassName?: string;
  size?: InputNumberSize;
  status?: InputNumberStatus;
  step?: number;
  stringMode?: boolean;
  suffix?: ReactNode;
  value?: number | string | null;
  variant?: InputNumberVariant;
  wrapperClassName?: string;
}

function toFiniteNumber(input: unknown): number | null {
  if (typeof input === 'number' && Number.isFinite(input)) {
    return input;
  }

  if (typeof input === 'string') {
    const next = Number(input);
    return Number.isFinite(next) ? next : null;
  }

  return null;
}

function clampNumber(value: number, min?: number, max?: number, precision?: number): number {
  let next = value;

  if (typeof min === 'number') {
    next = Math.max(min, next);
  }

  if (typeof max === 'number') {
    next = Math.min(max, next);
  }

  if (typeof precision === 'number') {
    next = Number(next.toFixed(precision));
  }

  return next;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    addonAfter,
    addonBefore,
    bordered,
    changeOnWheel = false,
    className,
    controls = true,
    defaultValue = null,
    disabled,
    error,
    formatter,
    hint,
    id,
    keyboard = true,
    label,
    max,
    min,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onPressEnter,
    onStep,
    onWheel: onWheelProp,
    parser,
    placeholder,
    precision,
    prefix,
    readOnly,
    rootClassName,
    size = 'middle',
    status,
    step = 1,
    stringMode = false,
    suffix,
    value,
    variant,
    wrapperClassName,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? (label ? generatedId : undefined);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<InputNumberValue>(defaultValue);
  const mergedValue = isControlled ? value ?? null : internalValue;
  const [focused, setFocused] = useState(false);
  const [inputText, setInputText] = useState('');

  const resolvedVariant: InputNumberVariant = variantFromProps(bordered, variant);
  const mergedStatus: InputNumberStatus | undefined = error ? 'error' : status;
  const hasAddonBefore = addonBefore !== undefined && addonBefore !== null;
  const hasAddonAfter = addonAfter !== undefined && addonAfter !== null;
  const stepAmount = useMemo(() => (typeof step === 'number' && step > 0 ? step : 1), [step]);
  const controlsConfig = typeof controls === 'object' ? controls : undefined;
  const controlsEnabled = controls !== false && !disabled && !readOnly;

  const formatDisplayValue = useCallback(
    (nextValue: InputNumberValue, userTyping: boolean, input = ''): string => {
      if (nextValue === null || nextValue === undefined || nextValue === '') {
        return '';
      }

      if (formatter) {
        return formatter(nextValue, { userTyping, input });
      }

      if (typeof nextValue === 'number' && typeof precision === 'number' && !stringMode) {
        return nextValue.toFixed(precision);
      }

      return String(nextValue);
    },
    [formatter, precision, stringMode]
  );

  const parseInputValue = useCallback(
    (displayValue: string): InputNumberValue | undefined => {
      const parsed = parser ? parser(displayValue) : displayValue;
      const normalized = String(parsed ?? '').trim();

      if (normalized === '') {
        return null;
      }

      const numeric = toFiniteNumber(normalized);

      if (numeric === null) {
        return undefined;
      }

      const clamped = clampNumber(numeric, min, max, precision);

      if (stringMode) {
        return typeof precision === 'number' ? clamped.toFixed(precision) : String(clamped);
      }

      return clamped;
    },
    [max, min, parser, precision, stringMode]
  );

  const emitValue = useCallback(
    (next: InputNumberValue) => {
      if (!isControlled) {
        setInternalValue(next);
      }

      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const displayValue = focused ? inputText : formatDisplayValue(mergedValue, false);

  const handleStep = useCallback(
    (type: 'up' | 'down') => {
      if (!controlsEnabled) {
        return;
      }

      const currentNumeric = toFiniteNumber(mergedValue);
      const base = currentNumeric ?? (typeof min === 'number' ? min : 0);
      const offset = type === 'up' ? stepAmount : -stepAmount;
      const nextNumeric = clampNumber(base + offset, min, max, precision);
      const nextValue: number | string = stringMode
        ? typeof precision === 'number'
          ? nextNumeric.toFixed(precision)
          : String(nextNumeric)
        : nextNumeric;

      emitValue(nextValue);
      setInputText(formatDisplayValue(nextValue, false));
      onStep?.(nextValue, { offset, type });
    },
    [controlsEnabled, emitValue, formatDisplayValue, max, mergedValue, min, onStep, precision, stepAmount, stringMode]
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextText = event.target.value;
    setInputText(nextText);

    const parsed = parseInputValue(nextText);

    if (parsed === undefined) {
      return;
    }

    emitValue(parsed);

    if (formatter) {
      setInputText(formatDisplayValue(parsed, true, nextText));
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const parsed = parseInputValue(event.target.value);

    if (parsed === undefined) {
      setInputText(formatDisplayValue(mergedValue, false));
      setFocused(false);
      onBlur?.(event);
      return;
    }

    emitValue(parsed);
    setInputText(formatDisplayValue(parsed, false, event.target.value));
    setFocused(false);
    onBlur?.(event);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setInputText(formatDisplayValue(mergedValue, true, event.target.value));
    setFocused(true);
    onFocus?.(event);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (keyboard && !disabled && !readOnly) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        handleStep('up');
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleStep('down');
      }
    }

    if (event.key === 'Enter') {
      onPressEnter?.(event);
    }

    onKeyDown?.(event);
  };

  const handleWheel: WheelEventHandler<HTMLInputElement> = (event) => {
    if (!changeOnWheel || !focused || disabled || readOnly) {
      onWheelProp?.(event);
      return;
    }

    event.preventDefault();
    handleStep(event.deltaY < 0 ? 'up' : 'down');
    onWheelProp?.(event);
  };

  const controlNode = (
    <span className={cn('ui-input-number__group-wrapper', `ui-input-number__group-wrapper--${size}`)}>
      {hasAddonBefore ? (
        <span className={cn('ui-input-number__addon', 'ui-input-number__addon--before')}>{addonBefore}</span>
      ) : null}

      <span
        className={cn(
          'ui-input-number__affix-wrapper',
          `ui-input-number__affix-wrapper--${size}`,
          `ui-input-number__affix-wrapper--${resolvedVariant}`,
          mergedStatus && `ui-input-number__affix-wrapper--${mergedStatus}`,
          hasAddonBefore && 'ui-input-number__affix-wrapper--addon-before',
          hasAddonAfter && 'ui-input-number__affix-wrapper--addon-after',
          controlsEnabled ? 'ui-input-number__affix-wrapper--with-controls' : 'ui-input-number__affix-wrapper--without-controls',
          focused && 'ui-input-number__affix-wrapper--focused',
          disabled && 'ui-input-number__affix-wrapper--disabled',
          className,
          rootClassName
        )}
      >
        {prefix ? <span className="ui-input-number__prefix">{prefix}</span> : null}

        <input
          {...props}
          id={inputId}
          ref={ref}
          type="text"
          className="ui-input-number__input"
          placeholder={placeholder}
          inputMode={props.inputMode ?? 'decimal'}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={mergedStatus === 'error' || undefined}
        />

        {suffix ? <span className="ui-input-number__suffix">{suffix}</span> : null}

        {controlsEnabled ? (
          <span className="ui-input-number__actions" aria-hidden="true">
            <button
              type="button"
              className="ui-input-number__action ui-input-number__action--up"
              onClick={() => handleStep('up')}
              tabIndex={-1}
              aria-label="Increase value"
            >
              {controlsConfig?.upIcon ?? <span aria-hidden="true">&#9650;</span>}
            </button>
            <button
              type="button"
              className="ui-input-number__action ui-input-number__action--down"
              onClick={() => handleStep('down')}
              tabIndex={-1}
              aria-label="Decrease value"
            >
              {controlsConfig?.downIcon ?? <span aria-hidden="true">&#9660;</span>}
            </button>
          </span>
        ) : null}
      </span>

      {hasAddonAfter ? <span className={cn('ui-input-number__addon', 'ui-input-number__addon--after')}>{addonAfter}</span> : null}
    </span>
  );

  if (label) {
    return (
      <label className={cn('ui-input-number', wrapperClassName)} htmlFor={inputId}>
        <span className="ui-label">{label}</span>
        {controlNode}
        {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
      </label>
    );
  }

  return (
    <div className={cn('ui-input-number', wrapperClassName)}>
      {controlNode}
      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </div>
  );
});

InputNumber.displayName = 'InputNumber';

function variantFromProps(bordered: boolean | undefined, variant: InputNumberVariant | undefined): InputNumberVariant {
  if (variant) {
    return variant;
  }

  if (bordered === false) {
    return 'borderless';
  }

  return 'outlined';
}
