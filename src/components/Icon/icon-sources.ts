import type { SVGProps } from 'react';
import antdParsedIcons from './antd_icons_parsed.json';
import bootstrapParsedIcons from './bootstrap_icons_parsed.json';
import faParsedIcons from './fa_icons_parsed.json';
import matParsedIcons from './mat_icons_parsed.json';
import vtParsedIcons from './vt_icons_parsed.json';

type IconPath = Partial<SVGProps<SVGPathElement>> & { d: string };

type RawIconPath = Record<string, unknown>;

interface RawIconDefinition {
  viewBox?: string;
  paths?: readonly RawIconPath[];
  [key: string]: unknown;
}

export interface IconDefinition {
  viewBox: string;
  paths: readonly IconPath[];
}

const rawParsedIconSources = {
  ...antdParsedIcons,
  ...bootstrapParsedIcons,
  ...faParsedIcons,
  ...matParsedIcons,
  ...vtParsedIcons
} as Partial<Record<string, RawIconDefinition>>;

const normalizedIconCache = new Map<string, IconDefinition>();

const SOURCE_PREFIXES = ['bt_', 'fa_', 'mat_', 'vt_'] as const;
const SOURCE_STYLE_SUFFIXES = [
  '',
  'outline',
  'doutone',
  'fill',
  'filled',
  'solid',
  'regular',
  'round',
  'sharp',
  'twotone',
  'branch'
] as const;
const SOURCE_STRIPPABLE_SUFFIXES = SOURCE_STYLE_SUFFIXES.filter((suffix) => suffix !== '');
const candidateKeyCache = new Map<string, string[]>();

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

function toCamelCaseKey(key: string): string {
  return key.replace(/-([a-z0-9])/g, (_, chr: string) => chr.toUpperCase());
}

function normalizePath(path: RawIconPath): IconPath {
  const normalizedPath: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(path)) {
    normalizedPath[toCamelCaseKey(key)] = value;
  }

  if (typeof normalizedPath.d !== 'string') {
    normalizedPath.d = '';
  }

  return normalizedPath as IconPath;
}

function normalizeIconDefinition(rawIcon: RawIconDefinition): IconDefinition {
  return {
    viewBox: typeof rawIcon.viewBox === 'string' ? rawIcon.viewBox : '0 0 1024 1024',
    paths: Array.isArray(rawIcon.paths) ? rawIcon.paths.map((path) => normalizePath(path)) : []
  };
}

function getParsedIconSource(key: string): IconDefinition | undefined {
  const cachedIcon = normalizedIconCache.get(key);
  if (cachedIcon) {
    return cachedIcon;
  }

  const rawIcon = rawParsedIconSources[key];
  if (!rawIcon) {
    return undefined;
  }

  const normalizedIcon = normalizeIconDefinition(rawIcon);
  normalizedIconCache.set(key, normalizedIcon);
  return normalizedIcon;
}

function toLowerAlnum(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function stripKnownSuffixes(value: string): string {
  let current = value;
  let wasStripped = true;

  while (wasStripped) {
    wasStripped = false;
    for (const suffix of SOURCE_STRIPPABLE_SUFFIXES) {
      if (current.endsWith(suffix) && current.length > suffix.length) {
        current = current.slice(0, -suffix.length);
        wasStripped = true;
        break;
      }
    }
  }

  return current;
}

function buildCandidateKeys(candidate: string): string[] {
  const cachedKeys = candidateKeyCache.get(candidate);
  if (cachedKeys) {
    return cachedKeys;
  }

  const keys: string[] = [candidate];
  const prefixedBases = new Set<string>();
  const normalizedCandidate = toLowerAlnum(candidate);

  if (normalizedCandidate) {
    prefixedBases.add(normalizedCandidate);
    prefixedBases.add(stripKnownSuffixes(normalizedCandidate));
  }

  for (const base of prefixedBases) {
    if (!base) {
      continue;
    }

    for (const prefix of SOURCE_PREFIXES) {
      for (const suffix of SOURCE_STYLE_SUFFIXES) {
        keys.push(`${prefix}${base}${suffix}`);
      }
    }
  }

  const dedupedKeys = [...new Set(keys)];
  candidateKeyCache.set(candidate, dedupedKeys);
  return dedupedKeys;
}

function resolveCandidate(candidate: string): IconDefinition | undefined {
  for (const key of buildCandidateKeys(candidate)) {
    const icon = getParsedIconSource(key);
    if (icon) {
      return icon;
    }
  }

  return undefined;
}

function resolveIconSource(name: LegacyIconName): IconDefinition {
  const candidates: string[] = [];
  const explicit = EXPLICIT_ICON_ALIAS[name];

  if (explicit) {
    candidates.push(explicit);
  }
  candidates.push(`${name}Outline`, `${name}CircleOutline`, `${name}Circle`, name);

  for (const candidate of candidates) {
    const icon = resolveCandidate(candidate);
    if (icon) {
      return icon;
    }
  }

  return (
    resolveCandidate('questionCircleOutline') ??
    resolveCandidate('questionOutline') ??
    resolveCandidate('infoCircleOutline') ??
    resolveCandidate('infoOutline') ??
    { viewBox: '0 0 1024 1024', paths: [] }
  );
}

export type IconName = LegacyIconName;
export const ICON_NAMES = [...LEGACY_ICON_NAMES] as IconName[];

export const icons = LEGACY_ICON_NAMES.reduce<Record<IconName, IconDefinition>>((result, name) => {
  result[name] = resolveIconSource(name);
  return result;
}, {} as Record<IconName, IconDefinition>);
