import { CSSProperties, ReactNode } from '../../../node_modules/react';
export type PaginationAlign = 'start' | 'center' | 'end';
export type PaginationPosition = 'top' | 'bottom' | 'both';
export type PaginationSize = 'default' | 'small';
export type PaginationItemRender = (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', element: ReactNode) => ReactNode;
export type PaginationShowTotal = (total: number, range: [number, number]) => ReactNode;
export type PaginationProps = {
    className?: string;
    style?: CSSProperties;
    total?: number;
    current?: number;
    defaultCurrent?: number;
    pageSize?: number;
    defaultPageSize?: number;
    disabled?: boolean;
    hideOnSinglePage?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: Array<string | number>;
    showQuickJumper?: boolean | {
        goButton?: ReactNode;
    };
    showLessItems?: boolean;
    showTitle?: boolean;
    showTotal?: PaginationShowTotal;
    simple?: boolean | {
        readOnly?: boolean;
    };
    responsive?: boolean;
    size?: PaginationSize;
    align?: PaginationAlign;
    pageBufferSize?: number;
    locale?: {
        items_per_page?: string;
        jump_to?: string;
        jump_to_confirm?: string;
        page?: string;
        prev_page?: string;
        next_page?: string;
        prev_5?: string;
        next_5?: string;
    };
    itemRender?: PaginationItemRender;
    onChange?: (page: number, pageSize: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
};
export declare function Pagination({ className, style, total, current, defaultCurrent, pageSize, defaultPageSize, disabled, hideOnSinglePage, showSizeChanger, pageSizeOptions, showQuickJumper, showLessItems, showTitle, showTotal, simple, size, align, pageBufferSize, locale, itemRender, onChange, onShowSizeChange }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Pagination.d.ts.map