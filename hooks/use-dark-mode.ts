import { useState, useEffect } from 'react';

const localStorageKey = 'teknologi-umum-blog-theme';

type ColorPreference = 'os-default' | 'light' | 'dark';

const useDarkMode = (userPreference: ColorPreference | null) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * listens to changes in user preference (i.e. through darkModeToggler)
   */
  useEffect(() => {
    if (userPreference === null) return;

    const devicePrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (userPreference === 'os-default') {
      setIsDarkMode(devicePrefersDark.matches);
    } else {
      setIsDarkMode(userPreference === 'dark');
    }
  }, [userPreference]);

  /**
   * listens to changes in device preference (i.e. prefers-color-scheme:dark)
   */
  useEffect(() => {
    const devicePrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const setDevicePreference = (e) => {
      if (userPreference === 'os-default') setIsDarkMode(e.matches);
    };

    devicePrefersDark.addEventListener('change', setDevicePreference);

    return () => {
      devicePrefersDark.removeEventListener('change', setDevicePreference);
    };
  }, [userPreference]);

  /**
   * triggers actual dark mode change in DOM
   */
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
};

/**
 * for components that require a rerender after dark mode change
 */
export const useSubscribeDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    //for initial load
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    let observer = new MutationObserver(callback);

    function callback(mutationList) {
      mutationList.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    }

    observer?.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer?.disconnect();
  }, []);

  return isDarkMode;
};

export const useDarkModePreference = () => {
  const [colorPreference, setColorPreference] = useState<ColorPreference | null>(null);
  useDarkMode(colorPreference);

  useEffect(() => {
    const persistedValue = localStorage.getItem(localStorageKey);

    if (persistedValue === 'light' || persistedValue === 'dark') {
      setColorPreference(persistedValue);
    } else {
      setColorPreference('os-default');
    }
  }, []);

  const setAndPersistPreference = (preference: ColorPreference) => {
    setColorPreference(preference);

    if (preference === 'os-default') {
      localStorage.removeItem(localStorageKey);
    } else {
      localStorage.setItem(localStorageKey, preference);
    }
  };

  return { colorPreference, setAndPersistPreference };
};
