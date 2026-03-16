import {
  type CSSProperties,
  type HTMLAttributes,
  type Key,
  type ReactNode,
  useMemo,
  useState
} from 'react';
import { cn } from '../../utils';
import './Table.scss';

export type SortOrder = 'ascend' | 'descend' | null;

export interface TablePaginationConfig {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: Array<number | string>;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

export interface TableFilterItem {
  text: ReactNode;
  value: Key | boolean;
}

export interface TableColumnType<RecordType extends object> {
  title?: ReactNode | ((props: TableColumnTitleProps<RecordType>) => ReactNode);
  key?: Key;
  dataIndex?: keyof RecordType | Array<keyof RecordType>;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right' | boolean;
  ellipsis?: boolean;
  rowScope?: 'row' | 'rowgroup';
  colSpan?: number;
  filters?: TableFilterItem[];
  filterMultiple?: boolean;
  filteredValue?: Key[] | null;
  defaultFilteredValue?: Key[];
  onFilter?: (value: Key | boolean, record: RecordType) => boolean;
  sorter?: boolean | ((a: RecordType, b: RecordType) => number);
  sortOrder?: SortOrder;
  defaultSortOrder?: Exclude<SortOrder, null>;
  sortDirections?: Array<Exclude<SortOrder, null>>;
  render?: (value: unknown, record: RecordType, index: number) => ReactNode;
  onCell?: (record: RecordType, rowIndex?: number) => HTMLAttributes<HTMLTableCellElement>;
  onHeaderCell?: (column: TableColumnType<RecordType>) => HTMLAttributes<HTMLTableCellElement>;
}

export interface TableColumnTitleProps<RecordType extends object> {
  sortOrder?: SortOrder;
  sortColumn?: TableColumnType<RecordType>;
}

export interface TableCurrentDataSource<RecordType extends object> {
  currentDataSource: RecordType[];
  action: 'paginate' | 'sort' | 'filter';
}

export interface TableOnChangeExtra<RecordType extends object> extends TableCurrentDataSource<RecordType> {}

export interface TableProps<RecordType extends object = Record<string, unknown>> extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  columns?: Array<TableColumnType<RecordType>>;
  dataSource?: RecordType[];
  rowKey?: keyof RecordType | ((record: RecordType) => Key);
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  loading?: boolean;
  pagination?: false | TablePaginationConfig;
  showHeader?: boolean;
  sticky?: boolean;
  tableLayout?: 'auto' | 'fixed';
  title?: (data: RecordType[]) => ReactNode;
  footer?: (data: RecordType[]) => ReactNode;
  summary?: (data: RecordType[]) => ReactNode;
  locale?: {
    emptyText?: ReactNode;
  };
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  rowClassName?: string | ((record: RecordType, index: number) => string);
  onRow?: (record: RecordType, index: number) => HTMLAttributes<HTMLTableRowElement>;
  onHeaderRow?: (columns: Array<TableColumnType<RecordType>>, index: number) => HTMLAttributes<HTMLTableRowElement>;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, Key[] | null>,
    sorter: { column?: TableColumnType<RecordType>; order?: SortOrder },
    extra: TableOnChangeExtra<RecordType>
  ) => void;
}

function getValue<RecordType extends object>(record: RecordType, dataIndex?: keyof RecordType | Array<keyof RecordType>) {
  if (!dataIndex) {
    return undefined;
  }

  if (Array.isArray(dataIndex)) {
    return dataIndex.reduce<unknown>((result, key) => {
      if (result && typeof result === 'object' && key in (result as Record<string, unknown>)) {
        return (result as Record<string, unknown>)[String(key)];
      }

      return undefined;
    }, record as unknown);
  }

  return record[dataIndex];
}

function getDefaultPageSize(config: TablePaginationConfig) {
  return Number(config.pageSize ?? config.defaultPageSize ?? 10);
}

export function Table<RecordType extends object = Record<string, unknown>>({
  className,
  columns = [],
  dataSource = [],
  rowKey = 'key' as keyof RecordType,
  size = 'middle',
  bordered = false,
  loading = false,
  pagination = { defaultCurrent: 1, defaultPageSize: 10 },
  showHeader = true,
  tableLayout,
  title,
  footer,
  summary,
  locale,
  scroll,
  rowClassName,
  onRow,
  onHeaderRow,
  onChange,
  style,
  ...props
}: TableProps<RecordType>) {
  const [internalPage, setInternalPage] = useState(Number((pagination && pagination.defaultCurrent) || 1));
  const [internalPageSize, setInternalPageSize] = useState(Number((pagination && getDefaultPageSize(pagination)) || 10));
  const [sortState, setSortState] = useState<{ column?: TableColumnType<RecordType>; order?: SortOrder }>(() => {
    const defaultSortedColumn = columns.find((column) => Boolean(column.defaultSortOrder));
    return {
      column: defaultSortedColumn,
      order: defaultSortedColumn?.defaultSortOrder
    };
  });

  const filters = useMemo(() => {
    return columns.reduce<Record<string, Key[] | null>>((accumulator, column) => {
      if (!column.key) {
        return accumulator;
      }

      accumulator[String(column.key)] = column.filteredValue ?? column.defaultFilteredValue ?? null;
      return accumulator;
    }, {});
  }, [columns]);

  const filteredData = useMemo(() => {
    return dataSource.filter((record) => {
      return columns.every((column) => {
        if (!column.filters?.length || !column.onFilter || !column.key) {
          return true;
        }

        const filterValues = filters[String(column.key)];
        if (!filterValues || filterValues.length === 0) {
          return true;
        }

        return filterValues.some((value) => column.onFilter?.(value, record));
      });
    });
  }, [columns, dataSource, filters]);

  const sortedData = useMemo(() => {
    if (!sortState.column?.sorter || !sortState.order) {
      return filteredData;
    }

    const compare = sortState.column.sorter;
    if (typeof compare !== 'function') {
      return filteredData;
    }

    const next = [...filteredData].sort(compare);
    return sortState.order === 'descend' ? next.reverse() : next;
  }, [filteredData, sortState]);

  const paginationConfig = pagination === false ? false : pagination;
  const pageSize = paginationConfig ? Number(paginationConfig.pageSize ?? internalPageSize) : sortedData.length;
  const current = paginationConfig ? Number(paginationConfig.current ?? internalPage) : 1;
  const total = paginationConfig ? Number(paginationConfig.total ?? sortedData.length) : sortedData.length;

  const paginatedData = useMemo(() => {
    if (!paginationConfig) {
      return sortedData;
    }

    const start = (current - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [current, pageSize, paginationConfig, sortedData]);

  const totalPages = paginationConfig ? Math.max(1, Math.ceil(total / pageSize)) : 1;

  const emitChange = (action: TableOnChangeExtra<RecordType>['action']) => {
    onChange?.(
      paginationConfig
        ? {
            ...paginationConfig,
            current,
            pageSize,
            total
          }
        : { current: 1, pageSize: sortedData.length, total: sortedData.length },
      filters,
      sortState,
      {
        currentDataSource: paginatedData,
        action
      }
    );
  };

  const setPage = (nextPage: number) => {
    if (!paginationConfig) {
      return;
    }

    const page = Math.min(Math.max(1, nextPage), totalPages);
    if (paginationConfig.current === undefined) {
      setInternalPage(page);
    }

    paginationConfig.onChange?.(page, pageSize);
    emitChange('paginate');
  };

  const setPageSize = (nextSize: number) => {
    if (!paginationConfig) {
      return;
    }

    if (paginationConfig.pageSize === undefined) {
      setInternalPageSize(nextSize);
      setInternalPage(1);
    }

    paginationConfig.onShowSizeChange?.(1, nextSize);
    emitChange('paginate');
  };

  const onSort = (column: TableColumnType<RecordType>) => {
    if (!column.sorter) {
      return;
    }

    const directions = column.sortDirections ?? ['ascend', 'descend'];
    const currentOrder = sortState.column === column ? sortState.order : null;
    const nextOrder =
      currentOrder === directions[0]
        ? directions[1] ?? null
        : currentOrder === directions[1]
          ? null
          : directions[0];

    setSortState({ column: nextOrder ? column : undefined, order: nextOrder });
    emitChange('sort');
  };

  const emptyContent = locale?.emptyText ?? 'No data';

  return (
    <div className={cn('ui-table', `ui-table--${size}`, bordered && 'ui-table--bordered', className)} style={style} {...props}>
      {title ? <div className="ui-table__title">{title(sortedData)}</div> : null}

      <div
        className={cn('ui-table__scroll')}
        style={{
          maxHeight: scroll?.y,
          overflowX: scroll?.x ? 'auto' : undefined
        }}
      >
        <table className="ui-table__native" style={{ tableLayout, minWidth: scroll?.x && scroll.x !== true ? scroll.x : undefined } as CSSProperties}>
          {showHeader ? (
            <thead>
              <tr {...onHeaderRow?.(columns, 0)}>
                {columns.map((column, columnIndex) => {
                  const columnKey = String(column.key ?? column.dataIndex ?? columnIndex);
                  const canSort = Boolean(column.sorter);
                  const activeSort = sortState.column === column ? sortState.order : column.sortOrder ?? null;

                  return (
                    <th
                      key={columnKey}
                      className={cn('ui-table__head-cell', canSort && 'ui-table__head-cell--sortable', column.className)}
                      style={{ width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth, textAlign: column.align }}
                      scope={column.rowScope}
                      colSpan={column.colSpan}
                      {...column.onHeaderCell?.(column)}
                      onClick={() => onSort(column)}
                    >
                      <span className="ui-table__head-title">
                        {typeof column.title === 'function' ? column.title({ sortOrder: activeSort, sortColumn: sortState.column }) : column.title}
                      </span>
                      {canSort ? <span className="ui-table__sort">{activeSort === 'ascend' ? '↑' : activeSort === 'descend' ? '↓' : '↕'}</span> : null}
                    </th>
                  );
                })}
              </tr>
            </thead>
          ) : null}

          <tbody>
            {loading ? (
              <tr>
                <td className="ui-table__status" colSpan={Math.max(columns.length, 1)}>
                  Loading...
                </td>
              </tr>
            ) : null}

            {!loading && paginatedData.length === 0 ? (
              <tr>
                <td className="ui-table__status" colSpan={Math.max(columns.length, 1)}>
                  {emptyContent}
                </td>
              </tr>
            ) : null}

            {!loading
              ? paginatedData.map((record, rowIndex) => {
                  const key = typeof rowKey === 'function' ? rowKey(record) : ((record[rowKey] as Key) ?? rowIndex);
                  const rowProps = onRow?.(record, rowIndex);

                  return (
                    <tr
                      key={String(key)}
                      className={cn('ui-table__row', typeof rowClassName === 'function' ? rowClassName(record, rowIndex) : rowClassName)}
                      {...rowProps}
                    >
                      {columns.map((column, columnIndex) => {
                        const columnKey = String(column.key ?? column.dataIndex ?? columnIndex);
                        const value = getValue(record, column.dataIndex);

                        return (
                          <td
                            key={columnKey}
                            className={cn('ui-table__cell', column.className, column.ellipsis && 'ui-table__cell--ellipsis')}
                            style={{ textAlign: column.align }}
                            {...column.onCell?.(record, rowIndex)}
                          >
                            {column.render ? column.render(value, record, rowIndex) : (value as ReactNode)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {summary ? <div className="ui-table__summary">{summary(sortedData)}</div> : null}
      {footer ? <div className="ui-table__footer">{footer(sortedData)}</div> : null}

      {paginationConfig && (!paginationConfig.hideOnSinglePage || total > pageSize) ? (
        <div className="ui-table__pagination" role="navigation" aria-label="Table pagination">
          <button type="button" className="ui-table__page-button" onClick={() => setPage(current - 1)} disabled={current <= 1}>
            Prev
          </button>
          <span className="ui-table__page-status">
            Page {current} / {totalPages}
          </span>
          <button type="button" className="ui-table__page-button" onClick={() => setPage(current + 1)} disabled={current >= totalPages}>
            Next
          </button>
          {paginationConfig.showSizeChanger ? (
            <select
              className="ui-control ui-table__size-select"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
            >
              {(paginationConfig.pageSizeOptions ?? [10, 20, 50, 100]).map((sizeOption) => (
                <option key={String(sizeOption)} value={Number(sizeOption)}>
                  {sizeOption} / page
                </option>
              ))}
            </select>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
