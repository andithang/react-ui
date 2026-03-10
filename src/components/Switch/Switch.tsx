import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Switch.scss';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Switch({ label, className, ...props }: SwitchProps) {
  return (
    <label className={cn('ui-switch', className)}>
      <input type="checkbox" className="ui-switch__input" {...props} />
      <span className="ui-switch__track">
        <span className="ui-switch__thumb" />
      </span>
      {label ? <span className="ui-label">{label}</span> : null}
    </label>
  );
}
