import { CSSProperties, ForwardedRef, HTMLAttributes, JSX, ReactNode } from '../../../node_modules/react';
export type CheckableTagValue = string | number;
export interface CheckableTagOption<T extends CheckableTagValue> {
    value: T;
    label: ReactNode;
}
interface CheckableTagGroupSingleProps<T extends CheckableTagValue> {
    multiple?: false;
    value?: T | null;
    defaultValue?: T | null;
    onChange?: (value: T | null) => void;
}
interface CheckableTagGroupMultipleProps<T extends CheckableTagValue> {
    multiple: true;
    value?: T[];
    defaultValue?: T[];
    onChange?: (value: T[]) => void;
}
export interface CheckableTagGroupClassNames {
    root?: string;
    item?: string;
}
export interface CheckableTagGroupStyles {
    root?: CSSProperties;
    item?: CSSProperties;
}
type CheckableTagGroupModeProps<T extends CheckableTagValue> = CheckableTagGroupSingleProps<T> | CheckableTagGroupMultipleProps<T>;
export type CheckableTagGroupProps<T extends CheckableTagValue = string> = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & CheckableTagGroupModeProps<T> & {
    options?: Array<CheckableTagOption<T> | T>;
    disabled?: boolean;
    classNames?: CheckableTagGroupClassNames;
    styles?: CheckableTagGroupStyles;
};
export declare const CheckableTagGroup: <T extends CheckableTagValue>(props: CheckableTagGroupProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
}) => JSX.Element;
export {};
//# sourceMappingURL=CheckableTagGroup.d.ts.map