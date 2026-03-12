import { HTMLAttributes, MouseEvent, ReactNode } from '../../../node_modules/react';
export interface CheckableTagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
    checked: boolean;
    icon?: ReactNode;
    onChange?: (checked: boolean) => void;
    onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
    disabled?: boolean;
}
export declare const CheckableTag: import('../../../node_modules/react').ForwardRefExoticComponent<CheckableTagProps & import('../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=CheckableTag.d.ts.map