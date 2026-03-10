import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Radio.scss';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Radio({ label, className, ...props }: RadioProps) {
  return (
    <label className={cn('ui-radio', className)}>
      <input type="radio" className="ui-radio__input" {...props} />
      <span className="ui-radio__dot" aria-hidden="true" />
      {label ? <span className="ui-label">{label}</span> : null}
    </label>
  );
}
