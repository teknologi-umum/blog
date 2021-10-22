import { useEffect, useState } from 'react';
import ChevronUpIcon from '#components/Icons/ChevronUpIcon';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleButton = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('load', toggleButton);
    window.addEventListener('scroll', toggleButton);

    return () => {
      window.removeEventListener('load', toggleButton);
      window.removeEventListener('scroll', toggleButton);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-10 right-9 w-8 h-8 flex items-center justify-center bg-black rounded cursor-pointer ${
        !show && 'hidden'
      }`}
      onClick={scrollToTop}
    >
      <ChevronUpIcon />
    </div>
  );
}
