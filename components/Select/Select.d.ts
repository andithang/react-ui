import { SelectHTMLAttributes } from '../../../node_modules/react';
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    hint?: string;
    error?: string;
}
export declare function Select({ label, hint, error, id, className, children, value, defaultValue, onChange, disabled, ...props }: SelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Select.d.ts.map