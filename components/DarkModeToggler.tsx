import { cloneElement, useState } from 'react';

import { usePersistedDarkMode } from '~/hooks/use-dark-mode';
import { useOnClickOutside } from '~/hooks/use-on-click-outside';
import { SunIcon, CrescentMoonIcon, HalfMoonIcon } from '~/icons';

const themeIcon = {
  'os-default': <HalfMoonIcon />,
  light: <SunIcon />,
  dark: <CrescentMoonIcon />,
};

export function DarkModeToggler() {
  const { setAndPersistPreference, colorPreference } = usePersistedDarkMode();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function closeDropdown() {
    setIsDropdownOpen(false);
  }

  const clickOutsideRef = useOnClickOutside(closeDropdown);

  return (
    <div className="relative" ref={clickOutsideRef}>
      <label>
        <input
          hidden
          type="checkbox"
          className="peer"
          checked={isDropdownOpen}
          onChange={(e) => setIsDropdownOpen(e.currentTarget.checked)}
        />
        <span className="bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-2xl cursor-pointer flex items-center">
          {cloneElement(themeIcon[colorPreference ?? 'os-default'], { width: '1.25rem', height: '1.25rem' })}
          <span className="ml-2">Theme</span>
        </span>

        <div
          className="w-48 absolute top-5 z-10
                  after:inline-block after:absolute after:top-0 after:w-full after:h-full after:-z-20
                  peer-checked:top-12 peer-checked:opacity-100 peer-checked:visible 
                  transition-all duration-300 invisible opacity-0 
                  "
        >
          <ul className="text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 p-2 rounded-xl">
            <li>
              <button
                onClick={() => {
                  setAndPersistPreference('os-default');
                  closeDropdown();
                }}
                className="cursor-pointer w-full rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-900 flex items-center px-2 mb-2"
              >
                {cloneElement(themeIcon['os-default'], { width: '1rem', height: '1rem' })}
                <span className="ml-4">OS Default</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setAndPersistPreference('light');
                  closeDropdown();
                }}
                className="cursor-pointer w-full rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-900 flex items-center px-2 mb-2"
              >
                {cloneElement(themeIcon['light'], { width: '1rem', height: '1rem' })}
                <span className="ml-4">Light</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setAndPersistPreference('dark');
                  closeDropdown();
                }}
                className="cursor-pointer w-full rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-900 flex items-center px-2"
              >
                {cloneElement(themeIcon['dark'], { width: '1rem', height: '1rem' })}
                <span className="ml-4">Dark</span>
              </button>
            </li>
          </ul>
        </div>
      </label>
    </div>
  );
}
