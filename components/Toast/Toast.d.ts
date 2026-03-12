import { ReactNode } from '../../../node_modules/react';
export type ToastType = 'success' | 'info' | 'warning' | 'error';
export interface ToastProps {
    open?: boolean;
    message: ReactNode;
    description?: ReactNode;
    type?: ToastType;
    duration?: number;
    onClose?: () => void;
    closable?: boolean;
    className?: string;
}
export declare function Toast({ open, message, description, type, duration, onClose, closable, className }: ToastProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Toast.d.ts.map