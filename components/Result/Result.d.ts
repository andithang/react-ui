import { ReactNode } from '../../../node_modules/react';
export type ResultStatus = 'success' | 'info' | 'warning' | 'error' | '403' | '404' | '500';
export interface ResultProps {
    status?: ResultStatus;
    title?: ReactNode;
    subTitle?: ReactNode;
    icon?: ReactNode;
    extra?: ReactNode;
    children?: ReactNode;
    className?: string;
}
export declare function Result({ status, title, subTitle, icon, extra, children, className }: ResultProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Result.d.ts.map