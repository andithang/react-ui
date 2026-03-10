import { SwitchProps } from '../Switch/Switch';
export interface ThemeSwitchProps extends Omit<SwitchProps, 'checked' | 'defaultChecked' | 'onChange' | 'type'> {
    label?: string;
}
export declare function ThemeSwitch({ label, ...props }: ThemeSwitchProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ThemeSwitch.d.ts.map