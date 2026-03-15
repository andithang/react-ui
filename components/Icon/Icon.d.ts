import { SVGProps } from '../../../node_modules/react';
import { ICON_NAMES, ICON_NAMES_BY_SOURCE, LEGACY_ICON_NAMES, SOURCE_ICON_NAMES, IconName } from './icon-sources';
export { ICON_NAMES, ICON_NAMES_BY_SOURCE, LEGACY_ICON_NAMES, SOURCE_ICON_NAMES };
export type { IconName };
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
    name: IconName;
    size?: number | string;
}
export declare function Icon({ name, size, className, ...props }: IconProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Icon.d.ts.map