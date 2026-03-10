import { HTMLAttributes, ReactNode } from '../../../node_modules/react';
export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content' | 'children'> {
    content: ReactNode;
    children: ReactNode;
    position?: 'top' | 'right' | 'bottom' | 'left';
}
export declare function Tooltip({ content, children, position, className, id, ...props }: TooltipProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map