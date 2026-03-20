import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type ReactNode
} from 'react';
import { Icon } from '../Icon/Icon';
import { cn } from '../../utils';
import './Input.scss';

export type InputSize = 'small' | 'middle' | 'large';
export type InputStatus = 'error' | 'warning';
export type InputVariant = 'outlined' | 'borderless' | 'filled' | 'underlined';

export interface InputShowCountFormatterInfo {
  value: string;
  count: number;
  maxLength?: number;
}

export interface InputShowCountConfig {
  formatter?: (info: InputShowCountFormatterInfo) => ReactNode;
}

export interface InputAllowClearConfig {
  clearIcon?: ReactNode;
}

export type InputSemanticDOM =
  | 'groupWrapper'
  | 'affixWrapper'
  | 'input'
  | 'prefix'
  | 'suffix'
  | 'count'
  | 'clear'
  | 'addonBefore'
  | 'addonAfter';

export type InputClassNames = Partial<Record<InputSemanticDOM, string>>;
export type InputStyles = Partial<Record<InputSemanticDOM, CSSProperties>>;

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  allowClear?: boolean | InputAllowClearConfig;
  bordered?: boolean;
  classNames?: InputClassNames;
  rootClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: InputSize;
  status?: InputStatus;
  variant?: InputVariant;
  styles?: InputStyles;
  showCount?: boolean | InputShowCountConfig;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  onClear?: () => void;
}

function normalizeInputValue(value: InputProps['value'] | InputProps['defaultValue']): string {
  if (value === undefined || value === null) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.join(',');
  }

  return String(value);
}

function resolveCountContent(
  showCount: InputProps['showCount'],
  count: number,
  maxLength?: number,
  value = ''
): ReactNode {
  if (!showCount) {
    return null;
  }

  if (typeof showCount === 'object' && showCount.formatter) {
    return showCount.formatter({ value, count, maxLength });
  }

  if (typeof maxLength === 'number') {
    return `${count} / ${maxLength}`;
  }

  return count;
}

export function Input({
  label,
  hint,
  error,
  id,
  className,
  rootClassName,
  addonBefore,
  addonAfter,
  allowClear,
  bordered,
  classNames,
  prefix,
  suffix,
  size = 'middle',
  status,
  variant,
  styles,
  showCount,
  onPressEnter,
  onClear,
  onChange,
  onKeyDown,
  value,
  defaultValue,
  disabled,
  readOnly,
  maxLength,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState(() => normalizeInputValue(defaultValue));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? normalizeInputValue(value) : internalValue;
  const mergedVariant: InputVariant = variantFromProps(bordered, variant);
  const mergedStatus: InputStatus | undefined = error ? 'error' : status;

  const showCounter = Boolean(showCount);
  const countContent = resolveCountContent(showCount, currentValue.length, maxLength, currentValue);
  const canClear = Boolean(allowClear) && currentValue.length > 0 && !disabled && !readOnly;
  const clearIcon = typeof allowClear === 'object' ? allowClear.clearIcon : null;
  const hasAddonBefore = addonBefore !== undefined && addonBefore !== null;
  const hasAddonAfter = addonAfter !== undefined && addonAfter !== null;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }

    onChange?.(event);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onPressEnter?.(event);
    }

    onKeyDown?.(event);
  };

  const handleClear = () => {
    const inputElement = inputRef.current;

    if (!inputElement) {
      return;
    }

    const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

    if (valueSetter) {
      valueSetter.call(inputElement, '');
    } else {
      inputElement.value = '';
    }

    inputElement.dispatchEvent(new Event('input', { bubbles: true }));

    if (!isControlled) {
      setInternalValue('');
    }

    onClear?.();
    inputElement.focus();
  };

  return (
    <label className={cn('ui-input', className, rootClassName)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <span
        className={cn('ui-input__group-wrapper', `ui-input__group-wrapper--${size}`, classNames?.groupWrapper)}
        style={styles?.groupWrapper}
      >
        {hasAddonBefore ? (
          <span
            className={cn('ui-input__addon', 'ui-input__addon--before', classNames?.addonBefore)}
            style={styles?.addonBefore}
          >
            {addonBefore}
          </span>
        ) : null}

        <span
          className={cn(
            'ui-input__affix-wrapper',
            `ui-input__affix-wrapper--${size}`,
            `ui-input__affix-wrapper--${mergedVariant}`,
            mergedStatus && `ui-input__affix-wrapper--${mergedStatus}`,
            hasAddonBefore && 'ui-input__affix-wrapper--addon-before',
            hasAddonAfter && 'ui-input__affix-wrapper--addon-after',
            disabled && 'ui-input__affix-wrapper--disabled',
            classNames?.affixWrapper
          )}
          style={styles?.affixWrapper}
        >
          {prefix ? (
            <span className={cn('ui-input__prefix', classNames?.prefix)} style={styles?.prefix}>
              {prefix}
            </span>
          ) : null}

          <input
            {...props}
            id={inputId}
            ref={inputRef}
            className={cn('ui-input__control', classNames?.input)}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={isControlled ? value : undefined}
            defaultValue={isControlled ? undefined : defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            style={styles?.input}
          />

          {canClear ? (
            <button
              type="button"
              className={cn('ui-input__clear', classNames?.clear)}
              style={styles?.clear}
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
              aria-label="Clear input"
            >
              {clearIcon ?? <Icon name="closeOutline" size="0.75rem" />}
            </button>
          ) : null}

          {suffix ? (
            <span className={cn('ui-input__suffix', classNames?.suffix)} style={styles?.suffix}>
              {suffix}
            </span>
          ) : null}

          {showCounter ? (
            <span className={cn('ui-input__count', classNames?.count)} style={styles?.count}>
              {countContent}
            </span>
          ) : null}
        </span>

        {hasAddonAfter ? (
          <span className={cn('ui-input__addon', 'ui-input__addon--after', classNames?.addonAfter)} style={styles?.addonAfter}>
            {addonAfter}
          </span>
        ) : null}
      </span>
      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}

function variantFromProps(bordered: boolean | undefined, variant: InputVariant | undefined): InputVariant {
  if (variant) {
    return variant;
  }

  if (bordered === false) {
    return 'borderless';
  }

  return 'outlined';
}
