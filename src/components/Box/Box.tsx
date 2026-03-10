import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { SpaceScale, spaceTokenMap } from '../../styles/tokens';
import './Box.scss';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  padding?: SpaceScale;
  radius?: 'none' | 'sm' | 'md' | 'lg';
  surface?: boolean;
}

export function Box({
  padding = 'none',
  radius = 'none',
  surface = false,
  className,
  style,
  ...props
}: BoxProps) {
  return (
    <div
      className={cn('ui-box', surface && 'ui-box--surface', className)}
      style={
        {
          ...style,
          '--box-padding': spaceTokenMap[padding],
          '--box-radius': radius === 'none' ? '0px' : `var(--ui-radius-${radius})`
        } as CSSProperties
      }
      {...props}
    />
  );
}

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: SpaceScale;
  wrap?: boolean;
}

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch'
} as const;

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly'
} as const;

export function Flex({
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = 'none',
  wrap = false,
  style,
  ...props
}: FlexProps) {
  return (
    <Box
      {...props}
      className={cn('ui-flex', props.className)}
      style={
        {
          ...style,
          '--flex-direction': direction,
          '--flex-align': alignMap[align],
          '--flex-justify': justifyMap[justify],
          '--flex-gap': spaceTokenMap[gap],
          '--flex-wrap': wrap ? 'wrap' : 'nowrap'
        } as CSSProperties
      }
    />
  );
}

export interface GridProps extends BoxProps {
  columns?: number;
  minColumnWidth?: string;
  gap?: SpaceScale;
}

export function Grid({ columns = 2, minColumnWidth = '12rem', gap = 'md', style, ...props }: GridProps) {
  return (
    <Box
      {...props}
      className={cn('ui-grid', props.className)}
      style={
        {
          ...style,
          '--grid-columns': `${columns}`,
          '--grid-gap': spaceTokenMap[gap],
          '--grid-min-width': minColumnWidth
        } as CSSProperties
      }
    />
  );
}
