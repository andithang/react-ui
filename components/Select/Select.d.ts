import { ReactNode, SelectHTMLAttributes } from '../../../node_modules/react';
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    hint?: string;
    error?: string;
    prefixTitle?: ReactNode;
    enableSelectAll?: boolean;
    selectAllValue?: string | number;
    selectAllLabel?: string;
}
export declare function Select({ label, hint, error, id, className, children, value, defaultValue, onChange, disabled, multiple, prefixTitle, enableSelectAll, selectAllValue, selectAllLabel, ...props }: SelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Select.d.ts.map