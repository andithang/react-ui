import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Spinner.scss';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
}

export function Spinner({ className, size, style, ...props }: SpinnerProps) {
  return (
    <span
      className={cn('ui-spinner', className)}
      style={{ ...style, '--spinner-size': size ? `${size}px` : undefined } as CSSProperties}
      {...props}
    />
  );
}
