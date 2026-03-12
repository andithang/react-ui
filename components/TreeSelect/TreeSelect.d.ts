export interface TreeSelectOption {
    title: string;
    value: string;
    disabled?: boolean;
    children?: TreeSelectOption[];
}
export interface TreeSelectProps {
    treeData: TreeSelectOption[];
    value?: string | string[];
    defaultValue?: string | string[];
    multiple?: boolean;
    treeCheckable?: boolean;
    placeholder?: string;
    showSearch?: boolean;
    allowClear?: boolean;
    className?: string;
    onChange?: (value: string | string[]) => void;
}
export declare function TreeSelect({ treeData, value, defaultValue, multiple, treeCheckable, placeholder, showSearch, allowClear, className, onChange }: TreeSelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TreeSelect.d.ts.map