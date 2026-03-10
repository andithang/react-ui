import { ElementType, HTMLAttributes } from '../../../node_modules/react';
export type TypographyVariant = 'display' | 'title' | 'subtitle' | 'body' | 'caption' | 'code';
export type TypographyTone = 'default' | 'muted' | 'primary' | 'danger' | 'success';
export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    variant?: TypographyVariant;
    tone?: TypographyTone;
}
export declare function Typography({ as: Component, variant, tone, className, style, ...props }: TypographyProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Typography.d.ts.map