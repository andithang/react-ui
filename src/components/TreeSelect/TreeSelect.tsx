import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode
} from 'react';
import type { LabeledValue as AntLabeledValue, SelectValue as AntSelectValue, TreeSelectProps as AntTreeSelectProps } from 'antd/es/tree-select';
import type { DataNode, SafeKey } from '@rc-component/tree-select/lib/interface';
import { Icon } from '../Icon/Icon';
import { cn } from '../../utils';
import './TreeSelect.scss';

export const SHOW_ALL = 'SHOW_ALL' as const;
export const SHOW_PARENT = 'SHOW_PARENT' as const;
export const SHOW_CHILD = 'SHOW_CHILD' as const;

export type TreeSelectShowCheckedStrategy = typeof SHOW_ALL | typeof SHOW_PARENT | typeof SHOW_CHILD;
export type TreeSelectValue = AntSelectValue;
export type TreeSelectLabeledValue = AntLabeledValue;
export type TreeSelectSize = 'small' | 'middle' | 'large';
export type TreeSelectStatus = 'error' | 'warning';

export interface TreeSelectFieldNames {
  label?: string;
  value?: string;
  children?: string;
  key?: string;
}

export interface TreeSelectSimpleModeConfig {
  id?: string | number;
  pId?: string | number;
  rootPId?: SafeKey;
}

export interface TreeSelectOption extends DataNode {
  disabled?: boolean;
  selectable?: boolean;
  disableCheckbox?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface TreeSelectChangeExtra<OptionType extends TreeSelectOption = TreeSelectOption> {
  preValue: TreeSelectLabeledValue[];
  triggerValue?: SafeKey;
  selected?: boolean;
  checked?: boolean;
  triggerNode?: OptionType;
}

export interface TreeSelectProps
  extends Omit<
      AntTreeSelectProps<TreeSelectValue, TreeSelectOption>,
      'treeData' | 'value' | 'defaultValue' | 'onChange' | 'onSelect' | 'onDeselect' | 'fieldNames' | 'treeDataSimpleMode'
    > {
  treeData?: TreeSelectOption[];
  value?: TreeSelectValue;
  defaultValue?: TreeSelectValue;
  fieldNames?: TreeSelectFieldNames;
  treeDataSimpleMode?: boolean | TreeSelectSimpleModeConfig;
  className?: string;
  rootClassName?: string;
  status?: TreeSelectStatus;
  size?: TreeSelectSize;
  showCheckedStrategy?: TreeSelectShowCheckedStrategy;
  onChange?: (
    value: TreeSelectValue,
    labelList: ReactNode | ReactNode[] | undefined,
    extra: TreeSelectChangeExtra
  ) => void;
  onSelect?: (value: SafeKey | TreeSelectLabeledValue, node: TreeSelectOption) => void;
  onDeselect?: (value: SafeKey | TreeSelectLabeledValue, node: TreeSelectOption) => void;
}

interface SelectionItem {
  key: string;
  value: SafeKey;
  label?: ReactNode;
}

interface NormalizedNode {
  key: string;
  value: SafeKey;
  label: ReactNode;
  searchText: string;
  disabled: boolean;
  selectable: boolean;
  disableCheckbox: boolean;
  children: NormalizedNode[];
  depth: number;
  raw: TreeSelectOption;
  parentKey?: string;
}

interface NormalizedTree {
  roots: NormalizedNode[];
  nodeMap: Map<string, NormalizedNode>;
  valueToKeyMap: Map<string, string>;
  parentByKey: Map<string, string | undefined>;
  expandableKeys: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isLabelValue(input: unknown): input is TreeSelectLabeledValue {
  return isRecord(input) && 'value' in input;
}

function toStringKey(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return '';
}

function toSelectionArray(value: TreeSelectValue | undefined): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null || value === '') {
    return [];
  }

  return [value];
}

function normalizeSelection(value: TreeSelectValue | undefined, valueToKeyMap: Map<string, string>): SelectionItem[] {
  const used = new Set<string>();
  const result: SelectionItem[] = [];

  toSelectionArray(value).forEach((item) => {
    if (isLabelValue(item)) {
      const rawValue = item.value;
      if (typeof rawValue !== 'string' && typeof rawValue !== 'number') {
        return;
      }

      const rawKey = item.key !== undefined ? toStringKey(item.key) : '';
      const key = rawKey || valueToKeyMap.get(String(rawValue)) || String(rawValue);

      if (!used.has(key)) {
        used.add(key);
        result.push({
          key,
          value: rawValue,
          label: item.label
        });
      }
      return;
    }

    if (typeof item === 'string' || typeof item === 'number') {
      const key = valueToKeyMap.get(String(item)) || String(item);

      if (!used.has(key)) {
        used.add(key);
        result.push({
          key,
          value: item
        });
      }
    }
  });

  return result;
}

function normalizeTreeData(treeData: TreeSelectOption[], simpleMode: TreeSelectProps['treeDataSimpleMode']): TreeSelectOption[] {
  if (!simpleMode) {
    return treeData;
  }

  const config = typeof simpleMode === 'object' ? simpleMode : {};
  const idField = String(config.id ?? 'id');
  const parentField = String(config.pId ?? 'pId');
  const rootParent = config.rootPId;

  const map = new Map<string, TreeSelectOption & { children: TreeSelectOption[] }>();
  const roots: Array<TreeSelectOption & { children: TreeSelectOption[] }> = [];

  treeData.forEach((node, index) => {
    const rawId = isRecord(node) ? node[idField] : undefined;
    const fallbackId = node.value ?? node.key ?? index;
    const id = toStringKey(rawId ?? fallbackId);
    const cloned: TreeSelectOption & { children: TreeSelectOption[] } = {
      ...node,
      children: []
    };

    map.set(id, cloned);
  });

  treeData.forEach((node, index) => {
    const rawId = isRecord(node) ? node[idField] : undefined;
    const fallbackId = node.value ?? node.key ?? index;
    const id = toStringKey(rawId ?? fallbackId);
    const current = map.get(id);

    if (!current) {
      return;
    }

    const parentValue = isRecord(node) ? node[parentField] : undefined;
    const parentKey = parentValue === undefined || parentValue === null ? undefined : toStringKey(parentValue);

    if (!parentKey || parentValue === rootParent || !map.has(parentKey)) {
      roots.push(current);
      return;
    }

    map.get(parentKey)?.children.push(current);
  });

  return roots;
}

function buildNormalizedTree(
  treeData: TreeSelectOption[],
  fieldNames: TreeSelectFieldNames,
  treeNodeLabelProp: string
): NormalizedTree {
  const labelField = fieldNames.label ?? 'title';
  const valueField = fieldNames.value ?? 'value';
  const childrenField = fieldNames.children ?? 'children';
  const keyField = fieldNames.key ?? 'key';
  const nodeMap = new Map<string, NormalizedNode>();
  const valueToKeyMap = new Map<string, string>();
  const parentByKey = new Map<string, string | undefined>();
  const expandableKeys: string[] = [];
  const seenKeys = new Map<string, number>();

  const makeNode = (raw: TreeSelectOption, depth: number, parentKey?: string): NormalizedNode => {
    const valueFromField = isRecord(raw) ? raw[valueField] : undefined;
    const keyFromField = isRecord(raw) ? raw[keyField] : undefined;
    const fallbackValue = valueFromField ?? raw.value ?? keyFromField ?? raw.key;
    const safeValue: SafeKey =
      typeof fallbackValue === 'string' || typeof fallbackValue === 'number'
        ? fallbackValue
        : `${parentKey ?? 'root'}-${depth}-${nodeMap.size + 1}`;
    const rawKey = toStringKey(keyFromField ?? raw.key ?? safeValue);
    const occur = seenKeys.get(rawKey) ?? 0;
    seenKeys.set(rawKey, occur + 1);
    const key = occur === 0 ? rawKey : `${rawKey}__${occur}`;
    const labelFromField = isRecord(raw) ? raw[labelField] : undefined;
    const labelFromNodeLabelProp = isRecord(raw) ? raw[treeNodeLabelProp] : undefined;
    const label = (labelFromField ?? labelFromNodeLabelProp ?? raw.title ?? raw.label ?? String(safeValue)) as ReactNode;
    const childNodes = ((isRecord(raw) ? raw[childrenField] : undefined) as TreeSelectOption[] | undefined) ?? raw.children ?? [];

    const node: NormalizedNode = {
      key,
      value: safeValue,
      label,
      searchText: String(labelFromField ?? raw[treeNodeLabelProp] ?? safeValue).toLowerCase(),
      disabled: Boolean(raw.disabled),
      selectable: raw.selectable !== false,
      disableCheckbox: Boolean((raw as { disableCheckbox?: boolean }).disableCheckbox),
      children: [],
      depth,
      raw,
      parentKey
    };

    nodeMap.set(key, node);
    valueToKeyMap.set(String(safeValue), key);
    parentByKey.set(key, parentKey);

    node.children = childNodes.map((child) => makeNode(child, depth + 1, key));
    if (node.children.length > 0) {
      expandableKeys.push(key);
    }

    return node;
  };

  const roots = treeData.map((item) => makeNode(item, 0));

  return {
    roots,
    nodeMap,
    valueToKeyMap,
    parentByKey,
    expandableKeys
  };
}

function toLabeledValue(item: SelectionItem, nodeMap: Map<string, NormalizedNode>): TreeSelectLabeledValue {
  const node = nodeMap.get(item.key);
  return {
    key: item.key,
    value: item.value,
    label: item.label ?? node?.label
  };
}

function toOutputValue(items: SelectionItem[], labelInValue: boolean, multipleMode: boolean): TreeSelectValue {
  if (labelInValue) {
    const values = items.map((item) => ({
      key: item.key,
      value: item.value,
      label: item.label
    }));

    return multipleMode ? values : values[0];
  }

  const values = items.map((item) => item.value);
  return multipleMode ? values : values[0];
}

function hasSelectedAncestor(key: string, selectedKeys: Set<string>, parentByKey: Map<string, string | undefined>): boolean {
  let cursor = parentByKey.get(key);
  while (cursor) {
    if (selectedKeys.has(cursor)) {
      return true;
    }
    cursor = parentByKey.get(cursor);
  }
  return false;
}

function hasSelectedDescendant(node: NormalizedNode, selectedKeys: Set<string>): boolean {
  return node.children.some((child) => selectedKeys.has(child.key) || hasSelectedDescendant(child, selectedKeys));
}

function applyCheckedStrategy(
  items: SelectionItem[],
  showCheckedStrategy: TreeSelectShowCheckedStrategy,
  nodeMap: Map<string, NormalizedNode>,
  parentByKey: Map<string, string | undefined>,
  selectedKeys: Set<string>
): SelectionItem[] {
  if (showCheckedStrategy === SHOW_ALL) {
    return items;
  }

  if (showCheckedStrategy === SHOW_PARENT) {
    return items.filter((item) => !hasSelectedAncestor(item.key, selectedKeys, parentByKey));
  }

  return items.filter((item) => {
    const node = nodeMap.get(item.key);
    if (!node) {
      return true;
    }
    return !hasSelectedDescendant(node, selectedKeys);
  });
}

export function TreeSelect({
  treeData = [],
  treeDataSimpleMode,
  fieldNames,
  treeNodeFilterProp = 'value',
  treeNodeLabelProp = 'title',
  value,
  defaultValue,
  multiple = false,
  treeCheckable = false,
  labelInValue = false,
  showCheckedStrategy = SHOW_CHILD,
  placeholder = 'Please select',
  showSearch,
  searchValue,
  onSearch,
  allowClear = false,
  disabled = false,
  open,
  defaultOpen = false,
  onOpenChange,
  onDropdownVisibleChange,
  treeExpandedKeys,
  treeDefaultExpandedKeys,
  treeDefaultExpandAll = false,
  onTreeExpand,
  filterTreeNode = true,
  className,
  rootClassName,
  id,
  style,
  popupClassName,
  dropdownClassName,
  dropdownStyle,
  popupMatchSelectWidth,
  dropdownMatchSelectWidth,
  notFoundContent = 'Not Found',
  status,
  size = 'middle',
  suffixIcon,
  showArrow = true,
  switcherIcon,
  maxTagCount,
  maxTagPlaceholder,
  onChange,
  onSelect,
  onDeselect
}: TreeSelectProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popupId = useId();
  const checkable = Boolean(treeCheckable);
  const multipleMode = checkable || Boolean(multiple);
  const mergedShowSearch = showSearch ?? multipleMode;
  const treeNodes = useMemo(() => normalizeTreeData(treeData, treeDataSimpleMode), [treeData, treeDataSimpleMode]);
  const mergedFieldNames = useMemo<TreeSelectFieldNames>(() => fieldNames ?? {}, [fieldNames]);
  const { roots, nodeMap, valueToKeyMap, parentByKey, expandableKeys } = useMemo(
    () => buildNormalizedTree(treeNodes, mergedFieldNames, treeNodeLabelProp),
    [treeNodes, mergedFieldNames, treeNodeLabelProp]
  );

  const isValueControlled = value !== undefined;
  const isOpenControlled = open !== undefined;
  const isSearchControlled = searchValue !== undefined;
  const isExpandedControlled = treeExpandedKeys !== undefined;

  const [innerValue, setInnerValue] = useState<SelectionItem[]>(() => normalizeSelection(defaultValue, valueToKeyMap));
  const [innerOpen, setInnerOpen] = useState(Boolean(defaultOpen));
  const [innerSearch, setInnerSearch] = useState('');
  const [innerExpandedKeys, setInnerExpandedKeys] = useState<string[]>(() => {
    if (treeDefaultExpandedKeys && treeDefaultExpandedKeys.length > 0) {
      return treeDefaultExpandedKeys.map((item) => String(item));
    }

    if (treeDefaultExpandAll) {
      return expandableKeys;
    }

    return [];
  });

  const selectedItems = useMemo(
    () => (isValueControlled ? normalizeSelection(value, valueToKeyMap) : innerValue),
    [innerValue, isValueControlled, value, valueToKeyMap]
  );
  const selectedKeySet = useMemo(() => new Set(selectedItems.map((item) => item.key)), [selectedItems]);
  const mergedOpen = isOpenControlled ? Boolean(open) : innerOpen;
  const mergedSearch = isSearchControlled ? String(searchValue ?? '') : innerSearch;
  const expandedKeySet = useMemo(() => {
    const source = isExpandedControlled ? (treeExpandedKeys ?? []).map((item) => String(item)) : innerExpandedKeys;
    const valid = source.filter((item) => nodeMap.has(item));
    return new Set(valid);
  }, [innerExpandedKeys, isExpandedControlled, nodeMap, treeExpandedKeys]);

  const displayedItems = useMemo(
    () => (checkable ? applyCheckedStrategy(selectedItems, showCheckedStrategy, nodeMap, parentByKey, selectedKeySet) : selectedItems),
    [checkable, nodeMap, parentByKey, selectedItems, selectedKeySet, showCheckedStrategy]
  );

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) {
        setInnerOpen(nextOpen);
      }

      if (!nextOpen && !isSearchControlled) {
        setInnerSearch('');
      }

      onOpenChange?.(nextOpen);
      onDropdownVisibleChange?.(nextOpen);
    },
    [isOpenControlled, isSearchControlled, onDropdownVisibleChange, onOpenChange]
  );

  const setSearchState = (next: string) => {
    if (!isSearchControlled) {
      setInnerSearch(next);
    }
    onSearch?.(next);
  };

  const setExpandedState = (keys: string[]) => {
    if (!isExpandedControlled) {
      setInnerExpandedKeys(keys);
    }
    onTreeExpand?.(keys);
  };

  useEffect(() => {
    if (!mergedOpen || !mergedShowSearch) {
      return;
    }

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [mergedOpen, mergedShowSearch]);

  useEffect(() => {
    if (!mergedOpen) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenState(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [mergedOpen, setOpenState]);

  const emitSelection = (nextItems: SelectionItem[], triggerNode?: NormalizedNode, selected?: boolean) => {
    const nextValue = toOutputValue(nextItems, labelInValue, multipleMode);
    const nextLabels = nextItems.map((item) => item.label ?? nodeMap.get(item.key)?.label).filter((label) => label !== undefined);
    const labelOutput = multipleMode ? nextLabels : nextLabels[0];
    const extra: TreeSelectChangeExtra = {
      preValue: selectedItems.map((item) => toLabeledValue(item, nodeMap)),
      triggerValue: triggerNode?.value,
      selected,
      checked: checkable ? selected : undefined,
      triggerNode: triggerNode?.raw
    };

    if (!isValueControlled) {
      setInnerValue(nextItems);
    }

    onChange?.(nextValue, labelOutput, extra);
  };

  const updateByKeys = (nextKeys: string[], triggerNode?: NormalizedNode, selected?: boolean) => {
    const used = new Set<string>();
    const nextItems: SelectionItem[] = [];

    nextKeys.forEach((key) => {
      if (used.has(key)) {
        return;
      }

      used.add(key);
      const node = nodeMap.get(key);
      const previous = selectedItems.find((item) => item.key === key);
      const valueItem = node?.value ?? previous?.value;

      if (valueItem === undefined) {
        return;
      }

      nextItems.push({
        key,
        value: valueItem,
        label: node?.label ?? previous?.label
      });
    });

    emitSelection(nextItems, triggerNode, selected);
  };

  const selectNode = (node: NormalizedNode) => {
    if (disabled || node.disabled || !node.selectable) {
      return;
    }

    const isSelected = selectedKeySet.has(node.key);

    if (multipleMode) {
      if (checkable && node.disableCheckbox) {
        return;
      }

      const nextKeys = isSelected ? selectedItems.filter((item) => item.key !== node.key).map((item) => item.key) : [...selectedItems.map((item) => item.key), node.key];

      updateByKeys(nextKeys, node, !isSelected);

      if (!isSelected) {
        onSelect?.(
          labelInValue ? ({ key: node.key, value: node.value, label: node.label } as TreeSelectLabeledValue) : node.value,
          node.raw
        );
      } else {
        onDeselect?.(
          labelInValue ? ({ key: node.key, value: node.value, label: node.label } as TreeSelectLabeledValue) : node.value,
          node.raw
        );
      }
      return;
    }

    updateByKeys([node.key], node, !isSelected);
    onSelect?.(
      labelInValue ? ({ key: node.key, value: node.value, label: node.label } as TreeSelectLabeledValue) : node.value,
      node.raw
    );
    setOpenState(false);
  };

  const clearSelection = () => {
    if (disabled || selectedItems.length === 0) {
      return;
    }

    updateByKeys([], undefined, false);
  };

  const toggleExpand = (node: NormalizedNode) => {
    if (node.children.length === 0) {
      return;
    }

    const next = new Set(expandedKeySet);
    if (next.has(node.key)) {
      next.delete(node.key);
    } else {
      next.add(node.key);
    }
    setExpandedState(Array.from(next));
  };

  const searchFilter = useMemo(() => {
    const keyword = mergedSearch.trim().toLowerCase();
    if (!keyword || filterTreeNode === false) {
      return undefined;
    }

    const matches = new Set<string>();
    const filterByProp = String(treeNodeFilterProp || 'value');

    nodeMap.forEach((node) => {
      const hit =
        typeof filterTreeNode === 'function'
          ? filterTreeNode(keyword, node.raw)
          : String((node.raw as Record<string, unknown>)[filterByProp] ?? node.searchText).toLowerCase().includes(keyword);

      if (!hit) {
        return;
      }

      matches.add(node.key);
      let parentKey = node.parentKey;
      while (parentKey) {
        matches.add(parentKey);
        parentKey = nodeMap.get(parentKey)?.parentKey;
      }
    });

    return matches;
  }, [filterTreeNode, mergedSearch, nodeMap, treeNodeFilterProp]);

  const visibleNodes = useMemo(() => {
    const rows: NormalizedNode[] = [];

    const walk = (node: NormalizedNode) => {
      if (searchFilter && !searchFilter.has(node.key)) {
        return;
      }

      rows.push(node);
      const expanded = searchFilter ? true : expandedKeySet.has(node.key);
      if (node.children.length > 0 && expanded) {
        node.children.forEach(walk);
      }
    };

    roots.forEach(walk);
    return rows;
  }, [expandedKeySet, roots, searchFilter]);

  const selectorText = !multipleMode ? selectedItems[0]?.label ?? nodeMap.get(selectedItems[0]?.key ?? '')?.label : undefined;
  const inputPlaceholder = typeof placeholder === 'string' ? placeholder : 'Please select';
  const popupClass = popupClassName ?? dropdownClassName;
  const matchWidth = popupMatchSelectWidth ?? dropdownMatchSelectWidth ?? true;
  const popupStyle: CSSProperties = {
    ...(matchWidth === true ? { minWidth: '100%' } : {}),
    ...(typeof matchWidth === 'number' ? { width: `${matchWidth}px` } : {}),
    ...dropdownStyle
  };
  const hasSelection = selectedItems.length > 0;

  const visibleTagCount = typeof maxTagCount === 'number' ? maxTagCount : displayedItems.length;
  const shownItems = displayedItems.slice(0, visibleTagCount);
  const omittedItems = displayedItems.slice(visibleTagCount);
  const omittedPlaceholder =
    typeof maxTagPlaceholder === 'function'
      ? maxTagPlaceholder(omittedItems.map((item) => toLabeledValue(item, nodeMap)))
      : maxTagPlaceholder ?? `+${omittedItems.length}...`;

  const onSelectorKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === 'Escape') {
      setOpenState(false);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenState(!mergedOpen);
      return;
    }

    if (event.key === 'ArrowDown' && !mergedOpen) {
      event.preventDefault();
      setOpenState(true);
    }
  };

  return (
    <div
      id={id}
      ref={rootRef}
      style={style}
      className={cn('ui-tree-select', `ui-tree-select--${size}`, status && `ui-tree-select--${status}`, rootClassName, className)}
    >
      <div
        className={cn('ui-tree-select__selector', 'ui-control', status === 'error' && 'ui-control--error', disabled && 'is-disabled')}
        role="combobox"
        aria-haspopup="tree"
        aria-controls={popupId}
        aria-expanded={mergedOpen}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (!disabled) {
            setOpenState(true);
          }
        }}
        onKeyDown={onSelectorKeyDown}
      >
        <span className="ui-tree-select__content">
          {multipleMode ? (
            <>
              {shownItems.map((item) => (
                <span key={item.key} className="ui-tree-select__tag">
                  <span className="ui-tree-select__tag-content">{item.label ?? nodeMap.get(item.key)?.label ?? item.value}</span>
                  {!disabled ? (
                    <button
                      type="button"
                      className="ui-tree-select__tag-remove"
                      aria-label="Remove selection"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        updateByKeys(
                          selectedItems.filter((selectedItem) => selectedItem.key !== item.key).map((selectedItem) => selectedItem.key),
                          nodeMap.get(item.key),
                          false
                        );
                      }}
                    >
                      <Icon name="closeOutline" size="0.7rem" aria-hidden="true" />
                    </button>
                  ) : null}
                </span>
              ))}
              {omittedItems.length > 0 ? <span className="ui-tree-select__tag ui-tree-select__tag--placeholder">{omittedPlaceholder}</span> : null}
              {mergedShowSearch ? (
                <input
                  ref={inputRef}
                  className="ui-tree-select__search"
                  value={mergedSearch}
                  onChange={(event) => setSearchState(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  placeholder={hasSelection ? '' : inputPlaceholder}
                  disabled={disabled}
                />
              ) : null}
            </>
          ) : mergedShowSearch ? (
            <input
              ref={inputRef}
              className="ui-tree-select__search ui-tree-select__search--single"
              value={mergedSearch}
              onChange={(event) => setSearchState(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              placeholder={selectorText ? '' : inputPlaceholder}
              disabled={disabled}
            />
          ) : (
            <span className={cn('ui-tree-select__single', !selectorText && 'ui-tree-select__placeholder')}>
              {selectorText ?? placeholder}
            </span>
          )}
        </span>

        <span className="ui-tree-select__actions">
          {allowClear && hasSelection && !disabled ? (
            <Icon
              name="closeOutline"
              className="ui-tree-select__clear"
              role="button"
              tabIndex={0}
              size="0.75rem"
              aria-label="Clear selection"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                clearSelection();
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  event.stopPropagation();
                  clearSelection();
                }
              }}
            />
          ) : null}
          {showArrow ? (
            suffixIcon ? (
              <span className={cn('ui-tree-select__icon', mergedOpen && 'ui-tree-select__icon--open')} aria-hidden="true">
                {suffixIcon}
              </span>
            ) : (
              <Icon
                name="chevronDown"
                className={cn('ui-tree-select__icon', mergedOpen && 'ui-tree-select__icon--open')}
                size="0.75rem"
                aria-hidden="true"
              />
            )
          ) : null}
        </span>
      </div>

      {mergedOpen ? (
        <div id={popupId} className={cn('ui-tree-select__dropdown', popupClass)} style={popupStyle} role="tree">
          {visibleNodes.length ? (
            visibleNodes.map((node) => {
              const selected = selectedKeySet.has(node.key);
              const expanded = searchFilter ? true : expandedKeySet.has(node.key);
              const hasChildren = node.children.length > 0;

              return (
                <div
                  key={node.key}
                  className={cn('ui-tree-select__row', node.raw.className, selected && 'ui-tree-select__row--selected', node.disabled && 'is-disabled')}
                  style={{
                    paddingLeft: `${node.depth * 18 + 10}px`,
                    ...(node.raw.style ?? {})
                  }}
                  role="treeitem"
                  aria-selected={selected}
                  aria-expanded={hasChildren ? expanded : undefined}
                >
                  <button
                    type="button"
                    className={cn('ui-tree-select__switcher', !hasChildren && 'ui-tree-select__switcher--leaf')}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleExpand(node);
                    }}
                    aria-label={expanded ? 'Collapse node' : 'Expand node'}
                    tabIndex={-1}
                  >
                    {hasChildren ? (
                      <span className={cn('ui-tree-select__switcher-icon', expanded && 'ui-tree-select__switcher-icon--open')}>
                        {typeof switcherIcon === 'function'
                          ? switcherIcon(node.raw as never)
                          : switcherIcon ?? <span className="ui-tree-select__caret" />}
                      </span>
                    ) : null}
                  </button>

                  <button
                    type="button"
                    className="ui-tree-select__node"
                    disabled={disabled || node.disabled || !node.selectable}
                    onClick={() => selectNode(node)}
                  >
                    {checkable ? (
                      <span className={cn('ui-tree-select__checkbox', selected && 'ui-tree-select__checkbox--checked')} aria-hidden="true" />
                    ) : null}
                    <span className="ui-tree-select__title">{node.label}</span>
                    {!checkable && selected ? <span className="ui-tree-select__check" aria-hidden="true" /> : null}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="ui-tree-select__empty">{notFoundContent}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
