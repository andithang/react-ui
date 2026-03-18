import { CSSProperties, HTMLAttributes, ReactNode } from '../../../node_modules/react';
export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
    image?: ReactNode;
    imageStyle?: CSSProperties;
    description?: ReactNode;
    children?: ReactNode;
}
declare function InternalEmpty({ image, imageStyle, description, children, className, ...restProps }: EmptyProps): import("react/jsx-runtime").JSX.Element;
export type EmptyType = typeof InternalEmpty & {
    PRESENTED_IMAGE_DEFAULT: ReactNode;
    PRESENTED_IMAGE_SIMPLE: ReactNode;
};
export declare const Empty: EmptyType;
export {};
//# sourceMappingURL=Empty.d.ts.map