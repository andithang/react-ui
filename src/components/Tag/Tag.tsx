import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cn } from '../../utils';
import './Tag.scss';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  closable?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  closeAsSpan?: boolean;
  children: ReactNode;
}

export function Tag({
  closable = false,
  onClose,
  closeLabel = 'Remove tag',
  closeAsSpan = false,
  className,
  children,
  ...props
}: TagProps) {
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose?.();
  };

  return (
    <span className={cn('ui-tag', className)} {...props}>
      <span className="ui-tag__text">{children}</span>
      {closable ? (
        closeAsSpan ? (
          <span className="ui-tag__close" role="button" tabIndex={0} aria-label={closeLabel} onClick={handleClose}>
            ×
          </span>
        ) : (
          <button type="button" className="ui-tag__close" aria-label={closeLabel} onClick={handleClose}>
            ×
          </button>
        )
      ) : null}
    </span>
  );
}
