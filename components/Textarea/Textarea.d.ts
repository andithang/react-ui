import { TextareaHTMLAttributes } from '../../../node_modules/react';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    hint?: string;
    error?: string;
}
export declare function Textarea({ label, hint, error, id, className, ...props }: TextareaProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Textarea.d.ts.map