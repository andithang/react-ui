import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Dropdown.scss';

export interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger?: ReactNode;
  items: DropdownMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (nextOpen: boolean) => void;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  className?: string;
}

export function Dropdown({ trigger, items, open, defaultOpen = false, onOpenChange, placement = 'bottomLeft', className }: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className={cn('ui-dropdown', className)} ref={rootRef}>
      <button type="button" className="ui-dropdown__trigger" onClick={() => setOpen(!isOpen)}>
        {trigger ?? 'Open'}
      </button>
      {isOpen ? (
        <div className={cn('ui-dropdown__menu', `ui-dropdown__menu--${placement}`)} role="menu">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              className={cn('ui-dropdown__item', item.danger && 'ui-dropdown__item--danger')}
              onClick={() => {
                if (item.disabled) {
                  return;
                }

                item.onClick?.();
                setOpen(false);
              }}
              disabled={item.disabled}
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
