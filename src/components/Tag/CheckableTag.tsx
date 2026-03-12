import { forwardRef, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../utils';

export interface CheckableTagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked: boolean;
  icon?: ReactNode;
  onChange?: (checked: boolean) => void;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  disabled?: boolean;
}

export const CheckableTag = forwardRef<HTMLSpanElement, CheckableTagProps>(function CheckableTag(
  { checked, icon, className, children, onChange, onClick, onKeyDown, disabled = false, ...props },
  ref
) {
  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (disabled) {
      return;
    }

    onChange?.(!checked);
    onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <span
      {...props}
      ref={ref}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'ui-tag',
        'ui-tag--checkable',
        checked && 'ui-tag--checkable-checked',
        disabled && 'ui-tag--checkable-disabled',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon ? <span className="ui-tag__icon">{icon}</span> : null}
      {children ? <span className="ui-tag__content">{children}</span> : null}
    </span>
  );
});
