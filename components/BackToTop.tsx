import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const showButton = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', showButton);

    return () => {
      window.removeEventListener('scroll', showButton);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-10 right-9 w-9 h-9 flex items-center justify-center bg-black rounded cursor-pointer ${
        !show && 'hidden'
      }`}
      onClick={scrollToTop}
    >
      <span className="text-white text-sm uppercase">Top</span>
    </div>
  );
}
