import type { SVGProps } from 'react';
import { cn } from '../../utils';
import {
  ICON_NAMES,
  ICON_NAMES_BY_SOURCE,
  LEGACY_ICON_NAMES,
  SOURCE_ICON_NAMES,
  getIconDefinition,
  type IconName
} from './icon-sources';
import './Icon.scss';

export { ICON_NAMES, ICON_NAMES_BY_SOURCE, LEGACY_ICON_NAMES, SOURCE_ICON_NAMES };
export type { IconName };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number | string;
}

export function Icon({ name, size = '1em', className, ...props }: IconProps) {
  const icon = getIconDefinition(name);

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="currentColor"
      aria-hidden="true"
      className={cn('ui-icon', className)}
      {...props}
    >
      {icon.paths.map((path, index) => (
        <path key={`${name}-${index}`} {...path} />
      ))}
    </svg>
  );
}
