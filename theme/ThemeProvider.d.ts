import { PropsWithChildren } from '../../node_modules/react';
import { ThemeMode } from './theme-context';
export interface ThemeProviderProps extends PropsWithChildren {
    defaultTheme?: ThemeMode;
    storageKey?: string;
}
export declare function ThemeProvider({ children, defaultTheme, storageKey }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ThemeProvider.d.ts.map