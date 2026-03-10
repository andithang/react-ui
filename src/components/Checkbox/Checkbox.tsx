import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Checkbox.scss';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Checkbox({ label, hint, className, ...props }: CheckboxProps) {
  return (
    <label className={cn('ui-check', className)}>
      <input type="checkbox" className="ui-check__input" {...props} />
      <span className="ui-check__box" aria-hidden="true" />
      <span className="ui-check__text">
        {label ? <span className="ui-label">{label}</span> : null}
        {hint ? <span className="ui-helptext">{hint}</span> : null}
      </span>
    </label>
  );
}
