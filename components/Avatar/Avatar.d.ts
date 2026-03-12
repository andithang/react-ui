import { CSSProperties, ReactNode } from '../../../node_modules/react';
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
export declare function Avatar({ src, alt, icon, children, shape, size, className, style }: AvatarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map