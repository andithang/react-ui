import { CSSProperties, ReactNode } from '../../../node_modules/react';
import { InputProps } from '../Input/Input';
export interface AutoCompleteOption {
    value: string;
    label?: ReactNode;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'options'> {
    options?: AutoCompleteOption[];
    open?: boolean;
    defaultOpen?: boolean;
    popupClassName?: string;
    dropdownMatchSelectWidth?: boolean | number;
    notFoundContent?: ReactNode;
    filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
    backfill?: boolean;
    onSearch?: (value: string) => void;
    onSelect?: (value: string, option: AutoCompleteOption) => void;
    onDropdownVisibleChange?: (open: boolean) => void;
    onOpenChange?: (open: boolean) => void;
}
export declare function AutoComplete({ options, open, defaultOpen, popupClassName, dropdownMatchSelectWidth, notFoundContent, filterOption, backfill, onSearch, onSelect, onDropdownVisibleChange, onOpenChange, onChange, value, defaultValue, className, ...props }: AutoCompleteProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AutoComplete.d.ts.map