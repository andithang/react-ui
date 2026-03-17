import {
  forwardRef,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode
} from 'react';
import { cn } from '../../utils';
import { CheckableTag, type CheckableTagProps } from './CheckableTag';
import { CheckableTagGroup, type CheckableTagGroupProps } from './CheckableTagGroup';
import './Tag.scss';
import { Icon } from '../Icon/Icon';

const PRESET_COLORS = new Set([
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
] as const);

const STATUS_COLORS = new Set(['success', 'processing', 'error', 'warning', 'default'] as const);

export type TagPresetColor =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple';

export type TagStatusColor = 'success' | 'processing' | 'error' | 'warning' | 'default';

export type TagColor = TagPresetColor | TagStatusColor | (string & {});

export type TagVariant = 'filled' | 'solid' | 'outlined';

export interface TagSemanticClassNames {
  root?: string;
  icon?: string;
  content?: string;
  closeIcon?: string;
}

export interface TagSemanticStyles {
  root?: CSSProperties;
  icon?: CSSProperties;
  content?: CSSProperties;
  closeIcon?: CSSProperties;
}

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  rootClassName?: string;
  color?: TagColor;
  variant?: TagVariant;
  closable?: boolean;
  closeIcon?: ReactNode | boolean;
  onClose?: (event: MouseEvent<HTMLElement>) => void;
  icon?: ReactNode;
  bordered?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  classNames?: TagSemanticClassNames;
  styles?: TagSemanticStyles;
}

function isPresetColor(color: string): color is TagPresetColor {
  return PRESET_COLORS.has(color as TagPresetColor);
}

function isStatusColor(color: string): color is TagStatusColor {
  return STATUS_COLORS.has(color as TagStatusColor);
}

const InternalTag = forwardRef<HTMLSpanElement | HTMLAnchorElement, TagProps>(function InternalTag(
  {
    prefixCls = 'ui-tag',
    className,
    rootClassName,
    style,
    children,
    icon,
    color,
    variant,
    closable = false,
    closeIcon,
    onClose,
    bordered,
    href,
    target,
    rel,
    disabled = false,
    classNames,
    styles,
    onClick,
    onKeyDown,
    ...restProps
  },
  ref
) {
  const [visible, setVisible] = useState(true);
  const mergedVariant: TagVariant = variant ?? (bordered === false ? 'filled' : 'outlined');
  const normalizedColor = color?.toLowerCase();
  const presetColor = normalizedColor && isPresetColor(normalizedColor) ? normalizedColor : undefined;
  const statusColor = normalizedColor && isStatusColor(normalizedColor) ? normalizedColor : undefined;
  const customColor = normalizedColor && !presetColor && !statusColor ? color : undefined;
  const isLinkTag = Boolean(href);
  const isClickable = (typeof onClick === 'function' || isLinkTag) && !disabled;
  const shouldRenderClose =
    !disabled && (closable || closeIcon !== undefined) && closeIcon !== false && closeIcon !== null;

  const mergedStyle = useMemo(() => {
    const nextStyle: CSSProperties = {
      ...styles?.root,
      ...style
    };

    if (customColor && !disabled) {
      Object.assign(nextStyle, { '--ui-tag-custom-color': customColor } as Record<string, string>);
    }

    return nextStyle;
  }, [customColor, disabled, style, styles?.root]);

  const closeTag = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
    onClose?.(event as unknown as MouseEvent<HTMLElement>);
    const closePrevented = event.defaultPrevented;

    if (isLinkTag) {
      event.preventDefault();
    }

    if (!closePrevented) {
      setVisible(false);
    }
  };

  const handleCloseClick = (event: MouseEvent<HTMLElement>) => {
    closeTag(event);
  };

  const handleCloseKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    closeTag(event);
  };

  const handleTagKeyDown = (event: KeyboardEvent<HTMLAnchorElement | HTMLSpanElement>) => {
    onKeyDown?.(event as unknown as KeyboardEvent<HTMLSpanElement>);

    if (event.defaultPrevented || !isClickable || isLinkTag) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as unknown as MouseEvent<HTMLSpanElement>);
    }
  };

  if (!visible) {
    return null;
  }

  const closeIconNode = (() => {
    if (!shouldRenderClose) return null;
    if (closeIcon === true || closeIcon === undefined) return <Icon name='closeOutline' />;
    return closeIcon;
  })();

  const childNode = (
    <>
      {icon ? (
        <span className={cn(`${prefixCls}__icon`, classNames?.icon)} style={styles?.icon}>
          {icon}
        </span>
      ) : null}
      {children ? (
        <span className={cn(`${prefixCls}__content`, classNames?.content)} style={styles?.content}>
          {children}
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    prefixCls,
    `${prefixCls}--${mergedVariant}`,
    classNames?.root,
    rootClassName,
    className,
    isClickable && `${prefixCls}--interactive`,
    disabled && `${prefixCls}--disabled`,
    presetColor && `${prefixCls}--color-${presetColor}`,
    statusColor && `${prefixCls}--color-${statusColor}`,
    customColor && `${prefixCls}--custom-color`
  );

  const commonProps = {
    ...restProps,
    ref: ref as never,
    className: classes,
    style: mergedStyle,
    ...(disabled ? { 'aria-disabled': true } : {})
  };

  if (isLinkTag) {
    return (
      <a
        {...commonProps}
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        onClick={disabled ? undefined : (onClick as HTMLAttributes<HTMLAnchorElement>['onClick'])}
      >
        {childNode}
        {closeIconNode ? (
          <span
            className={cn(`${prefixCls}__close-icon`, classNames?.closeIcon)}
            style={styles?.closeIcon}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleCloseKeyDown}
            onClick={handleCloseClick}
          >
            {closeIconNode}
          </span>
        ) : null}
      </a>
    );
  }

  return (
    <span
      {...commonProps}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : restProps.tabIndex}
      onKeyDown={handleTagKeyDown}
      onClick={disabled ? undefined : onClick}
    >
      {childNode}
      {closeIconNode ? (
        <span
          className={cn(`${prefixCls}__close-icon`, classNames?.closeIcon)}
          style={styles?.closeIcon}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleCloseKeyDown}
          onClick={handleCloseClick}
        >
          {closeIconNode}
        </span>
      ) : null}
    </span>
  );
});

export type TagType = typeof InternalTag & {
  CheckableTag: typeof CheckableTag;
  CheckableTagGroup: typeof CheckableTagGroup;
};

export const Tag = InternalTag as TagType;

Tag.CheckableTag = CheckableTag;
Tag.CheckableTagGroup = CheckableTagGroup;

export { CheckableTag, CheckableTagGroup };
export type { CheckableTagProps, CheckableTagGroupProps };
