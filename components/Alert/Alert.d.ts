import { CSSProperties, MouseEventHandler, ReactNode } from '../../../node_modules/react';
type AlertType = 'success' | 'info' | 'warning' | 'error';
export interface AlertRef {
    nativeElement: HTMLDivElement;
}
export interface AlertSemanticType {
    classNames: {
        root?: string;
        icon?: string;
        section?: string;
        title?: string;
        description?: string;
        actions?: string;
        close?: string;
    };
    styles: {
        root?: CSSProperties;
        icon?: CSSProperties;
        section?: CSSProperties;
        title?: CSSProperties;
        description?: CSSProperties;
        actions?: CSSProperties;
        close?: CSSProperties;
    };
}
export type AlertClassNamesType = AlertSemanticType['classNames'];
export type AlertStylesType = AlertSemanticType['styles'];
export interface AlertClosable {
    closeIcon?: ReactNode;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    afterClose?: () => void;
    [key: `aria-${string}`]: string | number | boolean | undefined;
    [key: `data-${string}`]: string | number | boolean | undefined;
}
export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    type?: AlertType;
    closable?: boolean | AlertClosable;
    /**
     * @deprecated Use `closable.closeIcon` instead.
     */
    closeText?: ReactNode;
    title?: ReactNode;
    /**
     * @deprecated Use `title` instead.
     */
    message?: ReactNode;
    description?: ReactNode;
    /**
     * @deprecated Use `closable.onClose` instead.
     */
    onClose?: MouseEventHandler<HTMLButtonElement>;
    /**
     * @deprecated Use `closable.afterClose` instead.
     */
    afterClose?: () => void;
    showIcon?: boolean;
    role?: string;
    style?: CSSProperties;
    prefixCls?: string;
    className?: string;
    classNames?: AlertClassNamesType;
    styles?: AlertStylesType;
    rootClassName?: string;
    banner?: boolean;
    icon?: ReactNode;
    /**
     * @deprecated Use `closable.closeIcon` instead.
     */
    closeIcon?: ReactNode;
    action?: ReactNode;
    id?: string;
}
export declare const Alert: import('../../../node_modules/react').ForwardRefExoticComponent<AlertProps & import('../../../node_modules/react').RefAttributes<AlertRef>>;
export {};
//# sourceMappingURL=Alert.d.ts.map