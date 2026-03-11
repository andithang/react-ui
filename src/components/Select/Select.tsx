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
  type ReactNode,
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
  prefixTitle?: ReactNode;
  enableSelectAll?: boolean;
  selectAllValue?: string | number;
  selectAllLabel?: string;
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

function toValueArray(input: SelectProps['value'] | SelectProps['defaultValue']) {
  if (Array.isArray(input)) {
    return input.map((value) => String(value));
  }

  if (input === undefined || input === null || input === '') {
    return [];
  }

  return [String(input)];
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
  multiple,
  prefixTitle,
  enableSelectAll = false,
  selectAllValue = '-1',
  selectAllLabel = 'Select all',
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState<string[]>(toValueArray(defaultValue));
  const rootRef = useRef<HTMLLabelElement | null>(null);
  const options = useMemo(() => getOptions(children), [children]);
  const isControlled = value !== undefined;
  const selectedValues = useMemo(
    () => (isControlled ? toValueArray(value) : internalValues),
    [internalValues, isControlled, value]
  );
  const selectableValues = useMemo(() => options.filter((option) => !option.disabled).map((option) => option.value), [options]);
  const hasSelectAll = multiple && enableSelectAll;
  const selectAllToken = String(selectAllValue);

  const firstSelectedOption = options.find((option) => selectedValues.includes(option.value));
  const triggerText = multiple
    ? selectedValues.length
      ? options
          .filter((option) => selectedValues.includes(option.value))
          .map((option) => option.label)
          .join(', ')
      : 'Select options'
    : firstSelectedOption?.label ?? options[0]?.label;

  const allSelected = multiple && selectableValues.length > 0 && selectableValues.every((valueItem) => selectedValues.includes(valueItem));

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const emitChange = (nextValues: string[]) => {
    const nextValue = multiple ? nextValues : nextValues[0] ?? '';
    onChange?.({ target: { value: nextValue } } as never);
  };

  const selectOption = (nextValue: string) => {
    if (hasSelectAll && nextValue === selectAllToken) {
      const nextValues = allSelected ? [] : selectableValues;

      if (!isControlled) {
        setInternalValues(nextValues);
      }

      emitChange(nextValues);
      return;
    }

    if (multiple) {
      const nextValues = selectedValues.includes(nextValue)
        ? selectedValues.filter((valueItem) => valueItem !== nextValue)
        : [...selectedValues, nextValue];

      if (!isControlled) {
        setInternalValues(nextValues);
      }

      emitChange(nextValues);
      return;
    }

    if (!isControlled) {
      setInternalValues([nextValue]);
    }

    emitChange([nextValue]);
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
          value={multiple ? selectedValues : selectedValues[0] ?? ''}
          onChange={(event) => selectOption(event.target.value)}
          disabled={disabled}
          multiple={multiple}
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
          <span className="ui-select__trigger-text">
            {prefixTitle ? <span className="ui-select__prefix">{prefixTitle}</span> : null}
            <span>{triggerText}</span>
          </span>
          <span className={cn('ui-select__icon', open && 'ui-select__icon--open')} aria-hidden="true" />
        </button>

        {open ? (
          <div
            id={`${selectId}-menu`}
            role="listbox"
            aria-multiselectable={multiple ? 'true' : undefined}
            className="ui-select__dropdown"
          >
            {hasSelectAll ? (
              <button
                key={selectAllToken}
                type="button"
                role="option"
                className={cn('ui-select__option', allSelected && 'ui-select__option--selected')}
                aria-selected={allSelected}
                onClick={() => selectOption(selectAllToken)}
              >
                <span className="ui-select__option-content">
                  <span
                    className={cn('ui-select__option-checkbox', allSelected && 'ui-select__option-checkbox--checked')}
                    aria-hidden="true"
                  />
                  <span>{selectAllLabel}</span>
                </span>
                {allSelected ? <span className="ui-select__check ui-select__check--end" aria-hidden="true" /> : null}
              </button>
            ) : null}

            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  className={cn('ui-select__option', isSelected && 'ui-select__option--selected')}
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => selectOption(option.value)}
                >
                  <span className="ui-select__option-content">
                    {multiple ? (
                      <span
                        className={cn('ui-select__option-checkbox', isSelected && 'ui-select__option-checkbox--checked')}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span>{option.label}</span>
                  </span>
                  {isSelected ? <span className="ui-select__check ui-select__check--end" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </span>
      {error ? <span className="ui-select__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
