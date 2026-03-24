import { CSSProperties, MouseEvent, ReactNode } from '../../../node_modules/react';
export type ProTableResponsiveMode = 'off' | 'card';
export type ProTableResponsiveConfig = {
    mode: ProTableResponsiveMode;
    breakpointPx: number;
    showSortSelector: boolean;
    disableVirtualScroll: boolean;
};
export type ProTableResponsiveCellRole = 'field' | 'utility';
export type ActionColDropdown<TData> = {
    icon: string;
    text: string;
    eventName: string;
    type?: string;
    switchKey?: keyof TData;
    style?: CSSProperties;
    hidden?: boolean;
    validStatus?: Array<number | string | boolean>;
    resourceCode?: string;
};
export type ActionColAction<TData> = {
    type: 'dropdown' | 'icon';
    icon: string;
    eventName: string;
    style?: CSSProperties;
    dropdown?: ActionColDropdown<TData>[];
    text?: string;
    validStatus?: Array<number | string | boolean>;
    resourceCode?: string;
};
export type ActionColOptions<TData> = {
    actions: ActionColAction<TData>[];
    onClick: (eventName: string, item: TData | Set<string> | null) => void;
    isSucceed?: boolean;
    changedSetCheckedId?: string[];
};
export type PageSizeAndIndex = {
    pageIndex: number;
    pageSize: number;
};
export type ChangePagingParamsType = number | string | PageSizeAndIndex;
export type PagingParameters = {
    searchKey: string;
    pageIndex: number;
    pageSize: number;
    total: number;
    hasIndeterminate?: boolean;
    onChangePagingParams: (eventValue: ChangePagingParamsType, key: 'search' | 'pageIndex' | 'pageSize' | 'pageIndexAndSize' | string) => void;
    searchBoxConfig?: {
        placeholder?: string;
        style?: CSSProperties;
    };
    customListPageSize?: number[];
};
export type CellTemplateContext<TData> = {
    item: TData;
    index: number;
    data: TData[];
};
export type ColumnConfig<TData> = {
    title: string;
    extraTitle?: string | ReactNode;
    useField?: keyof TData;
    useTemplateOption?: ActionColOptions<TData>;
    sort?: boolean;
    ellipsisOn?: boolean;
    noWrap?: boolean;
    width?: string;
    minWidth?: number;
    maxWidth?: number;
    hidden?: boolean;
    useTemplateIcons?: ActionColOptions<TData>;
    imageLink?: string;
    allowDisplayTabValues?: string[];
    usePrefixImages?: {
        width?: number;
        height?: number;
        toolTip?: string;
        onClick?: (event: unknown) => void;
        altText?: string;
    };
    useTemplateRow?: {
        toolTip?: string;
        fixedTooltip?: string;
        onClick?: (event: unknown) => void;
    };
    typeRender?: 'label' | 'tag';
    alignContent?: 'left' | 'right' | 'center' | null;
    alignTitle?: 'left' | 'right' | 'center' | null;
    tagPreset?: 'info' | 'success' | 'warning' | 'error';
    tabCustomColor?: string;
    tagPresetConverter?: (value: unknown) => 'error' | 'success' | 'info' | 'warning' | undefined;
    useTemplate?: ReactNode | ((ctx: CellTemplateContext<TData>) => ReactNode);
};
export type ColumnGroupConfig<TData> = {
    cols: ColumnConfig<TData>[];
    hideStatusCol?: boolean;
    onSort?: (event: SortType | null, key: string) => void;
    useHighlightSelectedRow?: boolean;
};
export type TabValueConfig<TTabCondition> = {
    tabTitle: string;
    tabValue: string;
    total: number;
    conditionParams: TTabCondition;
    marked?: boolean;
    resourceCode?: string;
};
export type TabGroupConfig<TTabCondition> = {
    tabProperty: string;
    tabValueConfig: TabValueConfig<TTabCondition>[];
    deletedCondition?: string;
    onChangeTab?: (tabIndex: number) => void;
    hasDeleteTemporary?: boolean;
    deleteTempResourceCode?: string;
    hasDeleteSelected?: boolean;
    deleteSelectedResourceCode?: string;
    hasRecover?: boolean;
    recoverResourceCode?: string;
    tabSearchResourceCode?: string;
    tabIndexDefault?: number;
    useTabCard?: boolean;
};
export type ItemStatus<TStatus> = {
    value: TStatus;
    text: string;
    preset: 'error' | 'success' | 'info' | 'warning' | undefined;
    color?: string;
};
export type ItemStatusConfig<TStatus> = {
    statusKey: string;
    stages: ItemStatus<TStatus>[];
    useSwitchStatus?: boolean;
    trueSwitchValue?: number | string | boolean;
    actionKey?: string;
    disableSwitch?: boolean;
    preferredWidth?: string;
};
export type ProTableAutoResize = {
    enable: boolean;
    scrollX?: string;
};
export type ClickRowEventType<TData> = {
    item: TData;
    indexInTable?: number;
    eventClick?: MouseEvent;
    currRow?: HTMLTableRowElement | null;
};
export type TableRowHeight = '48px' | '72px' | '40px';
export type RowTableSize = 'default' | 'expand' | 'collapse';
export declare enum SortType {
    ASC = "ascend",
    DESC = "descend"
}
export declare const ItemActionEventName: {
    readonly CREATE: "create";
    readonly IMPORT: "import";
    readonly EXPORT: "export";
    readonly DELETE_TEMP_LIST: "deleteTempList";
    readonly RECOVER_LIST: "recoverList";
    readonly DELETE_LIST: "deleteList";
    readonly EXPORT_LIST: "exportList";
};
export type TableStyleConfig = {
    rowConfig?: {
        class?: string;
        hoverTitle?: string;
    };
};
export type CustomProTableProps<TData, TStatus, TTabCondition> = {
    loading?: boolean;
    vtsTableTitle?: string | ReactNode;
    data?: TData[];
    createBtnResourceCode?: string;
    exportBtnResourceCode?: string;
    importBtnResourceCode?: string;
    changeStatusResourceCode?: string;
    searchResourceCode?: string;
    tabGroup?: TabGroupConfig<TTabCondition> | null;
    columns?: ColumnGroupConfig<TData>;
    actionOptions?: ActionColOptions<TData>;
    statusOptions?: ItemStatusConfig<TStatus>;
    pagingParams?: PagingParameters;
    vtsShowPagination?: boolean;
    vtsTableLayout?: 'auto' | 'fixed';
    vtsShowCheckbox?: boolean;
    vtsShowTableConfig?: boolean;
    vtsSearchable?: boolean;
    vtsSearchImmediate?: boolean;
    moreActionsConfig?: ReactNode;
    moreActionsSelectedConfig?: ReactNode;
    moreFilterRef?: ReactNode;
    advancedSearchRef?: ReactNode;
    moreTableButtonsConfig?: ReactNode;
    vtsShowDeleteSelected?: boolean;
    noDataRender?: ReactNode;
    vtsScroll?: {
        x: string | null;
        y: string | null;
    };
    clearCheckedIds?: string[];
    rowHeight?: TableRowHeight;
    focusRowColor?: string;
    useButtonLabel?: boolean;
    maxPageSizeToUseVirtualScroll?: number;
    virtualScrollHeight?: string;
    clientPagination?: boolean;
    useSimplePagination?: boolean;
    useEllipsisPagination?: boolean;
    vtsShowQuickJumper?: boolean;
    vtsShowSizeChanger?: boolean;
    autoResize?: ProTableAutoResize;
    highlightOnClick?: boolean;
    noSearchPermissionMsg?: string;
    tableStyle?: TableStyleConfig | null;
    responsiveConfig?: ProTableResponsiveConfig;
    itemKey?: keyof TData | string;
    focusRowId?: unknown;
    scrollHeightVirtual?: string;
    configButtonsFlexWidth?: number;
    onReloadTable?: (value: boolean) => void;
    onSelectDataItemIds?: (ids: Set<string>) => void;
    onSelectData?: (rows: Set<TData>) => void;
    onClickDataItem?: (event: ClickRowEventType<TData>) => void;
    hasPermission?: (resourceCode?: string) => boolean;
    t?: (key: string, vars?: Record<string, unknown>) => string;
    theme?: string;
};
//# sourceMappingURL=types.d.ts.map