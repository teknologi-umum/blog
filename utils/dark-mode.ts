const localStorageKey = 'teknologi-umum-blog-theme';

export type ColorMode = 'os-default' | 'light' | 'dark';

export const getColorMode = (): ColorMode | null => {
  if (typeof window === 'undefined') return null;

  switch (localStorage[localStorageKey]) {
    case 'dark':
      return 'dark';
    case 'light':
      return 'light';
    default:
      return 'os-default';
  }
};

export const loadColorMode = () => {
  if (
    localStorage[localStorageKey] === 'dark' ||
    (!(localStorageKey in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const enableDarkMode = () => {
  localStorage[localStorageKey] = 'dark';
  loadColorMode();
};

export const enableLightMode = () => {
  localStorage[localStorageKey] = 'light';
  loadColorMode();
};

export const enableOSDefaultMode = () => {
  localStorage.removeItem(localStorageKey);
  loadColorMode();
};
