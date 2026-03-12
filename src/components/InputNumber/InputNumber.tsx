import { useId, useState, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './InputNumber.scss';

export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  size?: 'small' | 'middle' | 'large';
  value?: number;
  defaultValue?: number;
  controls?: boolean;
  onChange?: (value: number | null) => void;
}

export function InputNumber({
  id,
  className,
  label,
  hint,
  error,
  min,
  max,
  step = 1,
  precision,
  size = 'middle',
  value,
  defaultValue,
  controls = true,
  onChange,
  ...props
}: InputNumberProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue ?? null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const emit = (next: number | null) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const clamp = (num: number) => {
    let next = num;
    if (typeof min === 'number') next = Math.max(min, next);
    if (typeof max === 'number') next = Math.min(max, next);
    if (typeof precision === 'number') next = Number(next.toFixed(precision));
    return next;
  };

  return (
    <label className={cn('ui-input-number', className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <span className="ui-input-number__wrap">
        {controls ? (
          <button type="button" className="ui-input-number__btn" onClick={() => emit(clamp((currentValue ?? 0) - step))}>
            -
          </button>
        ) : null}
        <input
          id={inputId}
          type="number"
          className={cn('ui-control', `ui-input-number--${size}`, error && 'ui-control--error')}
          min={min}
          max={max}
          step={step}
          value={currentValue ?? ''}
          onChange={(event) => {
            const next = event.target.value === '' ? null : clamp(Number(event.target.value));
            emit(next);
          }}
          {...props}
        />
        {controls ? (
          <button type="button" className="ui-input-number__btn" onClick={() => emit(clamp((currentValue ?? 0) + step))}>
            +
          </button>
        ) : null}
      </span>
      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
