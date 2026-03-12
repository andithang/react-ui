import { ReactNode } from '../../../node_modules/react';
export interface SkeletonProps {
    active?: boolean;
    loading?: boolean;
    avatar?: boolean;
    title?: boolean;
    paragraph?: {
        rows?: number;
        width?: number | string | Array<number | string>;
    };
    round?: boolean;
    className?: string;
    children?: ReactNode;
}
export declare function Skeleton({ active, loading, avatar, title, paragraph, round, className, children }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map