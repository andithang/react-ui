import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Progress.scss';

export type ProgressType = 'line' | 'circle' | 'dashboard';
export type ProgressStatus = 'success' | 'exception' | 'normal' | 'active';
export type ProgressSize = 'default' | 'small' | number | [number | string, number | string];
export type ProgressGapPosition = 'top' | 'bottom' | 'left' | 'right';
export type ProgressStrokeLinecap = 'round' | 'butt' | 'square';

export interface ProgressSuccess {
  percent?: number;
  strokeColor?: string;
}

export interface ProgressSteps {
  count: number;
  gap?: number;
}

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
  percent?: number;
  success?: ProgressSuccess;
  successPercent?: number;
  status?: ProgressStatus;
  showInfo?: boolean;
  type?: ProgressType;
  format?: (percent?: number, successPercent?: number) => ReactNode;
  strokeColor?: string;
  strokeLinecap?: ProgressStrokeLinecap;
  strokeWidth?: number;
  trailColor?: string;
  width?: number;
  gapDegree?: number;
  gapPosition?: ProgressGapPosition;
  size?: ProgressSize;
  steps?: number | ProgressSteps;
}

function clampPercent(value: number | undefined): number {
  if (value === undefined || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function getSizeStyles(size: ProgressSize | undefined): CSSProperties | undefined {
  if (size === undefined || size === 'default') {
    return undefined;
  }

  if (size === 'small') {
    return { '--ui-progress-line-height': '0.375rem' } as CSSProperties;
  }

  if (typeof size === 'number') {
    return {
      '--ui-progress-width': `${size}px`,
      '--ui-progress-height': `${size}px`
    } as CSSProperties;
  }

  return {
    '--ui-progress-width': typeof size[0] === 'number' ? `${size[0]}px` : size[0],
    '--ui-progress-height': typeof size[1] === 'number' ? `${size[1]}px` : size[1]
  } as CSSProperties;
}

export function Progress({
  percent,
  success,
  successPercent,
  status,
  showInfo = true,
  type = 'line',
  format,
  strokeColor,
  strokeLinecap = 'round',
  strokeWidth,
  trailColor,
  width,
  className,
  style,
  size,
  steps,
  ...restProps
}: ProgressProps) {
  const normalizedPercent = clampPercent(percent);
  const normalizedSuccessPercent = clampPercent(success?.percent ?? successPercent);
  const mergedStatus: ProgressStatus =
    status ?? (normalizedPercent >= 100 ? 'success' : normalizedPercent > 0 ? 'active' : 'normal');

  const infoNode = format ? format(normalizedPercent, normalizedSuccessPercent) : `${Math.round(normalizedPercent)}%`;

  const mergedStyle: CSSProperties = {
    ...getSizeStyles(size),
    ...(strokeColor ? ({ '--ui-progress-stroke': strokeColor } as CSSProperties) : null),
    ...(trailColor ? ({ '--ui-progress-trail': trailColor } as CSSProperties) : null),
    ...(strokeWidth && type === 'line' ? ({ '--ui-progress-line-height': `${strokeWidth}px` } as CSSProperties) : null),
    ...(strokeWidth && type !== 'line' ? ({ '--ui-progress-stroke-width': strokeWidth } as CSSProperties) : null),
    ...(width ? ({ '--ui-progress-width': `${width}px`, '--ui-progress-height': `${width}px` } as CSSProperties) : null),
    ...style
  };

  if (type === 'line') {
    const stepConfig: ProgressSteps | null =
      typeof steps === 'number' ? { count: steps, gap: 2 } : steps && steps.count > 0 ? steps : null;

    return (
      <div
        {...restProps}
        className={cn('ui-progress', 'ui-progress--line', `ui-progress--${mergedStatus}`, className)}
        style={mergedStyle}
      >
        <div className="ui-progress__outer">
          {stepConfig ? (
            <div className="ui-progress__steps" role="presentation">
              {Array.from({ length: stepConfig.count }).map((_, index) => {
                const threshold = ((index + 1) / stepConfig.count) * 100;
                const active = normalizedPercent >= threshold;
                return (
                  <span
                    key={index}
                    className={cn('ui-progress__step', active && 'ui-progress__step--active')}
                    style={{
                      marginInlineEnd: index === stepConfig.count - 1 ? 0 : stepConfig.gap ?? 2,
                      ...(success?.strokeColor && active ? ({ '--ui-progress-step-color': success.strokeColor } as CSSProperties) : null)
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="ui-progress__track">
              <div
                className={cn('ui-progress__bar', mergedStatus === 'active' && 'ui-progress__bar--active')}
                style={{
                  width: `${normalizedPercent}%`,
                  borderRadius: strokeLinecap === 'square' ? 0 : undefined
                }}
              />
              {normalizedSuccessPercent > 0 ? (
                <div
                  className="ui-progress__success"
                  style={{
                    width: `${normalizedSuccessPercent}%`,
                    background: success?.strokeColor
                  }}
                />
              ) : null}
            </div>
          )}
        </div>
        {showInfo ? <span className="ui-progress__text">{infoNode}</span> : null}
      </div>
    );
  }

  const circlePercent = type === 'dashboard' ? normalizedPercent * 0.75 : normalizedPercent;
  const radius = 47;
  const pathLength = 2 * Math.PI * radius;
  const dashOffset = pathLength * (1 - circlePercent / 100);

  return (
    <div
      {...restProps}
      className={cn('ui-progress', `ui-progress--${type}`, `ui-progress--${mergedStatus}`, className)}
      style={mergedStyle}
    >
      <div className="ui-progress__circle-wrap">
        <svg className="ui-progress__circle" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="ui-progress__circle-trail" cx="50" cy="50" r={radius} />
          <circle
            className={cn('ui-progress__circle-path', mergedStatus === 'active' && 'ui-progress__circle-path--active')}
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            strokeLinecap={strokeLinecap}
          />
        </svg>
        {showInfo ? <span className="ui-progress__circle-text">{infoNode}</span> : null}
      </div>
    </div>
  );
}
