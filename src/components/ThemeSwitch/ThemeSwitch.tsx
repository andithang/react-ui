import { Switch } from '../Switch/Switch';
import { useThemeContext } from '../../theme';
import type { SwitchProps } from '../Switch/Switch';

export interface ThemeSwitchProps extends Omit<SwitchProps, 'checked' | 'defaultChecked' | 'onChange' | 'type'> {
  label?: string;
}

export function ThemeSwitch({ label = 'Dark mode', ...props }: ThemeSwitchProps) {
  const { theme, toggleTheme } = useThemeContext();

  return <Switch checked={theme === 'dark'} onChange={toggleTheme} label={label} {...props} />;
}
