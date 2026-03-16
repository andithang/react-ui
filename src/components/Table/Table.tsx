import { Table as AntTable } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import type {
  ColumnProps,
  ColumnsType,
  ColumnType,
  ComponentsSemantic,
  ComponentsSemanticClassNames,
  ComponentsSemanticStyles,
  TablePaginationConfig,
  TableProps as AntTableProps,
  TableRef,
  TableSemanticClassNames,
  TableSemanticName,
  TableSemanticStyles
} from 'antd/es/table';
import type {
  ColumnFilterItem,
  ColumnTitleProps,
  CompareFn,
  ExpandType,
  FilterDropdownProps,
  FilterKey,
  FilterSearchType,
  FilterValue,
  GetPopupContainer,
  RowSelectMethod,
  RowSelectionType,
  SelectionItem,
  SelectionItemSelectFn,
  SelectionSelectFn,
  SorterResult,
  SorterTooltipProps,
  SorterTooltipTarget,
  SortOrder,
  TableAction,
  TableCurrentDataSource,
  TableLocale,
  TablePaginationPlacement,
  TablePaginationPosition,
  TableRowSelection,
  TransformColumns
} from 'antd/es/table/interface';
import { cn } from '../../utils';
import './Table.scss';

export type {
  AnyObject,
  ColumnFilterItem,
  ColumnProps,
  ColumnTitleProps,
  ColumnsType,
  ColumnType,
  CompareFn,
  ComponentsSemantic,
  ComponentsSemanticClassNames,
  ComponentsSemanticStyles,
  ExpandType,
  FilterDropdownProps,
  FilterKey,
  FilterSearchType,
  FilterValue,
  GetPopupContainer,
  RowSelectMethod,
  RowSelectionType,
  SelectionItem,
  SelectionItemSelectFn,
  SelectionSelectFn,
  SorterResult,
  SorterTooltipProps,
  SorterTooltipTarget,
  SortOrder,
  TableAction,
  TableCurrentDataSource,
  TableLocale,
  TablePaginationConfig,
  TablePaginationPlacement,
  TablePaginationPosition,
  TableRef,
  TableRowSelection,
  TableSemanticClassNames,
  TableSemanticName,
  TableSemanticStyles,
  TransformColumns
};

export type TableColumnType<RecordType = AnyObject> = ColumnType<RecordType>;
export type TableOnChangeExtra<RecordType = AnyObject> = TableCurrentDataSource<RecordType>;
export type TableProps<RecordType = AnyObject> = AntTableProps<RecordType>;

export function Table<RecordType = AnyObject>({ className, ...props }: TableProps<RecordType>) {
  return <AntTable<RecordType> className={cn('ui-table', className)} {...props} />;
}
