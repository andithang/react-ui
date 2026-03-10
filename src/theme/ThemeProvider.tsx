import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ThemeContext, ThemeMode } from './theme-context';

export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

function readStoredTheme(storageKey: string): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(storageKey);
  return value === 'light' || value === 'dark' ? value : null;
}

function readSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'react-ui-theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return readStoredTheme(storageKey) ?? defaultTheme ?? readSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(storageKey, theme);
  }, [storageKey, theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => (previous === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme
    }),
    [setTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
