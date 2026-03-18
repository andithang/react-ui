import { HTMLAttributes, ReactNode } from '../../../node_modules/react';
export type ProgressType = 'line' | 'circle' | 'dashboard';
export type ProgressStatus = 'success' | 'exception' | 'normal' | 'active';
export type ProgressSize = 'default' | 'small' | number | [number | string, number | string];
export type ProgressGapPosition = 'top' | 'bottom' | 'left' | 'right';
export type ProgressStrokeLinecap = 'round' | 'butt' | 'square';
export interface ProgressSuccess {
    percent?: number;
    strokeColor?: string;
}
export interface ProgressSteps {
    count: number;
    gap?: number;
}
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    percent?: number;
    success?: ProgressSuccess;
    successPercent?: number;
    status?: ProgressStatus;
    showInfo?: boolean;
    type?: ProgressType;
    format?: (percent?: number, successPercent?: number) => ReactNode;
    strokeColor?: string;
    strokeLinecap?: ProgressStrokeLinecap;
    strokeWidth?: number;
    trailColor?: string;
    width?: number;
    gapDegree?: number;
    gapPosition?: ProgressGapPosition;
    size?: ProgressSize;
    steps?: number | ProgressSteps;
}
export declare function Progress({ percent, success, successPercent, status, showInfo, type, format, strokeColor, strokeLinecap, strokeWidth, trailColor, width, className, style, size, steps, ...restProps }: ProgressProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Progress.d.ts.map