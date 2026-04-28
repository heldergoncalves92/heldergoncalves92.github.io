import { useEffect, useState } from 'react';

type Theme = 'auto' | 'light' | 'dark';

const STORAGE_KEY = 'theme';

function readStoredTheme(): Theme {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {
    // localStorage may be disabled (private mode, etc.); fall through to auto.
  }
  return 'auto';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'auto') {
    root.removeAttribute('data-theme');
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  } else {
    root.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }
}

const NEXT: Record<Theme, Theme> = {
  auto: 'light',
  light: 'dark',
  dark: 'auto',
};

export function ThemeToggle() {
  // Don't read storage during SSR or first render: do it in an effect after
  // mount so the initial markup matches what was pre-rendered (no hydration
  // mismatch). The inline anti-FOIT script in <head> handles the actual
  // visual state before paint; this component just keeps the icon in sync.
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('auto');

  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
  }, []);

  function cycle() {
    const next = NEXT[theme];
    setTheme(next);
    applyTheme(next);
  }

  const label = mounted
    ? `Theme: ${theme}. Click to switch (auto → light → dark).`
    : 'Theme';

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={mounted ? cycle : undefined}
      disabled={!mounted}
    >
      <ThemeIcon theme={mounted ? theme : 'auto'} />
    </button>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === 'light') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  // auto — half sun / half moon, signals "follow system"
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" stroke="none" />
    </svg>
  );
}
