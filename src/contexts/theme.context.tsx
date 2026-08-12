'use client';

import { createContext, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function ThemeProvider({
  children,
  initialTheme = 'light',
}: {
  children: ReactNode;
  initialTheme?: Theme;
}): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  function toggleTheme(): void {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.cookie = `theme=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    document.documentElement.classList.toggle('dark', next === 'dark');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
