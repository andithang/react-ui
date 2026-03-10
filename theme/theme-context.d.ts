export type ThemeMode = 'light' | 'dark';
export interface ThemeContextValue {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
}
export declare const ThemeContext: import('../../node_modules/react').Context<ThemeContextValue | undefined>;
export declare function useThemeContext(): ThemeContextValue;
//# sourceMappingURL=theme-context.d.ts.map