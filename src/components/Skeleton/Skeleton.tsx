import { type ReactNode } from 'react';
import { cn } from '../../utils';
import './Skeleton.scss';

export interface SkeletonProps {
  active?: boolean;
  loading?: boolean;
  avatar?: boolean;
  title?: boolean;
  paragraph?: { rows?: number; width?: number | string | Array<number | string> };
  round?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Skeleton({
  active = true,
  loading = true,
  avatar = false,
  title = true,
  paragraph = { rows: 3 },
  round = false,
  className,
  children
}: SkeletonProps) {
  if (!loading) {
    return <>{children}</>;
  }

  const rows = paragraph?.rows ?? 3;
  return (
    <div className={cn('ui-skeleton', active && 'ui-skeleton--active', round && 'ui-skeleton--round', className)}>
      {avatar ? <span className="ui-skeleton__avatar" /> : null}
      <div className="ui-skeleton__content">
        {title ? <span className="ui-skeleton__title" /> : null}
        <div className="ui-skeleton__paragraph">
          {Array.from({ length: rows }).map((_, index) => (
            <span key={index} className="ui-skeleton__line" />
          ))}
        </div>
      </div>
    </div>
  );
}
