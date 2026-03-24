import type { ActionColDropdown } from './types';

export function useDropdownButtonDecision<TData>(
  options: ActionColDropdown<TData>[] | undefined,
  hasPermission: (resourceCode?: string) => boolean,
  statusValue: unknown
) {
  const allowed = (options ?? []).filter((option) => {
    if (option.hidden) return false;
    if (!hasPermission(option.resourceCode)) return false;
    if (!option.validStatus?.length) return true;
    return option.validStatus.includes(statusValue as number | string | boolean);
  });

  return {
    useDropdown: allowed.length > 1,
    allowed
  };
}
