import { CSSProperties, HTMLAttributes, ReactNode, UIEvent } from '../../../node_modules/react';
import { PaginationProps } from '../Pagination/Pagination';
export type AnyObject = Record<string, unknown>;
export type SortOrder = 'ascend' | 'descend';
export type FilterValue = Array<string | number | boolean> | null;
export type ColumnFilterItem = {
    text: ReactNode;
    value: string | number | boolean;
};
export type CompareFn<RecordType> = (a: RecordType, b: RecordType) => number;
export type TableColumnType<RecordType = AnyObject> = {
    key?: string;
    title?: ReactNode;
    dataIndex?: keyof RecordType & string;
    align?: 'left' | 'center' | 'right';
    ellipsis?: boolean;
    width?: number | string;
    render?: (value: unknown, record: RecordType, index: number) => ReactNode;
    sorter?: boolean | CompareFn<RecordType>;
    sortOrder?: SortOrder;
    defaultSortOrder?: SortOrder;
    filters?: ColumnFilterItem[];
    filteredValue?: FilterValue;
    defaultFilteredValue?: FilterValue;
    onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
};
export type ColumnsType<RecordType = AnyObject> = Array<TableColumnType<RecordType>>;
export type TablePaginationPosition = 'bottomRight';
export type TablePaginationConfig = PaginationProps & {
    position?: TablePaginationPosition[];
};
export type TableLocale = {
    emptyText?: ReactNode;
};
export type TableOnChangeExtra<RecordType = AnyObject> = {
    currentDataSource: RecordType[];
    action: 'paginate' | 'sort' | 'filter';
};
export type TableOnChange<RecordType = AnyObject> = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: {
    columnKey?: string;
    order?: SortOrder;
}, extra: TableOnChangeExtra<RecordType>) => void;
export type TableOnRow<RecordType = AnyObject> = (record: RecordType, index?: number) => HTMLAttributes<HTMLTableRowElement>;
export type TableOnHeaderRow<RecordType = AnyObject> = (columns: ColumnsType<RecordType>, index: number) => HTMLAttributes<HTMLTableRowElement>;
export type TableOnScroll = (event: UIEvent<HTMLDivElement>) => void;
export type TableOnExpand<RecordType = AnyObject> = (expanded: boolean, record: RecordType) => void;
export type TableOnExpandedRowsChange = (expandedRows: Array<string | number>) => void;
export type TableProps<RecordType = AnyObject> = {
    className?: string;
    style?: CSSProperties;
    columns: ColumnsType<RecordType>;
    dataSource?: RecordType[];
    rowKey?: (keyof RecordType & string) | ((record: RecordType) => string | number);
    loading?: boolean;
    bordered?: boolean;
    size?: 'small' | 'middle' | 'large';
    locale?: TableLocale;
    pagination?: false | TablePaginationConfig;
    onChange?: TableOnChange<RecordType>;
    onRow?: TableOnRow<RecordType>;
    onHeaderRow?: TableOnHeaderRow<RecordType>;
    onScroll?: TableOnScroll;
    expandedRowRender?: (record: RecordType, index: number) => ReactNode;
    rowExpandable?: (record: RecordType) => boolean;
    expandedRowKeys?: Array<string | number>;
    defaultExpandedRowKeys?: Array<string | number>;
    onExpand?: TableOnExpand<RecordType>;
    onExpandedRowsChange?: TableOnExpandedRowsChange;
};
export declare function Table<RecordType extends AnyObject = AnyObject>({ className, style, columns, dataSource, rowKey, loading, bordered, size, locale, pagination, onChange, onRow, onHeaderRow, onScroll, expandedRowRender, rowExpandable, expandedRowKeys, defaultExpandedRowKeys, onExpand, onExpandedRowsChange }: TableProps<RecordType>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Table.d.ts.map