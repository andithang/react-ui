import type { ReactNode } from 'react';
import { cn } from '../../utils';
import { CustomIndicator } from './CustomIndicator';

type CustomSpinProps = {
  loading?: boolean;
  width?: number;
  height?: number;
  children?: ReactNode;
  theme?: string;
};

export function CustomSpin({ loading = false, width, height, theme, children }: CustomSpinProps) {
  return (
    <div className={cn('ui-custom-spin', loading && 'is-loading')}>
      {loading ? (
        <span className="ui-custom-spin__indicator">
          <CustomIndicator loading width={width} height={height} theme={theme} />
        </span>
      ) : null}
      <div className="ui-custom-spin__content">{children}</div>
    </div>
  );
}

export type { CustomSpinProps };
