import { AnchorHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from '../../../node_modules/react';
export interface AnchorLinkItemProps {
    key?: string;
    href: string;
    title: ReactNode;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    children?: AnchorLinkItemProps[];
    className?: string;
    style?: CSSProperties;
}
export interface AnchorDirectionBounds {
    top?: number;
    bottom?: number;
}
export interface AnchorProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'onClick'> {
    items?: AnchorLinkItemProps[];
    bounds?: number;
    offsetTop?: number;
    targetOffset?: number;
    affix?: boolean;
    showInkInFixed?: boolean;
    getContainer?: () => HTMLElement | Window;
    getCurrentAnchor?: (activeLink: string) => string;
    direction?: 'vertical' | 'horizontal';
    replace?: boolean;
    onChange?: (currentActiveLink: string) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>, link: AnchorLinkItemProps) => void;
}
export declare function Anchor({ items, bounds, offsetTop, targetOffset, affix, direction, replace, getContainer, getCurrentAnchor, onChange, onClick, className, ...props }: AnchorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Anchor.d.ts.map