import { ActionColDropdown } from './types';
export declare function useDropdownButtonDecision<TData>(options: ActionColDropdown<TData>[] | undefined, hasPermission: (resourceCode?: string) => boolean, statusValue: unknown): {
    useDropdown: boolean;
    allowed: ActionColDropdown<TData>[];
};
//# sourceMappingURL=useDropdownButtonDecision.d.ts.map