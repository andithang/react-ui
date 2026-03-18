import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Empty.scss';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  image?: ReactNode;
  imageStyle?: CSSProperties;
  description?: ReactNode;
  children?: ReactNode;
}

function EmptyDefaultImage() {
  return (
    <svg viewBox="0 0 120 90" role="img" aria-hidden="true" className="ui-empty__svg">
      <ellipse cx="60" cy="78" rx="42" ry="8" fill="color-mix(in srgb, var(--ui-border) 70%, transparent)" />
      <path d="M20 62l19-33h42l19 33z" fill="color-mix(in srgb, var(--ui-primary) 12%, var(--ui-surface))" stroke="var(--ui-border)" />
      <circle cx="60" cy="44" r="9" fill="var(--ui-primary)" opacity="0.85" />
      <rect x="54" y="40" width="12" height="8" rx="2" fill="var(--ui-primary-contrast)" opacity="0.9" />
    </svg>
  );
}

function EmptySimpleImage() {
  return (
    <svg viewBox="0 0 64 42" role="img" aria-hidden="true" className="ui-empty__svg ui-empty__svg--simple">
      <rect x="10" y="8" width="44" height="26" rx="4" fill="none" stroke="var(--ui-border-strong)" strokeDasharray="4 3" />
      <circle cx="24" cy="20" r="3" fill="var(--ui-text-muted)" />
      <path d="M20 28l8-8 6 6 4-4 6 6" fill="none" stroke="var(--ui-primary)" strokeWidth="2" />
    </svg>
  );
}

function InternalEmpty({ image = <EmptyDefaultImage />, imageStyle, description = 'No data', children, className, ...restProps }: EmptyProps) {
  return (
    <div {...restProps} className={cn('ui-empty', className)}>
      <div className="ui-empty__image" style={imageStyle}>
        {image}
      </div>
      {description ? <div className="ui-empty__description">{description}</div> : null}
      {children ? <div className="ui-empty__footer">{children}</div> : null}
    </div>
  );
}

export type EmptyType = typeof InternalEmpty & {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
};

export const Empty = InternalEmpty as EmptyType;

Empty.PRESENTED_IMAGE_DEFAULT = <EmptyDefaultImage />;
Empty.PRESENTED_IMAGE_SIMPLE = <EmptySimpleImage />;
