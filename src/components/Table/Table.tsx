import { Fragment, type CSSProperties, type HTMLAttributes, type ReactNode, type UIEvent, useMemo, useState } from 'react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Pagination, type PaginationProps } from '../Pagination/Pagination';
import { cn } from '../../utils';
import './Table.scss';

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

export type TableOnChange<RecordType = AnyObject> = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: { columnKey?: string; order?: SortOrder },
  extra: TableOnChangeExtra<RecordType>
) => void;

export type TableOnRow<RecordType = AnyObject> = (record: RecordType, index?: number) => HTMLAttributes<HTMLTableRowElement>;
export type TableOnHeaderRow<RecordType = AnyObject> = (
  columns: ColumnsType<RecordType>,
  index: number
) => HTMLAttributes<HTMLTableRowElement>;
export type TableOnScroll = (event: UIEvent<HTMLDivElement>) => void;
export type TableOnExpand<RecordType = AnyObject> = (expanded: boolean, record: RecordType) => void;
export type TableOnExpandedRowsChange = (expandedRows: Array<string | number>) => void;

export type TableProps<RecordType = AnyObject> = {
  className?: string;
  style?: CSSProperties;
  columns: ColumnsType<RecordType>;
  dataSource?: RecordType[];
  rowKey?: keyof RecordType & string | ((record: RecordType) => string | number);
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

function getRowKey<RecordType extends AnyObject>(record: RecordType, rowKey: TableProps<RecordType>['rowKey'], index: number) {
  if (typeof rowKey === 'function') return rowKey(record);
  if (typeof rowKey === 'string' && rowKey in record) return String(record[rowKey] as string | number);
  if ('key' in record) return String(record.key as string | number);
  return String(index);
}

export function Table<RecordType extends AnyObject = AnyObject>({
  className,
  style,
  columns,
  dataSource = [],
  rowKey,
  loading,
  bordered,
  size = 'middle',
  locale,
  pagination = {},
  onChange,
  onRow,
  onHeaderRow,
  onScroll,
  expandedRowRender,
  rowExpandable,
  expandedRowKeys,
  defaultExpandedRowKeys,
  onExpand,
  onExpandedRowsChange
}: TableProps<RecordType>) {
  const [internalSort, setInternalSort] = useState<{ columnKey?: string; order?: SortOrder }>({});
  const [internalFilters, setInternalFilters] = useState<Record<string, FilterValue | null>>({});
  const [internalPage, setInternalPage] = useState((pagination && pagination.defaultCurrent) || 1);
  const [internalPageSize, setInternalPageSize] = useState((pagination && pagination.defaultPageSize) || 10);
  const [internalExpandedRows, setInternalExpandedRows] = useState<Array<string | number>>(defaultExpandedRowKeys ?? []);

  const mergedPage = pagination && pagination.current ? pagination.current : internalPage;
  const mergedPageSize = pagination && pagination.pageSize ? pagination.pageSize : internalPageSize;
  const mergedExpandedRows = expandedRowKeys ?? internalExpandedRows;

  const processedRows = useMemo(() => {
    let rows = [...dataSource];

    columns.forEach((column, idx) => {
      const key = column.key ?? column.dataIndex ?? String(idx);
      const values = column.filteredValue ?? internalFilters[key] ?? column.defaultFilteredValue;
      if (values?.length) {
        rows = rows.filter((record) => {
          if (column.onFilter) return values.some((value) => column.onFilter?.(value, record));
          if (!column.dataIndex) return true;
          return values.includes(record[column.dataIndex] as string | number | boolean);
        });
      }
    });

    const sorterColumn = columns.find((column, idx) => {
      const key = column.key ?? column.dataIndex ?? String(idx);
      const order = column.sortOrder ?? (internalSort.columnKey === key ? internalSort.order : column.defaultSortOrder);
      return Boolean(column.sorter && order);
    });

    if (sorterColumn && typeof sorterColumn.sorter === 'function') {
      const sorterIndex = columns.indexOf(sorterColumn);
      const sorterKey = sorterColumn.key ?? sorterColumn.dataIndex ?? String(sorterIndex);
      const order = sorterColumn.sortOrder ?? (internalSort.columnKey === sorterKey ? internalSort.order : sorterColumn.defaultSortOrder);
      rows.sort(sorterColumn.sorter);
      if (order === 'descend') rows.reverse();
    }

    return rows;
  }, [columns, dataSource, internalFilters, internalSort]);

  const total = pagination && pagination.total ? pagination.total : processedRows.length;
  const start = pagination === false ? 0 : (mergedPage - 1) * mergedPageSize;
  const pagedRows = pagination === false ? processedRows : processedRows.slice(start, start + mergedPageSize);

  const triggerChange = (
    action: TableOnChangeExtra<RecordType>['action'],
    nextPagination: TablePaginationConfig,
    nextFilters: Record<string, FilterValue | null>,
    nextSorter: { columnKey?: string; order?: SortOrder }
  ) => {
    onChange?.(nextPagination, nextFilters, nextSorter, { action, currentDataSource: pagedRows });
  };

  return (
    <div className={cn('ui-table', className, bordered && 'ui-table--bordered', `ui-table--${size}`)} style={style}>
      <div className="ui-table__scroll" onScroll={onScroll}>
        <table className="ui-table__native">
          <thead>
            <tr {...onHeaderRow?.(columns, 0)}>
              {expandedRowRender ? <th className="ui-table__expander-cell" /> : null}
              {columns.map((column, index) => {
                const key = column.key ?? column.dataIndex ?? String(index);
                const order = column.sortOrder ?? (internalSort.columnKey === key ? internalSort.order : column.defaultSortOrder);

                return (
                  <th key={key} style={{ textAlign: column.align, width: column.width }}>
                    <button
                      type="button"
                      className={cn('ui-table__header-button', column.sorter && 'ui-table__header-button--sortable')}
                      onClick={() => {
                        if (!column.sorter || column.sortOrder) return;
                        const nextOrder: SortOrder | undefined = order === 'ascend' ? 'descend' : order === 'descend' ? undefined : 'ascend';
                        const nextSorter = { columnKey: key, order: nextOrder };
                        setInternalSort(nextSorter);
                        triggerChange('sort', { ...pagination, current: mergedPage, pageSize: mergedPageSize, total }, internalFilters, nextSorter);
                      }}
                    >
                      <span>{column.title}</span>
                      {column.sorter ? (
                        <span className="ui-table__sorter" aria-hidden="true">
                          <span className={cn('ui-table__sorter-up', order === 'ascend' && 'is-active')} />
                          <span className={cn('ui-table__sorter-down', order === 'descend' && 'is-active')} />
                        </span>
                      ) : null}
                    </button>
                    {column.filters?.length ? (
                      <div className="ui-table__filters">
                        {column.filters.map((filter) => {
                          const selected = (column.filteredValue ?? internalFilters[key] ?? []).includes(filter.value);
                          return (
                            <Checkbox
                              key={String(filter.value)}
                              className="ui-table__filter-item"
                              checked={selected}
                              onChange={(event) => {
                                if (column.filteredValue) return;
                                const current = [...(internalFilters[key] ?? [])];
                                const next = event.target.checked
                                  ? [...current, filter.value]
                                  : current.filter((value) => value !== filter.value);
                                const nextFilters = { ...internalFilters, [key]: next };
                                setInternalFilters(nextFilters);
                                triggerChange('filter', { ...pagination, current: 1, pageSize: mergedPageSize, total }, nextFilters, internalSort);
                              }}
                            >
                              {filter.text}
                            </Checkbox>
                          );
                        })}
                      </div>
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {!pagedRows.length ? (
              <tr>
                <td colSpan={columns.length + (expandedRowRender ? 1 : 0)} className="ui-table__empty">
                  {locale?.emptyText ?? 'No data'}
                </td>
              </tr>
            ) : (
              pagedRows.map((record, index) => {
                const key = getRowKey(record, rowKey, index);
                const canExpand = expandedRowRender ? (rowExpandable ? rowExpandable(record) : true) : false;
                const expanded = mergedExpandedRows.includes(key);

                return (
                  <Fragment key={key}>
                    <tr {...onRow?.(record, index)}>
                      {expandedRowRender ? (
                        <td className="ui-table__expander-cell">
                          {canExpand ? (
                            <Button
                              type="text"
                              size="small"
                              className="ui-table__expand-button"
                              aria-label={expanded ? 'Collapse row' : 'Expand row'}
                              onClick={() => {
                                const nextExpanded = expanded
                                  ? mergedExpandedRows.filter((row) => row !== key)
                                  : [...mergedExpandedRows, key];
                                if (expandedRowKeys === undefined) setInternalExpandedRows(nextExpanded);
                                onExpand?.(!expanded, record);
                                onExpandedRowsChange?.(nextExpanded);
                              }}
                            >
                              {expanded ? '−' : '+'}
                            </Button>
                          ) : null}
                        </td>
                      ) : null}
                      {columns.map((column, colIndex) => {
                        const columnKey = column.key ?? column.dataIndex ?? String(colIndex);
                        const value = column.dataIndex ? record[column.dataIndex] : undefined;
                        const content = column.render ? column.render(value, record, index) : (value as ReactNode);

                        return (
                          <td key={columnKey} style={{ textAlign: column.align }} className={cn(column.ellipsis && 'ui-table__cell--ellipsis')}>
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                    {expandedRowRender && expanded ? (
                      <tr key={`${key}-expanded`} className="ui-table__expanded-row">
                        <td colSpan={columns.length + 1}>{expandedRowRender(record, index)}</td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {loading ? <div className="ui-table__loading">Loading...</div> : null}

      {pagination !== false ? (
        <Pagination
          {...pagination}
          className={cn('ui-table__pagination', pagination.className)}
          size={pagination.size ?? 'small'}
          total={total}
          current={mergedPage}
          pageSize={mergedPageSize}
          onChange={(nextPage, nextPageSize) => {
            if (!pagination.current) setInternalPage(nextPage);
            if (!pagination.pageSize) setInternalPageSize(nextPageSize);
            pagination.onChange?.(nextPage, nextPageSize);
            triggerChange('paginate', { ...pagination, current: nextPage, pageSize: nextPageSize, total }, internalFilters, internalSort);
          }}
          onShowSizeChange={(nextPage, nextPageSize) => {
            if (!pagination.pageSize) setInternalPageSize(nextPageSize);
            if (!pagination.current) setInternalPage(nextPage);
            pagination.onShowSizeChange?.(nextPage, nextPageSize);
          }}
        />
      ) : null}
    </div>
  );
}
