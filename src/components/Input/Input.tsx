import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Input.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label className={cn('ui-input', className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <input id={inputId} className={cn('ui-control', error && 'ui-control--error')} {...props} />
      {error ? <span className="ui-input__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
