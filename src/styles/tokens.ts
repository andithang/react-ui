export const spaceTokenMap = {
  none: '0',
  xs: 'var(--ui-space-xs)',
  sm: 'var(--ui-space-sm)',
  md: 'var(--ui-space-md)',
  lg: 'var(--ui-space-lg)',
  xl: 'var(--ui-space-xl)',
  '2xl': 'var(--ui-space-2xl)'
} as const;

export type SpaceScale = keyof typeof spaceTokenMap;
