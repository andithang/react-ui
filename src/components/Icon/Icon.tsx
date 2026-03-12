import type { SVGProps } from 'react';
import { cn } from '../../utils';
import './Icon.scss';

type IconPath = Pick<SVGProps<SVGPathElement>, 'd' | 'fillRule' | 'clipRule'>;

interface IconDefinition {
  viewBox: string;
  paths: readonly IconPath[];
}

const icons = {
  alert: {
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M12 3 2 20.5h20L12 3Zm1.1 13.8h-2.2v-2.2h2.2v2.2Zm0-3.9h-2.2V8.7h2.2V13Z' }
    ]
  },
  arrowDown: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M5 13 6.6 11.4 11 15.8V4h2v11.8l4.4-4.4L19 13l-7 7-7-7Z' }]
  },
  arrowLeft: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm11 5 1.6 1.6-4.4 4.4H20v2H8.2l4.4 4.4L11 19l-7-7 7-7Z' }]
  },
  arrowRight: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm13 5 7 7-7 7-1.6-1.6 4.4-4.4H4v-2h11.8l-4.4-4.4L13 5Z' }]
  },
  arrowUp: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm12 4 7 7-1.6 1.6-4.4-4.4V20h-2V8.2l-4.4 4.4L5 11l7-7Z' }]
  },
  bell: {
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M12 3a5 5 0 0 0-5 5v2.6L5 14v1h14v-1l-2-3.4V8a5 5 0 0 0-5-5Zm0 18a3 3 0 0 1-2.8-2h5.6A3 3 0 0 1 12 21Z' }
    ]
  },
  calendar: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M7 2h2v2h6V2h2v2h3v17H4V4h3V2Zm11 8H6v9h12v-9Zm0-4H6v2h12V6Z' }]
  },
  check: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm9.8 16.9-5.3-5.3 1.6-1.6 3.7 3.7 8-8 1.6 1.6-9.6 9.6Z' }]
  },
  checkCircle: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5A9.5 9.5 0 1 0 12 21.5 9.5 9.5 0 0 0 12 2.5Zm-1 13.6-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4-6.3 6.3Z' }]
  },
  chevronDown: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm6 9 6 6 6-6-1.6-1.6L12 11.8 7.6 7.4 6 9Z' }]
  },
  chevronLeft: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm14.4 6 1.6 1.6-4.4 4.4 4.4 4.4-1.6 1.6-6-6 6-6Z' }]
  },
  chevronRight: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm9.4 6-1.6 1.6 4.4 4.4-4.4 4.4 1.6 1.6 6-6-6-6Z' }]
  },
  chevronUp: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm6 15 1.6 1.6 4.4-4.4 4.4 4.4L18 15l-6-6-6 6Z' }]
  },
  clock: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5A9.5 9.5 0 1 0 12 21.5 9.5 9.5 0 0 0 12 2.5Zm1 5.5h-2v5.2l4.5 2.7 1-1.7-3.5-2.1V8Z' }]
  },
  close: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M6.2 4.6 12 10.4l5.8-5.8 1.6 1.6L13.6 12l5.8 5.8-1.6 1.6L12 13.6l-5.8 5.8-1.6-1.6L10.4 12 4.6 6.2l1.6-1.6Z' }]
  },
  closeCircle: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5A9.5 9.5 0 1 0 12 21.5 9.5 9.5 0 0 0 12 2.5Zm3.6 5.9L13.5 10.5l2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1-2.1-2.1 1.4-1.4 2.1 2.1 2.1-2.1 1.4 1.4Z' }]
  },
  copy: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M9 3h10a2 2 0 0 1 2 2v11h-2V5H9V3Zm-4 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm0 2v12h10V9H5Z' }]
  },
  dotsHorizontal: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M3 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' }]
  },
  dotsVertical: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M6.5 3a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z' }]
  },
  download: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M11 3h2v10.2l3.6-3.6 1.4 1.4-6 6-6-6 1.4-1.4 3.6 3.6V3Zm-7 16h16v2H4v-2Z' }]
  },
  edit: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M16.7 3.3a1.8 1.8 0 0 1 2.5 2.5l-9.7 9.7-3.8.9.9-3.8 9.3-9.3Zm-10 10.8-.4 1.7 1.7-.4 9.3-9.3-1.3-1.3-9.3 9.3ZM4 20h16v2H4v-2Z' }]
  },
  externalLink: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M14 4h6v6h-2V7.4l-7.3 7.3-1.4-1.4L16.6 6H14V4ZM5 6h6v2H7v9h9v-4h2v6H5V6Z' }]
  },
  eye: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 5C7 5 3 8.1 1.5 12 3 15.9 7 19 12 19s9-3.1 10.5-7C21 8.1 17 5 12 5Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z' }]
  },
  eyeOff: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M3.3 2 2 3.3l4.2 4.2A11.7 11.7 0 0 0 1.5 12C3 15.9 7 19 12 19c1.9 0 3.7-.5 5.2-1.3l3.5 3.5L22 20l-18-18Zm8.7 14a4 4 0 0 1-3.9-3.3l5.2 5.2c-.4.1-.9.1-1.3.1Zm0-11c-1.8 0-3.5.4-5 1.2l2.2 2.2a4 4 0 0 1 5.6 5.6l2.7 2.7a10 10 0 0 0 5-4.7C21 8.1 17 5 12 5Z' }]
  },
  file: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 2H6v16h12V9h-5V4Zm2.6 2L18 8.4h-2.4V6Z' }]
  },
  filter: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M3 5h18l-7 8v6l-4-2v-4L3 5Z' }]
  },
  folder: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M3 6h7l2 2h9v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm2 2v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10h-8l-2-2H5Z' }]
  },
  heart: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 20.5 3.7 12.9a5.3 5.3 0 1 1 7.5-7.5L12 6.2l.8-.8a5.3 5.3 0 1 1 7.5 7.5L12 20.5Z' }]
  },
  home: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 3 2 11h3v10h5v-6h4v6h5V11h3L12 3Z' }]
  },
  info: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5A9.5 9.5 0 1 0 12 21.5 9.5 9.5 0 0 0 12 2.5Zm1.2 14h-2.4v-6h2.4v6Zm0-8h-2.4V6h2.4v2.5Z' }]
  },
  link: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M8.8 15.2a3 3 0 0 1 0-4.2l2.1-2.1 1.4 1.4-2.1 2.1a1 1 0 1 0 1.4 1.4l2.1-2.1 1.4 1.4-2.1 2.1a3 3 0 0 1-4.2 0Zm6.4-6.4a1 1 0 0 0-1.4 0l-2.1 2.1-1.4-1.4 2.1-2.1a3 3 0 1 1 4.2 4.2l-2.1 2.1-1.4-1.4 2.1-2.1a1 1 0 0 0 0-1.4Z' }]
  },
  location: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5a7 7 0 0 0-7 7c0 5.2 7 12 7 12s7-6.8 7-12a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z' }]
  },
  lock: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M7 10V8a5 5 0 0 1 10 0v2h2v11H5V10h2Zm2 0h6V8a3 3 0 0 0-6 0v2Zm3 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' }]
  },
  mail: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M3 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 9 5 9-5H3Zm18 8V10l-9 5-9-5v6h18Z' }]
  },
  menu: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M1 3h14v2H1V3Zm0 4h14v2H1V7Zm0 4h14v2H1v-2Z' }]
  },
  minus: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M2 7h12v2H2V7Z' }]
  },
  moon: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M15.5 3.5a8.5 8.5 0 1 0 5 15.5 9 9 0 1 1-5-15.5Z' }]
  },
  pause: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M3 2h4v12H3V2Zm6 0h4v12H9V2Z' }]
  },
  phone: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M7.6 2.8 11 2l1.2 4.2-2.1 1.2a14.6 14.6 0 0 0 6.5 6.5l1.2-2.1L22 13l-.8 3.4a2.4 2.4 0 0 1-2.9 1.8A18.5 18.5 0 0 1 5.8 5.7 2.4 2.4 0 0 1 7.6 2.8Z' }]
  },
  play: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M4 2v12l10-6L4 2Z' }]
  },
  plus: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M7 2h2v5h5v2H9v5H7V9H2V7h5V2Z' }]
  },
  question: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5A9.5 9.5 0 1 0 12 21.5 9.5 9.5 0 0 0 12 2.5Zm0 15a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm1.5-5.6-.9.5c-.8.4-1.1.8-1.1 1.6v.4h-2v-.5c0-1.6.7-2.7 2.1-3.4l1-.5c.9-.5 1.4-1 1.4-1.8 0-.9-.7-1.6-2-1.6-1.2 0-2 .6-2.2 1.8H7.6c.2-2.4 2-3.7 4.4-3.7 2.8 0 4.3 1.4 4.3 3.5 0 1.6-.9 2.6-2.8 3.5Z' }]
  },
  refresh: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 4a8 8 0 1 0 7.8 9.8h-2.1A6 6 0 1 1 12 6c1.5 0 2.8.5 3.9 1.4L13 10h7V3l-2.6 2.6A8 8 0 0 0 12 4Z' }]
  },
  search: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M11.5 3a8.5 8.5 0 1 0 5.38 15.08l3.52 3.52 1.6-1.6-3.53-3.52A8.5 8.5 0 0 0 11.5 3Zm0 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5Z' }]
  },
  settings: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M19.4 13a7.6 7.6 0 0 0 .1-2l2-1.5-2-3.5-2.4 1a7.7 7.7 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6c-.6.2-1.2.6-1.7 1l-2.4-1-2 3.5 2 1.5a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.5 2.4-1c.5.4 1.1.8 1.7 1l.4 2.6h4l.4-2.6c.6-.2 1.2-.6 1.7-1l2.4 1 2-3.5-2-1.5ZM12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Z' }]
  },
  star: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5 14.9 8.4 21.5 9.3 16.8 13.9 17.9 20.5 12 17.4 6.1 20.5 7.2 13.9 2.5 9.3 9.1 8.4 12 2.5Z' }]
  },
  stop: {
    viewBox: '0 0 16 16',
    paths: [{ d: 'M3 3h10v10H3V3Z' }]
  },
  sun: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M11 1h2v3h-2V1Zm6.4 2.2 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1ZM20 11v2h-3v-2h3ZM7.1 6.7 5 4.6l1.4-1.4 2.1 2.1-1.4 1.4ZM4 11v2H1v-2h3Zm2.4 8.8-1.4-1.4 2.1-2.1 1.4 1.4-2.1 2.1ZM13 23h-2v-3h2v3Zm5.8-3.2-2.1-2.1 1.4-1.4 2.1 2.1-1.4 1.4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z' }]
  },
  tag: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M3 11V5a2 2 0 0 1 2-2h6l10 10-8 8L3 11Zm4-5a1.5 1.5 0 1 0 0 3A1.5 1.5 0 0 0 7 6Z' }]
  },
  trash: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h2v9H7V9Zm4 0h2v9h-2V9Zm4 0h2v9h-2V9Z' }]
  },
  unlock: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M17 10V8a5 5 0 0 0-9.7-1.7l1.9.6A3 3 0 0 1 15 8v2H5v11h14V10h-2Zm-5 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' }]
  },
  upload: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'm12 3 6 6-1.4 1.4-3.6-3.6V17h-2V6.8L7.4 10.4 6 9l6-6Zm-8 16h16v2H4v-2Z' }]
  },
  user: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.4 0-8 2.3-8 5.2V21h16v-1.8c0-2.9-3.6-5.2-8-5.2Z' }]
  },
  users: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6 1a3 3 0 1 0-1.7-5.5A5.5 5.5 0 0 1 15 12Zm-6 2c-3.6 0-6.5 1.8-6.5 4.2V20h10v-1.8c0-1.5.7-2.8 1.9-3.8A10.2 10.2 0 0 0 9 14Zm6 .5c2.9 0 5.5 1.3 5.5 3.7V20h-5.5v-1.8c0-1.4-.5-2.7-1.5-3.7h1.5Z' }]
  },
  warningCircle: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M12 2.5A9.5 9.5 0 1 0 12 21.5 9.5 9.5 0 0 0 12 2.5Zm1.2 14h-2.4v-2.4h2.4v2.4Zm0-4.5h-2.4V7h2.4v5Z' }]
  }
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;
export const ICON_NAMES = Object.keys(icons) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number | string;
}

export function Icon({ name, size = '1em', className, ...props }: IconProps) {
  const icon = icons[name];

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
