import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  Children,
  type ForwardedRef,
  createContext,
  forwardRef,
  type MouseEvent,
  type MouseEventHandler,
  type MutableRefObject,
  type RefCallback,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from 'react';
import { cn } from '../../utils';
import './Button.scss';

const _BUTTON_TYPES = ['default', 'primary', 'dashed', 'link', 'text'] as const;
const _BUTTON_SHAPES = ['default', 'circle', 'round', 'square'] as const;
const _BUTTON_HTML_TYPES = ['submit', 'button', 'reset'] as const;
const _BUTTON_VARIANTS = ['outlined', 'dashed', 'solid', 'filled', 'text', 'link'] as const;
const _BUTTON_COLORS = [
  'default',
  'primary',
  'danger',
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold'
] as const;

export type ButtonType = (typeof _BUTTON_TYPES)[number];
export type ButtonShape = (typeof _BUTTON_SHAPES)[number];
export type ButtonHTMLType = (typeof _BUTTON_HTML_TYPES)[number];
export type ButtonVariantType = (typeof _BUTTON_VARIANTS)[number];
export type ButtonColorType = (typeof _BUTTON_COLORS)[number];
export type LegacyButtonType = ButtonType | 'danger';
export type SizeType = 'small' | 'medium' | 'middle' | 'large' | undefined;
export type ButtonSize = SizeType;
export type ButtonVariant = ButtonVariantType;

export type ButtonSemanticClassNames = {
  root?: string;
  icon?: string;
  content?: string;
};

export type ButtonSemanticStyles = {
  root?: CSSProperties;
  icon?: CSSProperties;
  content?: CSSProperties;
};

type Resolvable<T, P> = T | ((info: { props: P }) => T);

export type ButtonClassNamesType = Resolvable<Readonly<ButtonSemanticClassNames>, BaseButtonProps>;
export type ButtonStylesType = Resolvable<Readonly<ButtonSemanticStyles>, BaseButtonProps>;

export interface BaseButtonProps {
  type?: ButtonType;
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  iconPlacement?: 'start' | 'end';
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?:
    | boolean
    | {
        delay?: number;
        icon?: ReactNode;
      };
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: ReactNode;
  [key: `data-${string}`]: string;
  classNames?: ButtonClassNamesType;
  styles?: ButtonStylesType;
  _skipSemantic?: boolean;
}

type MergedHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement> &
    ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>,
  'type' | 'color'
>;

export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  href?: string;
  htmlType?: ButtonHTMLType;
  autoInsertSpace?: boolean;
}

export interface ButtonGroupProps {
  size?: SizeType;
  style?: CSSProperties;
  className?: string;
  prefixCls?: string;
  children?: ReactNode;
}

type ButtonElement = HTMLAnchorElement | HTMLButtonElement;

const TWO_CN_CHAR = /^[\u4E00-\u9FA5]{2}$/;

const BUTTON_TYPE_MAP: Record<ButtonType, readonly [ButtonColorType, ButtonVariantType]> = {
  default: ['default', 'outlined'],
  primary: ['primary', 'solid'],
  dashed: ['default', 'dashed'],
  link: ['default', 'link'],
  text: ['default', 'text']
};

function isTwoCNChar(value: string) {
  return TWO_CN_CHAR.test(value);
}

function isUnBorderedButtonVariant(type?: ButtonVariantType): type is 'link' | 'text' {
  return type === 'text' || type === 'link';
}

function resolveSemantic<T, P>(value: Resolvable<T, P> | undefined, props: P) {
  if (!value) {
    return undefined;
  }

  return typeof value === 'function' ? (value as (info: { props: P }) => T)({ props }) : value;
}

function getLoadingConfig(loading: ButtonProps['loading']) {
  if (typeof loading === 'object' && loading) {
    const delay = typeof loading.delay === 'number' && !Number.isNaN(loading.delay) ? loading.delay : 0;
    return {
      loading: delay <= 0,
      delay
    };
  }

  return {
    loading: !!loading,
    delay: 0
  };
}

function mergeRefs<T>(refs: Array<ForwardedRef<T> | undefined>, value: T | null) {
  refs.forEach((ref) => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(value);
      return;
    }

    (ref as MutableRefObject<T | null>).current = value;
  });
}

export const GroupSizeContext = createContext<SizeType>(undefined);

function ButtonGroup({ size, style, className, prefixCls = 'ui-button-group', children }: ButtonGroupProps) {
  return (
    <GroupSizeContext.Provider value={size}>
      <div className={cn('ui-button-group', prefixCls !== 'ui-button-group' && prefixCls, className)} style={style}>
        {children}
      </div>
    </GroupSizeContext.Provider>
  );
}

const InternalButton = forwardRef<ButtonElement, ButtonProps>(function InternalButton(props, ref) {
  const {
    loading = false,
    prefixCls,
    color,
    variant,
    type = 'default',
    danger = false,
    shape = 'default',
    size: customSize,
    disabled = false,
    className,
    rootClassName,
    children,
    icon,
    iconPosition,
    iconPlacement,
    ghost = false,
    block = false,
    htmlType = 'button',
    classNames,
    styles,
    style,
    autoInsertSpace = true,
    autoFocus,
    href,
    onClick,
    ...rest
  } = props;

  const groupSize = useContext(GroupSizeContext);
  const loadingConfig = useMemo(() => getLoadingConfig(loading), [loading]);
  const [innerLoading, setInnerLoading] = useState(loadingConfig.loading);
  const elementRef = useRef<ButtonElement | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let syncTimer: ReturnType<typeof setTimeout> | undefined;
    if (loadingConfig.delay > 0) {
      syncTimer = setTimeout(() => {
        setInnerLoading(false);
      }, 0);
      timer = setTimeout(() => {
        setInnerLoading(true);
      }, loadingConfig.delay);
    } else {
      syncTimer = setTimeout(() => {
        setInnerLoading(loadingConfig.loading);
      }, 0);
    }

    return () => {
      if (syncTimer) {
        clearTimeout(syncTimer);
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [loadingConfig.delay, loadingConfig.loading]);

  useEffect(() => {
    if (autoFocus) {
      elementRef.current?.focus();
    }
  }, [autoFocus]);

  const [parsedColor, parsedVariant] = useMemo<[ButtonColorType, ButtonVariantType]>(() => {
    if (color && variant) {
      return [color, variant];
    }

    const defaultPair = BUTTON_TYPE_MAP[type] ?? BUTTON_TYPE_MAP.default;
    if (danger) {
      return ['danger', defaultPair[1]];
    }

    return [color ?? defaultPair[0], variant ?? defaultPair[1]];
  }, [color, variant, danger, type]);

  const [mergedColor, mergedVariant] = useMemo<[ButtonColorType, ButtonVariantType]>(() => {
    if (ghost && parsedVariant === 'solid') {
      return [parsedColor, 'outlined'];
    }

    return [parsedColor, parsedVariant];
  }, [ghost, parsedColor, parsedVariant]);

  const mergedSize = customSize ?? groupSize ?? 'middle';
  const sizeForClass = mergedSize === 'medium' ? 'middle' : mergedSize;
  const mergedIconPlacement = iconPlacement ?? iconPosition ?? 'start';
  const mergedDisabled = !!disabled;
  const hasChildren = children !== null && children !== undefined;
  const iconType = innerLoading ? 'loading' : icon;
  const mergedColorText = mergedColor === 'danger' ? 'dangerous' : mergedColor;

  const mergedProps: BaseButtonProps = {
    ...props,
    type,
    color: mergedColor,
    variant: mergedVariant,
    danger: mergedColor === 'danger',
    shape,
    size: mergedSize,
    disabled: mergedDisabled,
    loading: innerLoading,
    iconPlacement: mergedIconPlacement
  };

  const resolvedClassNames = resolveSemantic(classNames, mergedProps);
  const resolvedStyles = resolveSemantic(styles, mergedProps);
  const childNodes = Children.toArray(children);
  const needInserted = childNodes.length === 1 && !icon && !isUnBorderedButtonVariant(mergedVariant);
  const child = childNodes[0];
  const hasTwoCNChar = !innerLoading && needInserted && autoInsertSpace && typeof child === 'string' && isTwoCNChar(child);

  const classes = cn(
    'ui-button',
    prefixCls && prefixCls !== 'ui-button' && prefixCls,
    shape !== 'default' && shape !== 'square' && `ui-button-${shape}`,
    `ui-button-${type}`,
    mergedColor === 'danger' && 'ui-button-dangerous',
    `ui-button-color-${mergedColorText}`,
    `ui-button-variant-${mergedVariant}`,
    sizeForClass === 'large' && 'ui-button-lg',
    sizeForClass === 'small' && 'ui-button-sm',
    !hasChildren && !!iconType && 'ui-button-icon-only',
    ghost && !isUnBorderedButtonVariant(mergedVariant) && 'ui-button-background-ghost',
    innerLoading && 'ui-button-loading',
    hasTwoCNChar && 'ui-button-two-chinese-chars',
    block && 'ui-button-block',
    mergedIconPlacement === 'end' && 'ui-button-icon-end',
    resolvedClassNames?.root,
    rootClassName,
    className
  );

  const mergedStyle: CSSProperties = {
    ...resolvedStyles?.root,
    ...style
  };

  const spacedChild = hasTwoCNChar && typeof child === 'string' ? child.split('').join(' ') : children;

  const loadingIcon =
    typeof loading === 'object' && loading?.icon ? (
      loading.icon
    ) : (
      <span className="ui-button__loading-icon" aria-hidden="true" />
    );

  const iconNode = icon && !innerLoading ? icon : innerLoading ? loadingIcon : null;

  const iconElement = iconNode ? (
    <span className={cn('ui-button__icon', resolvedClassNames?.icon)} style={resolvedStyles?.icon}>
      {iconNode}
    </span>
  ) : null;

  const contentElement = hasChildren ? (
    <span className={cn('ui-button__content', resolvedClassNames?.content)} style={resolvedStyles?.content}>
      {spacedChild}
    </span>
  ) : null;

  const setRef = useCallback(
    (value: ButtonElement | null) => {
      elementRef.current = value;
      mergeRefs([ref], value);
    },
    [ref]
  );

  const handleClick = useCallback(
    (event: MouseEvent<ButtonElement>) => {
      if (innerLoading || mergedDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    },
    [innerLoading, mergedDisabled, onClick]
  );

  if (href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorProps}
        href={mergedDisabled ? undefined : href}
        className={cn(classes, mergedDisabled && 'ui-button-disabled')}
        style={mergedStyle}
        onClick={handleClick as MouseEventHandler<HTMLAnchorElement>}
        ref={setRef as RefCallback<HTMLAnchorElement>}
        tabIndex={mergedDisabled ? -1 : anchorProps.tabIndex}
        aria-disabled={mergedDisabled}
      >
        {iconElement}
        {contentElement}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonProps}
      type={htmlType}
      className={classes}
      style={mergedStyle}
      onClick={handleClick as MouseEventHandler<HTMLButtonElement>}
      disabled={mergedDisabled}
      ref={setRef as RefCallback<HTMLButtonElement>}
    >
      {iconElement}
      {contentElement}
    </button>
  );
});

type ButtonComponent = typeof InternalButton & {
  Group: typeof ButtonGroup;
};

export const Button = InternalButton as ButtonComponent;
Button.Group = ButtonGroup;
