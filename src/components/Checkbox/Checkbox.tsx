import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FocusEventHandler,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ReactNode
} from 'react';
import { cn } from '../../utils';
import './Checkbox.ant.scss';

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
  title?: string;
  onChange?: (e: T) => void;
  onClick?: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onKeyPress?: KeyboardEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  skipGroup?: boolean;
  required?: boolean;
}

type NativeCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onChange'
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onKeyPress'
  | 'onKeyDown'
  | 'onFocus'
  | 'onBlur'
  | 'className'
  | 'style'
  | 'title'
  | 'defaultChecked'
  | 'checked'
  | 'disabled'
  | 'value'
  | 'tabIndex'
  | 'name'
  | 'children'
  | 'id'
  | 'autoFocus'
  | 'type'
  | 'required'
>;

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export type CheckboxSemanticClassNames = {
  root?: string;
  icon?: string;
  label?: string;
};

export type CheckboxSemanticStyles = {
  root?: CSSProperties;
  icon?: CSSProperties;
  label?: CSSProperties;
};

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent>, NativeCheckboxProps {
  indeterminate?: boolean;
  classNames?: Partial<CheckboxSemanticClassNames>;
  styles?: Partial<CheckboxSemanticStyles>;
}

export interface CheckboxOptionType<T = any> {
  label: ReactNode;
  value: T;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  title?: string;
  id?: string;
  onChange?: (e: CheckboxChangeEvent) => void;
  required?: boolean;
}

export interface AbstractCheckboxGroupProps<T = any> extends Omit<InputHTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  options?: Array<CheckboxOptionType<T> | string | number>;
  disabled?: boolean;
  style?: CSSProperties;
}

export interface CheckboxGroupProps<T = any> extends AbstractCheckboxGroupProps<T> {
  name?: string;
  defaultValue?: T[];
  value?: T[];
  onChange?: (checkedValue: T[]) => void;
  children?: ReactNode;
}

interface CheckboxGroupContextValue<T = any> {
  name?: string;
  disabled?: boolean;
  value: T[];
  toggleOption: (option: CheckboxOptionType<T>) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

function isOptionChecked<T>(values: T[], optionValue: T) {
  return values.some((item) => Object.is(item, optionValue));
}

function buildCheckboxChangeEvent(props: CheckboxProps, event: ChangeEvent<HTMLInputElement>): CheckboxChangeEvent {
  const nextChecked = event.target.checked;

  return {
    target: {
      ...props,
      checked: nextChecked,
      value: props.value ?? event.target.value,
      name: props.name ?? event.target.name,
      id: props.id ?? event.target.id,
      type: 'checkbox',
      disabled: props.disabled ?? event.target.disabled
    },
    stopPropagation: () => event.stopPropagation(),
    preventDefault: () => event.preventDefault(),
    nativeEvent: event.nativeEvent as MouseEvent
  };
}

const InternalCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    prefixCls,
    className,
    rootClassName,
    defaultChecked,
    checked,
    style,
    disabled,
    title,
    onChange,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyPress,
    onKeyDown,
    onFocus,
    onBlur,
    value,
    tabIndex,
    name,
    children,
    id,
    autoFocus,
    type,
    skipGroup,
    required,
    indeterminate,
    classNames,
    styles,
    ...restProps
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const groupContext = useContext(CheckboxGroupContext);
  const inGroup = Boolean(groupContext) && !skipGroup;

  const mergedId = id ?? generatedId;
  const mergedName = inGroup ? name ?? groupContext?.name : name;
  const mergedDisabled = inGroup ? Boolean(groupContext?.disabled || disabled) : disabled;
  const groupChecked = inGroup && value !== undefined ? isOptionChecked(groupContext?.value ?? [], value) : undefined;
  const mergedChecked = groupChecked ?? checked;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate, mergedChecked]);

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(inputRef.current);
      return;
    }

    ref.current = inputRef.current;
  }, [ref]);

  const checkboxPrefix = prefixCls || 'ui-checkbox';
  const checkboxWrapperPrefix = `${checkboxPrefix}-wrapper`;

  const wrapperClassName = cn(
    checkboxWrapperPrefix,
    className,
    mergedChecked && `${checkboxWrapperPrefix}--checked`,
    indeterminate && `${checkboxWrapperPrefix}--indeterminate`,
    mergedDisabled && `${checkboxWrapperPrefix}--disabled`
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const changeEvent = buildCheckboxChangeEvent(
      {
        ...restProps,
        prefixCls,
        className,
        rootClassName,
        defaultChecked,
        checked,
        style,
        disabled,
        title,
        onChange,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onKeyPress,
        onKeyDown,
        onFocus,
        onBlur,
        value,
        tabIndex,
        name,
        children,
        id,
        autoFocus,
        type,
        skipGroup,
        required,
        indeterminate,
        classNames,
        styles
      },
      event
    );

    onChange?.(changeEvent);

    if (inGroup && value !== undefined) {
      groupContext?.toggleOption({
        label: children,
        value,
        style,
        className,
        disabled,
        title,
        id,
        onChange,
        required
      });
    }
  };

  return (
    <label
      className={wrapperClassName}
      style={style}
      title={title}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
    >
      <span className={cn(checkboxPrefix, rootClassName, classNames?.root)} style={styles?.root}>
        <input
          {...restProps}
          ref={inputRef}
          id={mergedId}
          type={type || 'checkbox'}
          className={`${checkboxPrefix}__input`}
          name={mergedName}
          value={value}
          checked={mergedChecked}
          defaultChecked={defaultChecked}
          disabled={mergedDisabled}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          aria-checked={indeterminate ? 'mixed' : undefined}
        />
        <span className={cn(`${checkboxPrefix}__inner`, classNames?.icon)} style={styles?.icon} aria-hidden="true" />
      </span>
      {children ? (
        <span className={cn(`${checkboxPrefix}__label`, classNames?.label)} style={styles?.label}>
          {children}
        </span>
      ) : null}
    </label>
  );
});

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  {
    className,
    rootClassName,
    prefixCls,
    options = [],
    defaultValue = [],
    value,
    onChange,
    name,
    disabled,
    style,
    children,
    ...restProps
  },
  ref
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const mergedValue = isControlled ? value : internalValue;

  const normalizedOptions = useMemo<CheckboxOptionType[]>(() => {
    return options.map((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return { label: option, value: option };
      }

      return option;
    });
  }, [options]);

  const toggleOption = (option: CheckboxOptionType) => {
    const hasValue = isOptionChecked(mergedValue, option.value);
    const nextValue = hasValue ? mergedValue.filter((item) => !Object.is(item, option.value)) : [...mergedValue, option.value];

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  const groupContextValue = useMemo<CheckboxGroupContextValue>(
    () => ({
      name,
      disabled,
      value: mergedValue,
      toggleOption
    }),
    [disabled, mergedValue, name]
  );

  const checkboxPrefix = prefixCls || 'ui-checkbox';
  const checkboxGroupPrefix = `${checkboxPrefix}-group`;

  return (
    <div
      {...restProps}
      ref={ref}
      className={cn(checkboxGroupPrefix, rootClassName, className)}
      style={style}
      role={restProps.role || 'group'}
    >
      <CheckboxGroupContext.Provider value={groupContextValue}>
        {normalizedOptions.length > 0
          ? normalizedOptions.map((option, index) => (
              <InternalCheckbox
                key={`${String(option.value)}-${index}`}
                value={option.value}
                disabled={option.disabled}
                style={option.style}
                className={option.className}
                title={option.title}
                id={option.id}
                required={option.required}
                onChange={option.onChange}
                prefixCls={checkboxPrefix}
              >
                {option.label}
              </InternalCheckbox>
            ))
          : children}
      </CheckboxGroupContext.Provider>
    </div>
  );
});

type CompoundedCheckbox = typeof InternalCheckbox & {
  Group: typeof CheckboxGroup;
};

export const Checkbox = Object.assign(InternalCheckbox, { Group: CheckboxGroup }) as CompoundedCheckbox;
