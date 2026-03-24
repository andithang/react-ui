import { Typography } from '../Typography/Typography';

type NoPermissionTableProps = {
  message?: string;
  resourceCode?: string;
  t?: (key: string, vars?: Record<string, unknown>) => string;
};

export function NoPermissionTable({
  message = 'common.table.no_search_permission',
  resourceCode = '',
  t = (key) => key
}: NoPermissionTableProps) {
  return (
    <div className="ui-no-permission-table" role="status" aria-live="polite">
      <Typography>{t(message, resourceCode ? { resourceCode } : undefined)}</Typography>
    </div>
  );
}

export type { NoPermissionTableProps };
