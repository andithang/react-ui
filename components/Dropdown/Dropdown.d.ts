import { ReactNode } from '../../../node_modules/react';
export interface DropdownMenuItem {
    key: string;
    label: ReactNode;
    disabled?: boolean;
    danger?: boolean;
    onClick?: () => void;
}
export interface DropdownProps {
    trigger?: ReactNode;
    items: DropdownMenuItem[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (nextOpen: boolean) => void;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
    className?: string;
}
export declare function Dropdown({ trigger, items, open, defaultOpen, onOpenChange, placement, className }: DropdownProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Dropdown.d.ts.map