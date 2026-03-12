import { ReactNode } from '../../../node_modules/react';
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';
export interface StepItem {
    title: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    status?: StepStatus;
}
export interface StepsProps {
    items: StepItem[];
    current?: number;
    direction?: 'horizontal' | 'vertical';
    className?: string;
}
export declare function Steps({ items, current, direction, className }: StepsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Steps.d.ts.map