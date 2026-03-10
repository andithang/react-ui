import { HTMLAttributes } from '../../../node_modules/react';
import { SpaceScale } from '../../styles/tokens';
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    padding?: SpaceScale;
    radius?: 'none' | 'sm' | 'md' | 'lg';
    surface?: boolean;
}
export declare function Box({ padding, radius, surface, className, style, ...props }: BoxProps): import("react/jsx-runtime").JSX.Element;
export interface FlexProps extends BoxProps {
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    gap?: SpaceScale;
    wrap?: boolean;
}
export declare function Flex({ direction, align, justify, gap, wrap, style, ...props }: FlexProps): import("react/jsx-runtime").JSX.Element;
export interface GridProps extends BoxProps {
    columns?: number;
    minColumnWidth?: string;
    gap?: SpaceScale;
}
export declare function Grid({ columns, minColumnWidth, gap, style, ...props }: GridProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Box.d.ts.map