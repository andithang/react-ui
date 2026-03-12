import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Avatar.scss';

export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'small' | 'default' | 'large' | number;

export interface AvatarProps {
  src?: string;
  alt?: string;
  icon?: ReactNode;
  children?: ReactNode;
  shape?: AvatarShape;
  size?: AvatarSize;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

export function Avatar({ src, alt, icon, children, shape = 'circle', size = 'default', className, style }: AvatarProps) {
  const customSize = typeof size === 'number' ? { width: size, height: size, fontSize: size * 0.4 } : undefined;

  return (
    <span className={cn('ui-avatar', `ui-avatar--${shape}`, typeof size === 'string' && `ui-avatar--${size}`, className)} style={{ ...customSize, ...style }}>
      {src ? <img src={src} alt={alt} className="ui-avatar__img" /> : icon ?? children ?? '?'}
    </span>
  );
}
