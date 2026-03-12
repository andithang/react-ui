import { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from '../../../node_modules/react';
import { CheckableTag, CheckableTagProps } from './CheckableTag';
import { CheckableTagGroup, CheckableTagGroupProps } from './CheckableTagGroup';
export type TagPresetColor = 'magenta' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple';
export type TagStatusColor = 'success' | 'processing' | 'error' | 'warning' | 'default';
export type TagColor = TagPresetColor | TagStatusColor | (string & {});
export type TagVariant = 'filled' | 'solid' | 'outlined';
export interface TagSemanticClassNames {
    root?: string;
    icon?: string;
    content?: string;
    closeIcon?: string;
}
export interface TagSemanticStyles {
    root?: CSSProperties;
    icon?: CSSProperties;
    content?: CSSProperties;
    closeIcon?: CSSProperties;
}
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    prefixCls?: string;
    rootClassName?: string;
    color?: TagColor;
    variant?: TagVariant;
    closable?: boolean;
    closeIcon?: ReactNode | boolean;
    onClose?: (event: MouseEvent<HTMLElement>) => void;
    icon?: ReactNode;
    bordered?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    classNames?: TagSemanticClassNames;
    styles?: TagSemanticStyles;
}
declare const InternalTag: import('../../../node_modules/react').ForwardRefExoticComponent<TagProps & import('../../../node_modules/react').RefAttributes<HTMLAnchorElement | HTMLSpanElement>>;
export type TagType = typeof InternalTag & {
    CheckableTag: typeof CheckableTag;
    CheckableTagGroup: typeof CheckableTagGroup;
};
export declare const Tag: TagType;
export { CheckableTag, CheckableTagGroup };
export type { CheckableTagProps, CheckableTagGroupProps };
//# sourceMappingURL=Tag.d.ts.map