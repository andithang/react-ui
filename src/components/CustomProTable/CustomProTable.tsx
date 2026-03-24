import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Pagination } from '../Pagination/Pagination';
import { Switch } from '../Switch/Switch';
import { Tabs } from '../Tabs/Tabs';
import { Tag } from '../Tag/Tag';
import { Icon } from '../Icon/Icon';
import { cn } from '../../utils';
import { CustomSpin } from './CustomSpin';
import { NoPermissionTable } from './NoPermissionTable';
import { useDropdownButtonDecision } from './useDropdownButtonDecision';
import {
  ItemActionEventName,
  SortType,
  type ActionColAction,
  type ColumnConfig,
  type CustomProTableProps,
  type TabValueConfig
} from './types';
import './CustomProTable.scss';

const DEFAULT_STATUS = {
  statusKey: 'status',
  stages: []
};

const DEFAULT_RESPONSIVE = {
  mode: 'off',
  breakpointPx: 1024,
  showSortSelector: true,
  disableVirtualScroll: true
} as const;

export function CustomProTable<TData extends Record<string, unknown>, TStatus, TTabCondition>({
  loading = false,
  vtsTableTitle = '',
  data = [],
  tabGroup = null,
  columns = { cols: [] },
  actionOptions = { actions: [], onClick: () => {} },
  statusOptions,
  pagingParams,
  vtsShowPagination = true,
  vtsTableLayout = 'fixed',
  vtsShowCheckbox = false,
  vtsSearchable = true,
  vtsSearchImmediate = true,
  noDataRender,
  vtsScroll,
  clearCheckedIds,
  rowHeight = '48px',
  focusRowColor = 'var(--ui-color-fill-brand-subtle)',
  useButtonLabel,
  vtsShowQuickJumper,
  vtsShowSizeChanger,
  useSimplePagination,
  autoResize = { enable: false },
  highlightOnClick,
  noSearchPermissionMsg,
  tableStyle,
  responsiveConfig = DEFAULT_RESPONSIVE,
  itemKey = 'id',
  focusRowId,
  onReloadTable,
  onSelectDataItemIds,
  onSelectData,
  onClickDataItem,
  hasPermission = () => true,
  t = (key) => key,
  theme = 'sarabun-blue',
  searchResourceCode,
  createBtnResourceCode,
  importBtnResourceCode,
  exportBtnResourceCode,
  changeStatusResourceCode,
  moreFilterRef,
  advancedSearchRef,
  moreActionsConfig,
  moreActionsSelectedConfig,
  moreTableButtonsConfig
}: CustomProTableProps<TData, TStatus, TTabCondition>) {
  const effectiveStatus = statusOptions ?? DEFAULT_STATUS;
  const [searchKey, setSearchKey] = useState(pagingParams?.searchKey ?? '');
  const [setOfCheckedId, setSetOfCheckedId] = useState<Set<string>>(new Set());
  const [setOfCheckedRowData, setSetOfCheckedRowData] = useState<Set<TData>>(new Set());
  const [isBelowResponsiveBreakpoint, setIsBelowResponsiveBreakpoint] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(tabGroup?.tabIndexDefault ?? 0);
  const [responsiveSortField, setResponsiveSortField] = useState<string>('');
  const [responsiveSortDirection, setResponsiveSortDirection] = useState<SortType>(SortType.ASC);
  const [stopChangeIndexFromSize, setStopChangeIndexFromSize] = useState(false);
  const searchTimer = useRef<number | undefined>(undefined);
  const skipDebounceRef = useRef(false);
  const actionThrottleRef = useRef(0);

  const rowHeightNumberPixel = Number(rowHeight.replace('px', '')) || 48;
  const checkedAll = data.length > 0 && data.every((item, index) => setOfCheckedId.has(getRowId(item, index, itemKey as string)));
  const indeterminate = !checkedAll && setOfCheckedId.size > 0;

  const doDispatchAction = useCallback(
    (eventName: string, payload: TData | Set<string> | null) => {
      const now = Date.now();
      if (now - actionThrottleRef.current < 1000) return;
      actionThrottleRef.current = now;
      actionOptions.onClick(eventName, payload);
    },
    [actionOptions]
  );

  const clearSelection = useCallback(() => {
    setSetOfCheckedId(new Set());
    setSetOfCheckedRowData(new Set());
  }, []);

  useEffect(() => {
    onSelectDataItemIds?.(setOfCheckedId);
    onSelectData?.(setOfCheckedRowData);
  }, [onSelectData, onSelectDataItemIds, setOfCheckedId, setOfCheckedRowData]);

  useEffect(() => {
    if (!clearCheckedIds?.length) return;
    setSetOfCheckedId((prev) => {
      const next = new Set(prev);
      clearCheckedIds.forEach((id) => next.delete(String(id)));
      return next;
    });
    setSetOfCheckedRowData((prev) => {
      const next = new Set(prev);
      Array.from(prev).forEach((item, index) => {
        const id = getRowId(item as Record<string, unknown>, index, itemKey as string);
        if (clearCheckedIds.includes(id)) next.delete(item);
      });
      return next;
    });
  }, [clearCheckedIds, itemKey]);

  useEffect(() => {
    const changed = actionOptions.changedSetCheckedId;
    if (!actionOptions.isSucceed || !changed?.length) return;
    setSetOfCheckedId((prev) => {
      const next = new Set(prev);
      changed.forEach((id) => next.delete(String(id)));
      return next;
    });
  }, [actionOptions.changedSetCheckedId, actionOptions.isSucceed]);

  const displayedTabGroup = useMemo(() => {
    if (!tabGroup) return null;
    if (tabGroup.tabSearchResourceCode && !hasPermission(tabGroup.tabSearchResourceCode)) return null;
    return {
      ...tabGroup,
      tabValueConfig: tabGroup.tabValueConfig.filter((tab) => !tab.resourceCode || hasPermission(tab.resourceCode))
    };
  }, [hasPermission, tabGroup]);

  useEffect(() => {
    if (!displayedTabGroup?.tabValueConfig.length) return;
    const first = displayedTabGroup.tabValueConfig[0];
    const originalIndex = tabGroup?.tabValueConfig.findIndex((item) => item.tabValue === first.tabValue) ?? 0;
    tabGroup?.onChangeTab?.(Math.max(0, originalIndex));
    setSelectedTabIndex(0);
  }, [displayedTabGroup?.tabValueConfig, tabGroup]);

  useEffect(() => {
    const onResize = () => {
      setIsBelowResponsiveBreakpoint(window.innerWidth <= responsiveConfig.breakpointPx);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [responsiveConfig.breakpointPx]);

  const responsiveSortableColumns = useMemo(
    () => columns.cols.filter((col) => col.useField && col.sort && !col.hidden),
    [columns.cols]
  );

  useEffect(() => {
    if (!responsiveSortableColumns.length) return;
    if (!responsiveSortField) {
      setResponsiveSortField(String(responsiveSortableColumns[0].useField));
    }
  }, [responsiveSortableColumns, responsiveSortField]);

  const isResponsiveCardMode = responsiveConfig.mode === 'card' && isBelowResponsiveBreakpoint;
  const actualAutoResize = autoResize.enable && (pagingParams?.pageSize ?? 0) > 10 && data.length > 10;
  const actualVtsScroll = actualAutoResize
    ? { y: `${rowHeightNumberPixel * 10}px`, x: autoResize.scrollX ?? vtsScroll?.x ?? null }
    : vtsScroll;

  const triggerSearch = useCallback(
    (value: string) => {
      if (!pagingParams) return;
      const trimmed = value.trim();
      clearSelection();
      pagingParams.onChangePagingParams(trimmed, 'search');
      pagingParams.onChangePagingParams(1, 'pageIndex');
      onReloadTable?.(true);
    },
    [clearSelection, onReloadTable, pagingParams]
  );

  const onSearchImmediate = useCallback(() => {
    skipDebounceRef.current = true;
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    triggerSearch(searchKey);
  }, [searchKey, triggerSearch]);

  const onSearchChange = (value: string) => {
    setSearchKey(value);
    if (!vtsSearchImmediate) return;
    if (skipDebounceRef.current) {
      skipDebounceRef.current = false;
      return;
    }
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      triggerSearch(value);
    }, 2000);
  };

  const onToggleAll = (checked: boolean) => {
    if (!checked) {
      clearSelection();
      return;
    }
    setSetOfCheckedId(new Set(data.map((item, index) => getRowId(item, index, itemKey as string))));
    setSetOfCheckedRowData(new Set(data));
  };

  const onToggleRow = (checked: boolean, item: TData, index: number) => {
    const id = getRowId(item, index, itemKey as string);
    setSetOfCheckedId((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
    setSetOfCheckedRowData((prev) => {
      const next = new Set(prev);
      if (checked) next.add(item);
      else next.delete(item);
      return next;
    });
  };

  const onChangeTab = (index: number) => {
    if (!displayedTabGroup || !tabGroup) return;
    const selected = displayedTabGroup.tabValueConfig[index];
    if (!selected) return;
    const originalIndex = tabGroup.tabValueConfig.findIndex((item) => item.tabValue === selected.tabValue);
    setSelectedTabIndex(index);
    tabGroup.onChangeTab?.(Math.max(0, originalIndex));
    clearSelection();
  };

  const onPageChange = (pageIndex: number, pageSize: number) => {
    if (!pagingParams) return;
    if (stopChangeIndexFromSize) {
      setStopChangeIndexFromSize(false);
      return;
    }
    pagingParams.onChangePagingParams(Math.floor(pageIndex), 'pageIndex');
    if (pageSize !== pagingParams.pageSize) {
      const maxPage = Math.max(1, Math.ceil(pagingParams.total / pageSize));
      if (pagingParams.pageIndex > maxPage) {
        setStopChangeIndexFromSize(true);
        pagingParams.onChangePagingParams({ pageIndex: maxPage, pageSize }, 'pageIndexAndSize');
      } else {
        pagingParams.onChangePagingParams(pageSize, 'pageSize');
      }
    }
  };

  const onRowClick = (item: TData, index: number, eventClick?: React.MouseEvent<HTMLTableRowElement>) => {
    const rowElement = eventClick?.currentTarget ?? null;
    onClickDataItem?.({ item, indexInTable: index, eventClick, currRow: rowElement });
  };



  if (searchResourceCode && !hasPermission(searchResourceCode)) {
    return <NoPermissionTable message={noSearchPermissionMsg} resourceCode={searchResourceCode} t={t} />;
  }

  return (
    <CustomSpin loading={loading} theme={theme}>
      <div className={cn('ui-custom-pro-table', isResponsiveCardMode && 'ui-custom-pro-table--responsive-card')}>
        <div className="ui-custom-pro-table__toolbar">
          <div className="ui-custom-pro-table__title">{vtsTableTitle}</div>
          <div className="ui-custom-pro-table__actions">
            {hasPermission(createBtnResourceCode) ? (
              <Button onClick={() => doDispatchAction(ItemActionEventName.CREATE, null)}>Create</Button>
            ) : null}
            {hasPermission(importBtnResourceCode) ? (
              <Button onClick={() => doDispatchAction(ItemActionEventName.IMPORT, null)}>Import</Button>
            ) : null}
            {hasPermission(exportBtnResourceCode) ? (
              <Button onClick={() => doDispatchAction(ItemActionEventName.EXPORT, null)}>Export</Button>
            ) : null}
            {moreTableButtonsConfig}
          </div>
        </div>

        <div className="ui-custom-pro-table__head-tools">
          {vtsSearchable ? (
            <Input
              placeholder={pagingParams?.searchBoxConfig?.placeholder ?? 'Search'}
              value={searchKey}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onSearchImmediate();
              }}
              style={pagingParams?.searchBoxConfig?.style}
              suffix={<Icon name="searchOutline" onClick={onSearchImmediate} />}
              allowClear={{
                clearIcon: (
                  <button
                    type="button"
                    className="ui-custom-pro-table__clear-search"
                    onClick={() => {
                      setSearchKey('');
                      onSearchChange('');
                      onSearchImmediate();
                    }}
                  >
                    ×
                  </button>
                )
              }}
            />
          ) : null}
          {moreFilterRef}
          {advancedSearchRef}
          {moreActionsConfig}
        </div>

        {displayedTabGroup?.tabValueConfig?.length ? (
          <Tabs
            items={displayedTabGroup.tabValueConfig.map((tab: TabValueConfig<TTabCondition>) => ({
              id: tab.tabValue,
              label: `${tab.tabTitle} (${tab.total})`,
              content: <></>
            }))}
            activeTabId={displayedTabGroup.tabValueConfig[selectedTabIndex]?.tabValue}
            onTabChange={(tabId) => {
              const index = displayedTabGroup.tabValueConfig.findIndex((tab) => tab.tabValue === tabId);
              onChangeTab(index);
            }}
          />
        ) : null}

        {setOfCheckedId.size > 0 ? (
          <div className="ui-custom-pro-table__selected-bar">
            <span>{setOfCheckedId.size} selected</span>
            <Button onClick={() => doDispatchAction(ItemActionEventName.DELETE_LIST, new Set(setOfCheckedId))}>Delete</Button>
            <Button onClick={() => doDispatchAction(ItemActionEventName.EXPORT_LIST, new Set(setOfCheckedId))}>Export</Button>
            {moreActionsSelectedConfig}
          </div>
        ) : null}

        {isResponsiveCardMode && responsiveConfig.showSortSelector && responsiveSortableColumns.length ? (
          <div className="ui-custom-pro-table__responsive-sort">
            <select
              aria-label="Sort field"
              value={responsiveSortField}
              onChange={(event) => {
                const field = event.target.value;
                setResponsiveSortField(field);
                columns.onSort?.(responsiveSortDirection, field);
              }}
            >
              {responsiveSortableColumns.map((column) => (
                <option key={String(column.useField)} value={String(column.useField)}>
                  {column.title}
                </option>
              ))}
            </select>
            <select
              aria-label="Sort direction"
              value={responsiveSortDirection}
              onChange={(event) => {
                const next = event.target.value as SortType;
                setResponsiveSortDirection(next);
                columns.onSort?.(next, responsiveSortField);
              }}
            >
              <option value={SortType.ASC}>{resolveAscText(t)}</option>
              <option value={SortType.DESC}>{resolveDescText(t)}</option>
            </select>
          </div>
        ) : null}

        <div className="ui-custom-pro-table__scroll" style={{ maxHeight: actualVtsScroll?.y ?? undefined }}>
          <table className="ui-custom-pro-table__table" style={{ tableLayout: vtsTableLayout }}>
            <thead>
              <tr>
                {vtsShowCheckbox ? (
                  <th>
                    <input type="checkbox" checked={checkedAll} aria-checked={indeterminate ? 'mixed' : checkedAll} onChange={(e) => onToggleAll(e.target.checked)} />
                  </th>
                ) : null}
                <th>#</th>
                {columns.cols.filter((col) => !col.hidden).map((col) => renderHeader(col, columns.onSort))}
                {!columns.hideStatusCol ? <th>Status</th> : null}
                {actionOptions.actions.length ? <th>Action</th> : null}
              </tr>
            </thead>
            <tbody>
              {!data.length ? (
                <tr>
                  <td colSpan={columns.cols.length + 3}>{noDataRender ?? 'No data'}</td>
                </tr>
              ) : (
                data.map((item, index) => {
                  const id = getRowId(item, index, itemKey as string);
                  const rowHighlight =
                    highlightOnClick && focusRowId !== undefined && focusRowId === item[itemKey as keyof TData]
                      ? focusRowColor
                      : undefined;

                  return (
                    <tr
                      key={id}
                      className={cn(tableStyle?.rowConfig?.class)}
                      style={{ background: rowHighlight }}
                      title={tableStyle?.rowConfig?.hoverTitle}
                      onClick={(event) => onRowClick(item, index, event)}
                    >
                      {vtsShowCheckbox ? (
                        <td>
                          <input type="checkbox" checked={setOfCheckedId.has(id)} onChange={(event) => onToggleRow(event.target.checked, item, index)} />
                        </td>
                      ) : null}
                      <td>{index + 1}</td>
                      {columns.cols.filter((col) => !col.hidden).map((col, colIndex) => (
                        <td
                          key={`${col.title}-${colIndex}`}
                          data-col-title={String(col.title)}
                          className={cn('ui-custom-pro-table__cell', actionOptions.actions.length > 0 && colIndex === columns.cols.length - 1 && 'utility')}
                        >
                          {renderCell(col, item, index, data)}
                        </td>
                      ))}
                      {!columns.hideStatusCol ? (
                        <td>{renderStatusCell(item, effectiveStatus, changeStatusResourceCode, hasPermission, doDispatchAction)}</td>
                      ) : null}
                      {actionOptions.actions.length ? <td>{renderActionCell(actionOptions.actions, item, effectiveStatus.statusKey, doDispatchAction, hasPermission, useButtonLabel)}</td> : null}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {vtsShowPagination && pagingParams ? (
          <Pagination
            total={pagingParams.total}
            current={pagingParams.pageIndex}
            pageSize={pagingParams.pageSize}
            simple={useSimplePagination}
            showQuickJumper={vtsShowQuickJumper}
            showSizeChanger={vtsShowSizeChanger}
            pageSizeOptions={pagingParams.customListPageSize}
            onChange={onPageChange}
            onShowSizeChange={(_, size) => onPageChange(pagingParams.pageIndex, size)}
          />
        ) : null}
      </div>
    </CustomSpin>
  );
}

function getRowId(item: Record<string, unknown>, index: number, itemKey: string) {
  const key = item[itemKey] as string | number | undefined;
  return String(key ?? index);
}

function renderHeader<TData>(column: ColumnConfig<TData>, onSort?: (event: SortType | null, key: string) => void) {
  return (
    <th key={column.title} style={{ width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth, textAlign: column.alignTitle ?? undefined }}>
      <button
        type="button"
        className="ui-custom-pro-table__th-btn"
        onClick={() => {
          if (!column.sort || !column.useField) return;
          onSort?.(SortType.ASC, String(column.useField));
        }}
      >
        {column.title}
      </button>
    </th>
  );
}

function renderCell<TData extends Record<string, unknown>>(column: ColumnConfig<TData>, item: TData, index: number, data: TData[]): ReactNode {
  if (column.useTemplateIcons) {
    return renderActionCell(column.useTemplateIcons.actions, item, 'status', column.useTemplateIcons.onClick, () => true);
  }
  if (typeof column.useTemplate === 'function') return column.useTemplate({ item, index, data });
  if (column.useTemplate) return column.useTemplate;
  if (column.useField) {
    const value = item[column.useField] as ReactNode;
    if (column.typeRender === 'tag') return <Tag color={column.tagPreset ?? column.tagPresetConverter?.(value)}>{String(value)}</Tag>;
    return <span>{String(value ?? '')}</span>;
  }
  return null;
}

function renderStatusCell<TData extends Record<string, unknown>, TStatus>(
  item: TData,
  statusOptions: { statusKey: string; stages: Array<{ value: TStatus; text: string; preset?: 'error' | 'success' | 'info' | 'warning'; color?: string }>; useSwitchStatus?: boolean; trueSwitchValue?: unknown; actionKey?: string; disableSwitch?: boolean },
  changeStatusResourceCode: string | undefined,
  hasPermission: (resourceCode?: string) => boolean,
  dispatch: (eventName: string, payload: TData) => void
) {
  const value = item[statusOptions.statusKey as keyof TData];
  if (statusOptions.useSwitchStatus) {
    if (!hasPermission(changeStatusResourceCode)) return null;
    return (
      <Switch
        checked={value === statusOptions.trueSwitchValue}
        disabled={statusOptions.disableSwitch}
        onChange={() => dispatch(statusOptions.actionKey ?? statusOptions.statusKey, item)}
      />
    );
  }
  const stage = statusOptions.stages.find((it) => it.value === (value as TStatus));
  return <Tag color={stage?.preset} style={stage?.color ? { color: stage.color } : undefined}>{stage?.text ?? String(value ?? '')}</Tag>;
}

function renderActionCell<TData extends Record<string, unknown>>(
  actions: ActionColAction<TData>[],
  item: TData,
  statusKey: string,
  dispatch: (eventName: string, payload: TData) => void,
  hasPermission: (resourceCode?: string) => boolean,
  useButtonLabel?: boolean
) {
  return (
    <div className="ui-custom-pro-table__row-actions">
      {actions.map((action) => {
        const status = item[statusKey as keyof TData];
        const visibleByStatus = !action.validStatus?.length || action.validStatus.includes(status as number | string | boolean);
        if (!visibleByStatus || !hasPermission(action.resourceCode)) return null;
        if (action.type === 'dropdown') {
          const decideDropdownButton = useDropdownButtonDecision;
          const { useDropdown, allowed } = decideDropdownButton(action.dropdown, hasPermission, status);
          if (useDropdown) {
            return (
              <details key={action.eventName}>
                <summary>
                  <Icon name={action.icon as never} />
                </summary>
                <div className="ui-custom-pro-table__dropdown-list">
                  {allowed.map((itemOption) => (
                    <button type="button" key={itemOption.eventName} onClick={() => dispatch(itemOption.eventName, item)}>
                      {itemOption.text}
                    </button>
                  ))}
                </div>
              </details>
            );
          }
          return (
            <Fragment key={action.eventName}>
              {allowed.map((itemOption) => (
                <Button type="text" size="small" key={itemOption.eventName} onClick={() => dispatch(itemOption.eventName, item)}>
                  <Icon name={itemOption.icon as never} />
                </Button>
              ))}
            </Fragment>
          );
        }

        return (
          <Button type="text" size="small" key={action.eventName} onClick={() => dispatch(action.eventName, item)}>
            <Icon name={action.icon as never} />
            {useButtonLabel ? action.text : null}
          </Button>
        );
      })}
    </div>
  );
}

function resolveAscText(t: (key: string) => string) {
  const ascKeys = ['common.sort.asc', 'common.table.sort.asc', 'common.table.sortAsc', 'common.sort.ascending'];
  for (const key of ascKeys) {
    const result = t(key);
    if (result !== key) return result;
  }
  return 'ASC';
}

function resolveDescText(t: (key: string) => string) {
  const descKeys = ['common.sort.desc', 'common.table.sort.desc', 'common.table.sortDesc', 'common.sort.descending'];
  for (const key of descKeys) {
    const result = t(key);
    if (result !== key) return result;
  }
  return 'DESC';
}
