import { useEffect, useState } from 'react';

/**
 * for 3rd party components whose theme can only be supplied with props (i.e. React Giscus),
 * rerender must take place after setting 'dark' to <html>. Hence this custom hook
 */

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.querySelector('html') as HTMLHtmlElement;

    // for initial load
    setIsDarkMode(root.classList.contains('dark'));

    const options = {
      attributes: true,
    };

    const observer = new MutationObserver(callback);

    function callback(mutationList) {
      mutationList.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDarkMode(root.classList.contains('dark'));
        }
      });
    }

    observer.observe(root, options);

    return () => observer.disconnect();
  });

  return isDarkMode;
};
