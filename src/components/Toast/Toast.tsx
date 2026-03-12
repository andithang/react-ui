import { useEffect, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Toast.scss';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  open?: boolean;
  message: ReactNode;
  description?: ReactNode;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

export function Toast({ open = true, message, description, type = 'info', duration = 3000, onClose, closable = true, className }: ToastProps) {
  useEffect(() => {
    if (!open || duration <= 0) {
      return;
    }

    const timer = window.setTimeout(() => onClose?.(), duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className={cn('ui-toast', `ui-toast--${type}`, className)} role="status" aria-live="polite">
      <div className="ui-toast__content">
        <strong>{message}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      {closable ? (
        <button type="button" className="ui-toast__close" onClick={onClose} aria-label="Close toast">
          ×
        </button>
      ) : null}
    </div>
  );
}
