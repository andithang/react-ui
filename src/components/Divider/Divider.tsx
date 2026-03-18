import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Divider.scss';

export type DividerType = 'horizontal' | 'vertical';
export type DividerOrientation = 'left' | 'right' | 'center';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  dashed?: boolean;
  plain?: boolean;
  type?: DividerType;
  orientation?: DividerOrientation;
  orientationMargin?: string | number;
  children?: ReactNode;
}

export function Divider({
  dashed = false,
  plain = false,
  type = 'horizontal',
  orientation = 'center',
  orientationMargin,
  children,
  className,
  style,
  ...restProps
}: DividerProps) {
  const lineStyle =
    orientationMargin !== undefined && type === 'horizontal'
      ? ({ '--ui-divider-orientation-margin': typeof orientationMargin === 'number' ? `${orientationMargin}px` : orientationMargin } as CSSProperties)
      : undefined;

  return (
    <div
      role="separator"
      aria-orientation={type === 'vertical' ? 'vertical' : 'horizontal'}
      {...restProps}
      className={cn(
        'ui-divider',
        `ui-divider--${type}`,
        dashed && 'ui-divider--dashed',
        plain && 'ui-divider--plain',
        Boolean(children) && `ui-divider--with-text ui-divider--with-text-${orientation}`,
        className
      )}
      style={{ ...lineStyle, ...style }}
    >
      {children ? <span className="ui-divider__inner-text">{children}</span> : null}
    </div>
  );
}
