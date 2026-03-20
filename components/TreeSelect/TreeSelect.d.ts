import { CSSProperties, ReactNode } from '../../../node_modules/react';
import { LabeledValue as AntLabeledValue, SelectValue as AntSelectValue, TreeSelectProps as AntTreeSelectProps } from 'antd/es/tree-select';
import { DataNode, SafeKey } from '@rc-component/tree-select/lib/interface';
export declare const SHOW_ALL: "SHOW_ALL";
export declare const SHOW_PARENT: "SHOW_PARENT";
export declare const SHOW_CHILD: "SHOW_CHILD";
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
export interface TreeSelectProps extends Omit<AntTreeSelectProps<TreeSelectValue, TreeSelectOption>, 'treeData' | 'value' | 'defaultValue' | 'onChange' | 'onSelect' | 'onDeselect' | 'fieldNames' | 'treeDataSimpleMode'> {
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
    onChange?: (value: TreeSelectValue, labelList: ReactNode | ReactNode[] | undefined, extra: TreeSelectChangeExtra) => void;
    onSelect?: (value: SafeKey | TreeSelectLabeledValue, node: TreeSelectOption) => void;
    onDeselect?: (value: SafeKey | TreeSelectLabeledValue, node: TreeSelectOption) => void;
}
export declare function TreeSelect({ treeData, treeDataSimpleMode, fieldNames, treeNodeFilterProp, treeNodeLabelProp, value, defaultValue, multiple, treeCheckable, labelInValue, showCheckedStrategy, placeholder, showSearch, searchValue, onSearch, allowClear, disabled, open, defaultOpen, onOpenChange, onDropdownVisibleChange, treeExpandedKeys, treeDefaultExpandedKeys, treeDefaultExpandAll, onTreeExpand, filterTreeNode, className, rootClassName, id, style, popupClassName, dropdownClassName, dropdownStyle, popupMatchSelectWidth, dropdownMatchSelectWidth, notFoundContent, status, size, suffixIcon, showArrow, switcherIcon, maxTagCount, maxTagPlaceholder, onChange, onSelect, onDeselect }: TreeSelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TreeSelect.d.ts.map