import {
  forwardRef,
  useMemo,
  useState,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type JSX,
  type ReactNode
} from 'react';
import { cn } from '../../utils';
import { CheckableTag } from './CheckableTag';

export type CheckableTagValue = string | number;

export interface CheckableTagOption<T extends CheckableTagValue> {
  value: T;
  label: ReactNode;
}

interface CheckableTagGroupSingleProps<T extends CheckableTagValue> {
  multiple?: false;
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
}

interface CheckableTagGroupMultipleProps<T extends CheckableTagValue> {
  multiple: true;
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
}

export interface CheckableTagGroupClassNames {
  root?: string;
  item?: string;
}

export interface CheckableTagGroupStyles {
  root?: CSSProperties;
  item?: CSSProperties;
}

type CheckableTagGroupModeProps<T extends CheckableTagValue> =
  | CheckableTagGroupSingleProps<T>
  | CheckableTagGroupMultipleProps<T>;

export type CheckableTagGroupProps<T extends CheckableTagValue = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  CheckableTagGroupModeProps<T> & {
    options?: Array<CheckableTagOption<T> | T>;
    disabled?: boolean;
    classNames?: CheckableTagGroupClassNames;
    styles?: CheckableTagGroupStyles;
  };

type MergedGroupValue<T extends CheckableTagValue> = T[] | T | null;

function toOption<T extends CheckableTagValue>(option: CheckableTagOption<T> | T): CheckableTagOption<T> {
  if (typeof option === 'object' && option !== null && 'value' in option && 'label' in option) {
    return option;
  }

  return {
    value: option as T,
    label: option as ReactNode
  };
}

function InternalCheckableTagGroup<T extends CheckableTagValue>(
  {
    className,
    style,
    options = [],
    value,
    defaultValue,
    onChange,
    multiple,
    disabled = false,
    classNames,
    styles,
    ...props
  }: CheckableTagGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const parsedOptions = useMemo(() => options.map(toOption), [options]);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<MergedGroupValue<T>>(() =>
    multiple ? (defaultValue as T[] | undefined) ?? [] : (defaultValue as T | null | undefined) ?? null
  );
  const mergedValue = (isControlled ? value : internalValue) as MergedGroupValue<T>;
  const selectedLookup = useMemo(() => {
    return new Set(Array.isArray(mergedValue) ? mergedValue : []);
  }, [mergedValue]);

  const updateValue = (nextValue: MergedGroupValue<T>) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    if (multiple) {
      (onChange as ((value: T[]) => void) | undefined)?.((nextValue as T[]) ?? []);
      return;
    }

    (onChange as ((value: T | null) => void) | undefined)?.((nextValue as T | null) ?? null);
  };

  const handleChange = (checked: boolean, option: CheckableTagOption<T>) => {
    if (multiple) {
      const currentValues = (Array.isArray(mergedValue) ? mergedValue : []) as T[];
      const nextValues = checked
        ? Array.from(new Set([...currentValues, option.value]))
        : currentValues.filter((item) => item !== option.value);

      updateValue(nextValues);
      return;
    }

    updateValue(checked ? option.value : null);
  };

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'ui-tag-checkable-group',
        classNames?.root,
        disabled && 'ui-tag-checkable-group--disabled',
        className
      )}
      style={{
        ...styles?.root,
        ...style
      }}
    >
      {parsedOptions.map((option) => {
        const checked = multiple ? selectedLookup.has(option.value) : mergedValue === option.value;
        return (
          <CheckableTag
            key={String(option.value)}
            className={cn('ui-tag-checkable-group__item', classNames?.item)}
            style={styles?.item}
            checked={checked}
            onChange={(nextChecked) => handleChange(nextChecked, option)}
            disabled={disabled}
          >
            {option.label}
          </CheckableTag>
        );
      })}
    </div>
  );
}

export const CheckableTagGroup = forwardRef(InternalCheckableTagGroup) as <T extends CheckableTagValue>(
  props: CheckableTagGroupProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element;
