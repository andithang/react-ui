import { type ReactNode, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { cn } from '../../utils';
import './Modal.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, ariaLabel, children, className }: ModalProps) {
  const generatedId = useId().replace(/:/g, '');
  const titleId = `ui-modal-title-${generatedId}`;

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEscape);
    };
  }, [onClose, open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="ui-modal" role="presentation">
      <button type="button" className="ui-modal__backdrop" onClick={onClose} aria-label="Close dialog" />
      <div
        className={cn('ui-modal__content', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel ?? 'Dialog'}
      >
        <div className="ui-modal__header">
          {title ? <h3 id={titleId}>{title}</h3> : <span />}
          <Button variant="text" size="small" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </Button>
        </div>
        <div className="ui-modal__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
