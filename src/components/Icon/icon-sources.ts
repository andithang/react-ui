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

const antdIconSource = antdParsedIcons as Partial<Record<string, RawIconDefinition>>;
const bootstrapIconSource = bootstrapParsedIcons as Partial<Record<string, RawIconDefinition>>;
const faIconSource = faParsedIcons as Partial<Record<string, RawIconDefinition>>;
const matIconSource = matParsedIcons as Partial<Record<string, RawIconDefinition>>;
const vtIconSource = vtParsedIcons as Partial<Record<string, RawIconDefinition>>;

const rawParsedIconSources = {
  ...antdIconSource,
  ...bootstrapIconSource,
  ...faIconSource,
  ...matIconSource,
  ...vtIconSource
} as Partial<Record<string, RawIconDefinition>>;

const normalizedIconCache = new Map<string, IconDefinition>();
const resolvedIconCache = new Map<string, IconDefinition>();

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

function sortIconNames(names: string[]): string[] {
  return [...names].sort((a, b) => a.localeCompare(b));
}

const antdIconNames = sortIconNames(Object.keys(antdIconSource));
const bootstrapIconNames = sortIconNames(Object.keys(bootstrapIconSource));
const faIconNames = sortIconNames(Object.keys(faIconSource));
const matIconNames = sortIconNames(Object.keys(matIconSource));
const vtIconNames = sortIconNames(Object.keys(vtIconSource));

export const ICON_NAMES_BY_SOURCE = {
  antd: antdIconNames,
  bootstrap: bootstrapIconNames,
  fontAwesome: faIconNames,
  material: matIconNames,
  vt: vtIconNames
} as const;

export type IconSourceName = keyof typeof ICON_NAMES_BY_SOURCE;
export const SOURCE_ICON_NAMES = [
  ...ICON_NAMES_BY_SOURCE.antd,
  ...ICON_NAMES_BY_SOURCE.bootstrap,
  ...ICON_NAMES_BY_SOURCE.fontAwesome,
  ...ICON_NAMES_BY_SOURCE.material,
  ...ICON_NAMES_BY_SOURCE.vt
];

export const LEGACY_ICON_NAMES = [
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

export type LegacyIconName = (typeof LEGACY_ICON_NAMES)[number];
const LEGACY_ICON_NAME_SET = new Set<string>(LEGACY_ICON_NAMES as readonly string[]);

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

const FALLBACK_ICON =
  resolveCandidate('questionCircleOutline') ??
  resolveCandidate('questionOutline') ??
  resolveCandidate('infoCircleOutline') ??
  resolveCandidate('infoOutline') ??
  { viewBox: '0 0 1024 1024', paths: [] };

function resolveLegacyIconSource(name: LegacyIconName): IconDefinition {
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

  return FALLBACK_ICON;
}

export type IconName = string;
export const ICON_NAMES = [...SOURCE_ICON_NAMES] as IconName[];

export function getIconDefinition(name: IconName): IconDefinition {
  const cachedIcon = resolvedIconCache.get(name);
  if (cachedIcon) {
    return cachedIcon;
  }

  let resolvedIcon = getParsedIconSource(name);

  if (!resolvedIcon && LEGACY_ICON_NAME_SET.has(name)) {
    resolvedIcon = resolveLegacyIconSource(name as LegacyIconName);
  }

  const finalIcon = resolvedIcon ?? FALLBACK_ICON;
  resolvedIconCache.set(name, finalIcon);
  return finalIcon;
}

export const icons = LEGACY_ICON_NAMES.reduce<Record<LegacyIconName, IconDefinition>>((result, name) => {
  result[name] = resolveLegacyIconSource(name);
  return result;
}, {} as Record<LegacyIconName, IconDefinition>);
