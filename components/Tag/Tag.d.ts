import { HTMLAttributes, ReactNode } from '../../../node_modules/react';
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    closable?: boolean;
    onClose?: () => void;
    closeLabel?: string;
    closeAsSpan?: boolean;
    children: ReactNode;
}
export declare function Tag({ closable, onClose, closeLabel, closeAsSpan, className, children, ...props }: TagProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Tag.d.ts.map