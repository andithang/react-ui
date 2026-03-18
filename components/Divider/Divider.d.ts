import { HTMLAttributes, ReactNode } from '../../../node_modules/react';
export type DividerType = 'horizontal' | 'vertical';
export type DividerOrientation = 'left' | 'right' | 'center';
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    dashed?: boolean;
    plain?: boolean;
    type?: DividerType;
    orientation?: DividerOrientation;
    orientationMargin?: string | number;
    children?: ReactNode;
}
export declare function Divider({ dashed, plain, type, orientation, orientationMargin, children, className, style, ...restProps }: DividerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map