import type { SVGProps } from 'react';
import parsedIcons from './antd_icons_parsed.json';

type IconPath = Pick<SVGProps<SVGPathElement>, 'd' | 'fillRule' | 'clipRule'>;

export interface IconDefinition {
  viewBox: string;
  paths: readonly IconPath[];
}

const parsedIconSources = parsedIcons as Partial<Record<string, IconDefinition>>;

const LEGACY_ICON_NAMES = [
  'alert',
  'arrowDown',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'bell',
  'calendar',
  'check',
  'checkCircle',
  'chevronDown',
  'chevronLeft',
  'chevronRight',
  'chevronUp',
  'clock',
  'close',
  'closeCircle',
  'copy',
  'dotsHorizontal',
  'dotsVertical',
  'download',
  'edit',
  'externalLink',
  'eye',
  'eyeOff',
  'file',
  'filter',
  'folder',
  'heart',
  'home',
  'info',
  'link',
  'location',
  'lock',
  'mail',
  'menu',
  'minus',
  'moon',
  'pause',
  'phone',
  'play',
  'plus',
  'question',
  'refresh',
  'search',
  'settings',
  'star',
  'stop',
  'sun',
  'tag',
  'trash',
  'unlock',
  'upload',
  'user',
  'users',
  'warningCircle'
] as const;

type LegacyIconName = (typeof LEGACY_ICON_NAMES)[number];

const EXPLICIT_ICON_ALIAS: Partial<Record<LegacyIconName, string>> = {
  chevronDown: 'caretDownOutline',
  chevronLeft: 'caretLeftOutline',
  chevronRight: 'caretRightOutline',
  chevronUp: 'caretUpOutline',
  clock: 'clockCircleOutline',
  dotsHorizontal: 'ellipsisOutline',
  dotsVertical: 'moreOutline',
  externalLink: 'exportOutline',
  eyeOff: 'eyeInvisibleOutline',
  location: 'environmentOutline',
  moon: 'bulbOutline',
  play: 'playCircleOutline',
  refresh: 'reloadOutline',
  settings: 'settingOutline',
  sun: 'highlightOutline',
  trash: 'deleteOutline',
  users: 'teamOutline',
  warningCircle: 'warningOutline'
};

function resolveIconSource(name: LegacyIconName): IconDefinition {
  const candidates: string[] = [];
  const explicit = EXPLICIT_ICON_ALIAS[name];

  if (explicit) {
    candidates.push(explicit);
  }
  candidates.push(`${name}Outline`, `${name}CircleOutline`, `${name}Circle`, name);

  for (const candidate of candidates) {
    const icon = parsedIconSources[candidate];
    if (icon) {
      return icon;
    }
  }

  return (
    parsedIconSources.questionCircleOutline ??
    parsedIconSources.questionOutline ??
    parsedIconSources.infoCircleOutline ??
    parsedIconSources.infoOutline ??
    { viewBox: '0 0 1024 1024', paths: [] }
  );
}

export type IconName = LegacyIconName;
export const ICON_NAMES = [...LEGACY_ICON_NAMES] as IconName[];

export const icons = LEGACY_ICON_NAMES.reduce<Record<IconName, IconDefinition>>((result, name) => {
  result[name] = resolveIconSource(name);
  return result;
}, {} as Record<IconName, IconDefinition>);
