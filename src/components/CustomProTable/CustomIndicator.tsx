import { cn } from '../../utils';

type CustomIndicatorProps = {
  loading?: boolean;
  width?: number;
  height?: number;
  theme?: string;
};

export function CustomIndicator({ loading = true, width = 72, height = 72, theme = 'sarabun-blue' }: CustomIndicatorProps) {
  if (!loading) return null;

  return (
    <span className={cn('ui-custom-indicator', `spin-${theme}-indicator`)}>
      <img src={`assets/svg-icons/spin-${theme}.svg`} alt={`spin-${theme}`} width={width} height={height} />
    </span>
  );
}

export type { CustomIndicatorProps };
