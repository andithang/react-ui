import { HTMLAttributes, ReactNode } from '../../../node_modules/react';
export interface TabItem {
    id: string;
    label: ReactNode;
    content: ReactNode;
}
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    items: TabItem[];
    defaultTabId?: string;
    activeTabId?: string;
    onTabChange?: (tabId: string) => void;
}
export declare function Tabs({ items, defaultTabId, activeTabId, onTabChange, className, id, ...props }: TabsProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Tabs.d.ts.map