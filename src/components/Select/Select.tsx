import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type OptionHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type UIEvent
} from 'react';
import { Tag } from '../Tag/Tag';
import { cn } from '../../utils';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  groupLabel?: string;
}

interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  prefixTitle?: ReactNode;
  enableSelectAll?: boolean;
  selectAllValue?: string | number;
  selectAllLabel?: string;
  maxSelectedItemsShown?: number;
  onScrollToLoad?: () => void;
  scrollLoadThreshold?: number;
  searchable?: boolean;
  clearable?: boolean;
}

function parseOption(optionChild: ReactElement<OptionHTMLAttributes<HTMLOptionElement>>, groupLabel?: string): SelectOption {
  return {
    value: String(optionChild.props.value ?? ''),
    label: String(optionChild.props.children ?? ''),
    disabled: optionChild.props.disabled,
    groupLabel
  };
}

function getGroupsAndOptions(children: SelectProps['children']) {
  const groups: SelectGroup[] = [];
  const ungrouped: SelectOption[] = [];

  Children.toArray(children).forEach((child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === 'option') {
      ungrouped.push(parseOption(child as ReactElement<OptionHTMLAttributes<HTMLOptionElement>>));
      return;
    }

    if (child.type === 'optgroup') {
      const groupChild = child as ReactElement<{ label?: string; children?: ReactNode }>;
      const groupLabel = String(groupChild.props.label ?? '');
      const groupOptions = Children.toArray(groupChild.props.children)
        .filter((optionChild) => isValidElement(optionChild) && optionChild.type === 'option')
        .map((optionChild) => parseOption(optionChild as ReactElement<OptionHTMLAttributes<HTMLOptionElement>>, groupLabel));

      groups.push({ label: groupLabel, options: groupOptions });
    }
  });

  return {
    groups,
    options: [...ungrouped, ...groups.flatMap((group) => group.options)]
  };
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
  maxSelectedItemsShown = 2,
  onScrollToLoad,
  scrollLoadThreshold = 24,
  searchable = true,
  clearable = true,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internalValues, setInternalValues] = useState<string[]>(toValueArray(defaultValue));
  const rootRef = useRef<HTMLLabelElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const loadLockRef = useRef(false);

  const { options, groups } = useMemo(() => getGroupsAndOptions(children), [children]);
  const isControlled = value !== undefined;
  const selectedValues = useMemo(() => (isControlled ? toValueArray(value) : internalValues), [internalValues, isControlled, value]);
  const selectableValues = useMemo(() => options.filter((option) => !option.disabled).map((option) => option.value), [options]);
  const hasSelectAll = multiple && enableSelectAll;
  const selectAllToken = String(selectAllValue);

  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const selectedLookup = useMemo(() => new Set(selectedValues), [selectedValues]);
  const firstSelectedOption = options.find((option) => selectedLookup.has(option.value));
  const visibleTags = multiple ? selectedOptions.slice(0, maxSelectedItemsShown) : [];
  const hiddenCount = multiple ? Math.max(0, selectedOptions.length - visibleTags.length) : 0;

  const searchableGroups = useMemo(() => {
    const keyword = searchable ? query.trim().toLowerCase() : '';

    const filterOptions = (optionList: SelectOption[]) =>
      keyword ? optionList.filter((option) => option.label.toLowerCase().includes(keyword)) : optionList;

    if (groups.length === 0) {
      return [
        {
          label: '',
          options: filterOptions(options)
        }
      ];
    }

    return groups
      .map((group) => ({ label: group.label, options: filterOptions(group.options) }))
      .filter((group) => group.options.length > 0);
  }, [groups, options, query, searchable]);

  const triggerText = multiple
    ? selectedOptions.length
      ? selectedOptions.map((option) => option.label).join(', ')
      : 'Select options'
    : firstSelectedOption?.label ?? options[0]?.label;

  const allSelected = multiple && selectableValues.length > 0 && selectableValues.every((valueItem) => selectedLookup.has(valueItem));
  const hasSelection = selectedValues.length > 0;

  const focusSearchInput = useCallback(() => {
    if (!searchable) {
      return;
    }

    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  }, [searchable]);


  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }

    focusSearchInput();
  }, [focusSearchInput, open]);

  const emitChange = (nextValues: string[]) => {
    const nextValue = multiple ? nextValues : nextValues[0] ?? '';
    onChange?.({ target: { value: nextValue } } as never);
  };

  const updateValues = (nextValues: string[]) => {
    if (!isControlled) {
      setInternalValues(nextValues);
    }

    emitChange(nextValues);
  };

  const selectOption = (nextValue: string) => {
    if (hasSelectAll && nextValue === selectAllToken) {
      updateValues(allSelected ? [] : selectableValues);
      return;
    }

    if (multiple) {
      const nextValues = selectedLookup.has(nextValue)
        ? selectedValues.filter((valueItem) => valueItem !== nextValue)
        : [...selectedValues, nextValue];

      updateValues(nextValues);
      return;
    }

    updateValues([nextValue]);
    setOpen(false);
  };

  const removeTag = (optionValue: string) => {
    if (!multiple) {
      return;
    }

    updateValues(selectedValues.filter((valueItem) => valueItem !== optionValue));
  };

  const clearAll = () => {
    updateValues([]);
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

  const handleDropdownScroll = (event: UIEvent<HTMLDivElement>) => {
    if (!onScrollToLoad) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const remaining = scrollHeight - (scrollTop + clientHeight);

    if (remaining <= scrollLoadThreshold && !loadLockRef.current) {
      loadLockRef.current = true;
      onScrollToLoad();
      window.setTimeout(() => {
        loadLockRef.current = false;
      }, 300);
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
          onClick={() => {
            setOpen((prev) => !prev);
            focusSearchInput();
          }}
          onKeyDown={onTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${selectId}-menu`}
          disabled={disabled}
        >
          <span className="ui-select__trigger-text">
            {prefixTitle ? <span className="ui-select__prefix">{prefixTitle}</span> : null}

            {multiple ? (
              <span className="ui-select__tags">
                {selectedOptions.length ? (
                  <>
                    {visibleTags.map((option) => (
                      <Tag key={option.value} closable closeAsSpan closeLabel={`Remove ${option.label}`} onClose={() => removeTag(option.value)}>
                        {option.label}
                      </Tag>
                    ))}
                    {hiddenCount > 0 ? <Tag className="ui-select__tag--more">+{hiddenCount}...</Tag> : null}
                  </>
                ) : null}
                {searchable ? (
                  <input
                    type="text"
                    className="ui-select__inline-search"
                    placeholder={selectedOptions.length ? '' : triggerText}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    ref={searchInputRef}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setOpen(true);
                      focusSearchInput();
                    }}
                  />
                ) : selectedOptions.length === 0 ? (
                  <span>{triggerText}</span>
                ) : null}
              </span>
            ) : searchable ? (
              <input
                type="text"
                className="ui-select__inline-search ui-select__inline-search--single"
                placeholder={triggerText}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                ref={searchInputRef}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOpen(true);
                  focusSearchInput();
                }}
              />
            ) : (
              <span>{triggerText}</span>
            )}
          </span>

          <span className="ui-select__actions">
            {clearable && hasSelection ? (
              <span
                className="ui-select__clear"
                role="button"
                tabIndex={0}
                aria-label="Clear selection"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  clearAll();
                }}
              >
                ×
              </span>
            ) : null}
            <span className={cn('ui-select__icon', open && 'ui-select__icon--open')} aria-hidden="true" />
          </span>
        </button>

        {open ? (
          <div
            id={`${selectId}-menu`}
            role="listbox"
            aria-multiselectable={multiple ? 'true' : undefined}
            className="ui-select__dropdown"
            onScroll={handleDropdownScroll}
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
                  <span className={cn('ui-select__option-checkbox', allSelected && 'ui-select__option-checkbox--checked')} aria-hidden="true" />
                  <span>{selectAllLabel}</span>
                </span>
                {allSelected ? <span className="ui-select__check ui-select__check--end" aria-hidden="true" /> : null}
              </button>
            ) : null}

            {searchableGroups.map((group) => (
              <div key={group.label || 'default-group'} className="ui-select__group">
                {group.label ? <div className="ui-select__group-label">{group.label}</div> : null}
                {group.options.map((option) => {
                  const isSelected = selectedLookup.has(option.value);

                  return (
                    <button
                      key={`${group.label}-${option.value}`}
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
            ))}
          </div>
        ) : null}
      </span>
      {error ? <span className="ui-select__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
