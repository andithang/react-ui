import { type HTMLAttributes, type ReactNode, useId } from 'react';
import { cn } from '../../utils';
import './Tooltip.scss';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content' | 'children'> {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ content, children, position = 'top', className, id, ...props }: TooltipProps) {
  const generatedId = useId().replace(/:/g, '');
  const tooltipId = id ? `${id}-bubble` : `ui-tooltip-${generatedId}`;

  return (
    <span className={cn('ui-tooltip', className)} id={id} {...props}>
      {children}
      <span className={cn('ui-tooltip__bubble', `ui-tooltip__bubble--${position}`)} id={tooltipId} role="tooltip">
        {content}
      </span>
    </span>
  );
}
