import { ReactNode } from '../../../node_modules/react';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    ariaLabel?: string;
    children: ReactNode;
    className?: string;
}
export declare function Modal({ open, onClose, title, ariaLabel, children, className }: ModalProps): import('../../../node_modules/react').ReactPortal | null;
//# sourceMappingURL=Modal.d.ts.map