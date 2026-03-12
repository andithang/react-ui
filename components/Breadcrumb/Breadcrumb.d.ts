import { ReactNode } from '../../../node_modules/react';
export interface BreadcrumbItem {
    title: ReactNode;
    href?: string;
    onClick?: () => void;
    menu?: {
        items: Array<{
            key: string;
            label: ReactNode;
            onClick?: () => void;
        }>;
    };
}
export interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    separator?: ReactNode;
    className?: string;
}
export declare function Breadcrumb({ items, separator, className }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Breadcrumb.d.ts.map