import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Badge.scss';

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';
export type BadgeSize = 'default' | 'small';
export type BadgeRibbonPlacement = 'start' | 'end';

export interface BadgeClassNames {
  root?: string;
  indicator?: string;
  statusDot?: string;
  statusText?: string;
  ribbon?: string;
  ribbonText?: string;
}

export interface BadgeStyles {
  root?: CSSProperties;
  indicator?: CSSProperties;
  statusDot?: CSSProperties;
  statusText?: CSSProperties;
  ribbon?: CSSProperties;
  ribbonText?: CSSProperties;
}

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  prefixCls?: string;
  classNames?: BadgeClassNames;
  styles?: BadgeStyles;
  count?: ReactNode;
  dot?: boolean;
  overflowCount?: number;
  showZero?: boolean;
  status?: BadgeStatus;
  color?: string;
  text?: ReactNode;
  offset?: [number, number];
  size?: BadgeSize;
  title?: string;
  children?: ReactNode;
}

export interface BadgeRibbonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'text'> {
  prefixCls?: string;
  text?: ReactNode;
  color?: string;
  placement?: BadgeRibbonPlacement;
  classNames?: Pick<BadgeClassNames, 'ribbon' | 'ribbonText'>;
  styles?: Pick<BadgeStyles, 'ribbon' | 'ribbonText'>;
  children?: ReactNode;
}

function isEmptyCount(count: ReactNode): boolean {
  return count === null || count === undefined || count === '';
}

function getDisplayCount(count: ReactNode, overflowCount: number): ReactNode {
  if (typeof count !== 'number') {
    return count;
  }

  return count > overflowCount ? `${overflowCount}+` : count;
}

function InternalBadge({
  prefixCls = 'ui-badge',
  className,
  style,
  classNames,
  styles,
  count,
  dot = false,
  overflowCount = 99,
  showZero = false,
  status,
  color,
  text,
  offset,
  size = 'default',
  title,
  children,
  ...restProps
}: BadgeProps) {
  const hasStandaloneStatus = !children && (status || color) && !dot;
  const displayCount = getDisplayCount(count, overflowCount);
  const isZero = displayCount === 0 || displayCount === '0';
  const hiddenByZero = isZero && !showZero;
  const hiddenByEmpty = isEmptyCount(displayCount) && !dot;
  const hiddenIndicator = hiddenByZero || hiddenByEmpty;

  const indicatorStyle: CSSProperties = {
    ...styles?.indicator,
    ...(offset
      ? {
          marginTop: offset[1],
          insetInlineEnd: `calc(${offset[0]}px * -1)`
        }
      : null),
    ...(color ? ({ '--ui-badge-color': color } as CSSProperties) : null)
  };

  const indicatorClassName = cn(
    `${prefixCls}__indicator`,
    `${prefixCls}__indicator--${size}`,
    dot && `${prefixCls}__indicator--dot`,
    color && `${prefixCls}__indicator--custom`,
    status && `${prefixCls}__indicator--status-${status}`,
    hiddenIndicator && `${prefixCls}__indicator--hidden`,
    classNames?.indicator
  );

  if (hasStandaloneStatus) {
    return (
      <span
        {...restProps}
        className={cn(prefixCls, `${prefixCls}--status`, classNames?.root, className)}
        style={{ ...styles?.root, ...style }}
      >
        <span
          className={cn(
            `${prefixCls}__status-dot`,
            status && `${prefixCls}__status-dot--${status}`,
            color && `${prefixCls}__status-dot--custom`,
            classNames?.statusDot
          )}
          style={{ ...styles?.statusDot, ...(color ? ({ '--ui-badge-color': color } as CSSProperties) : null) }}
        />
        {text ? (
          <span className={cn(`${prefixCls}__status-text`, classNames?.statusText)} style={styles?.statusText}>
            {text}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span {...restProps} className={cn(prefixCls, classNames?.root, className)} style={{ ...styles?.root, ...style }}>
      {children ? <span className={cn(`${prefixCls}__content`)}>{children}</span> : null}
      {(dot || !hiddenIndicator) && (
        <sup className={indicatorClassName} style={indicatorStyle} title={title ?? (typeof displayCount === 'string' ? displayCount : undefined)}>
          {dot ? null : displayCount}
        </sup>
      )}
      {!children && text ? (
        <span className={cn(`${prefixCls}__status-text`, classNames?.statusText)} style={styles?.statusText}>
          {text}
        </span>
      ) : null}
    </span>
  );
}

function BadgeRibbon({
  prefixCls = 'ui-badge-ribbon',
  className,
  style,
  classNames,
  styles,
  text,
  color,
  placement = 'end',
  children,
  ...restProps
}: BadgeRibbonProps) {
  return (
    <div {...restProps} className={cn(prefixCls, className)} style={style}>
      {children}
      {text ? (
        <span
          className={cn(`${prefixCls}__text`, `${prefixCls}__text--${placement}`, classNames?.ribbon)}
          style={{ ...styles?.ribbon, ...(color ? ({ '--ui-badge-ribbon-color': color } as CSSProperties) : null) }}
        >
          <span className={cn(`${prefixCls}__content`, classNames?.ribbonText)} style={styles?.ribbonText}>
            {text}
          </span>
        </span>
      ) : null}
    </div>
  );
}

export type BadgeType = typeof InternalBadge & {
  Ribbon: typeof BadgeRibbon;
};

export const Badge = InternalBadge as BadgeType;
Badge.Ribbon = BadgeRibbon;
