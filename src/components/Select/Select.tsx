import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type OptionHTMLAttributes,
  type ReactElement,
  type SelectHTMLAttributes
} from 'react';
import { cn } from '../../utils';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

function getOptions(children: SelectProps['children']): SelectOption[] {
  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === 'option')
    .map((child) => {
      const optionChild = child as ReactElement<OptionHTMLAttributes<HTMLOptionElement>>;
      return {
        value: String(optionChild.props.value ?? ''),
        label: String(optionChild.props.children ?? ''),
        disabled: optionChild.props.disabled
      };
    });
}

export function Select({
  label,
  hint,
  error,
  id,
  className,
  children,
  value,
  defaultValue,
  onChange,
  disabled,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ''));
  const rootRef = useRef<HTMLLabelElement | null>(null);
  const options = useMemo(() => getOptions(children), [children]);
  const isControlled = value !== undefined;
  const selectedValue = String(isControlled ? value : internalValue);

  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const selectOption = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.({ target: { value: nextValue } } as never);
    setOpen(false);
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  return (
    <label ref={rootRef} className={cn('ui-select', className)} htmlFor={selectId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <span className="ui-select__wrap">
        <select
          id={selectId}
          className={cn('ui-select__native', 'ui-control', error && 'ui-control--error')}
          value={selectedOption?.value}
          onChange={(event) => selectOption(event.target.value)}
          disabled={disabled}
          {...props}
        >
          {children}
        </select>

        <button
          type="button"
          className={cn('ui-control', 'ui-select__trigger', error && 'ui-control--error')}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={onTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${selectId}-menu`}
          disabled={disabled}
        >
          <span className="ui-select__trigger-text">{selectedOption?.label}</span>
          <span className={cn('ui-select__icon', open && 'ui-select__icon--open')} aria-hidden="true" />
        </button>

        {open ? (
          <div id={`${selectId}-menu`} role="listbox" className="ui-select__dropdown">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                className={cn('ui-select__option', option.value === selectedValue && 'ui-select__option--selected')}
                aria-selected={option.value === selectedValue}
                disabled={option.disabled}
                onClick={() => selectOption(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </span>
      {error ? <span className="ui-select__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
