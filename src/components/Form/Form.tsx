import type { FormHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../utils';
import './Form.scss';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  gap?: 'sm' | 'md' | 'lg';
}

export function Form({ children, className, gap = 'md', ...props }: PropsWithChildren<FormProps>) {
  return (
    <form className={cn('ui-form', `ui-form--${gap}`, className)} {...props}>
      {children}
    </form>
  );
}
