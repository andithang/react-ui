import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode
} from 'react';
import { Input, type InputProps } from '../Input/Input';
import { cn } from '../../utils';
import './AutoComplete.scss';

export interface AutoCompleteOption {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'options'> {
  options?: AutoCompleteOption[];
  open?: boolean;
  defaultOpen?: boolean;
  popupClassName?: string;
  dropdownMatchSelectWidth?: boolean | number;
  notFoundContent?: ReactNode;
  filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
  backfill?: boolean;
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

export function AutoComplete({
  options = [],
  open,
  defaultOpen,
  popupClassName,
  dropdownMatchSelectWidth = true,
  notFoundContent = 'Not Found',
  filterOption = true,
  backfill,
  onSearch,
  onSelect,
  onDropdownVisibleChange,
  onOpenChange,
  onChange,
  value,
  defaultValue,
  className,
  ...props
}: AutoCompleteProps) {
  const [innerOpen, setInnerOpen] = useState(Boolean(defaultOpen));
  const [innerValue, setInnerValue] = useState<string>(String(defaultValue ?? ''));
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const controlled = value !== undefined;
  const inputValue = controlled ? String(value ?? '') : innerValue;
  const mergedOpen = open ?? innerOpen;

  const filteredOptions = useMemo(() => {
    if (typeof filterOption === 'function') {
      return options.filter((option) => filterOption(inputValue, option));
    }

    if (filterOption === false || !inputValue) {
      return options;
    }

    return options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));
  }, [filterOption, inputValue, options]);

  const updateOpen = (nextOpen: boolean) => {
    if (open === undefined) {
      setInnerOpen(nextOpen);
    }
    onDropdownVisibleChange?.(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        updateOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  });

  const emitChange = (next: string) => {
    if (!controlled) {
      setInnerValue(next);
    }
    onSearch?.(next);
    onChange?.({ target: { value: next } } as never);
  };

  const choose = (option: AutoCompleteOption) => {
    emitChange(option.value);
    onSelect?.(option.value, option);
    updateOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!mergedOpen) {
      if (event.key === 'ArrowDown') {
        updateOpen(true);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option && !option.disabled) {
        choose(option);
      }
      return;
    }

    if (event.key === 'Escape') {
      updateOpen(false);
    }
  };

  return (
    <div className={cn('ui-autocomplete', className)} ref={rootRef}>
      <Input
        {...props}
        value={controlled ? value : innerValue}
        defaultValue={controlled ? undefined : defaultValue}
        onChange={(event) => {
          const next = String(event.target.value ?? '');
          emitChange(next);
          updateOpen(true);
        }}
        onFocus={() => updateOpen(true)}
        onKeyDown={onKeyDown}
      />

      {mergedOpen ? (
        <div
          className={cn('ui-autocomplete__dropdown', popupClassName)}
          style={
            dropdownMatchSelectWidth
              ? { width: typeof dropdownMatchSelectWidth === 'number' ? dropdownMatchSelectWidth : '100%' }
              : undefined
          }
        >
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <button
                type="button"
                key={option.value}
                className={cn(
                  'ui-autocomplete__option',
                  activeIndex === index && 'is-active',
                  option.disabled && 'is-disabled',
                  option.className
                )}
                style={option.style}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => !option.disabled && choose(option)}
              >
                {option.label ?? option.value}
              </button>
            ))
          ) : (
            <div className="ui-autocomplete__empty">{notFoundContent}</div>
          )}
        </div>
      ) : null}

      {backfill && activeIndex >= 0 ? <div className="ui-autocomplete__ghost">{filteredOptions[activeIndex]?.value}</div> : null}
    </div>
  );
}
