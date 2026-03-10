import { useId, type SelectHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Select.scss';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Select({ label, hint, error, id, className, children, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <label className={cn('ui-select', className)} htmlFor={selectId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <span className="ui-select__wrap">
        <select id={selectId} className={cn('ui-control', error && 'ui-control--error')} {...props}>
          {children}
        </select>
      </span>
      {error ? <span className="ui-select__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
