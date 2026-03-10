import { InputHTMLAttributes } from '../../../node_modules/react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
}
export declare function Input({ label, hint, error, id, className, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Input.d.ts.map