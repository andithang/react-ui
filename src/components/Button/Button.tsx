import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('ui-button', `ui-button--${variant}`, `ui-button--${size}`, className)}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon ? <span className="ui-button__icon">{leftIcon}</span> : null}
      <span className="ui-button__label">{loading ? 'Loading...' : children}</span>
      {rightIcon ? <span className="ui-button__icon">{rightIcon}</span> : null}
    </button>
  );
}
