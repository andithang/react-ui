import type { CSSProperties, ElementType, HTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Typography.scss';

export type TypographyVariant = 'display' | 'title' | 'subtitle' | 'body' | 'caption' | 'code';
export type TypographyTone = 'default' | 'muted' | 'primary' | 'danger' | 'success';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TypographyVariant;
  tone?: TypographyTone;
}

export function Typography({
  as: Component = 'p',
  variant = 'body',
  tone = 'default',
  className,
  style,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn('ui-typography', `ui-typography--${variant}`, `ui-typography--${tone}`, className)}
      style={style as CSSProperties}
      {...props}
    />
  );
}
