import React, { useEffect, useState } from 'react';

export const ScrollProgressThread: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          setScrollProgress(Math.min(100, Math.max(0, progress)));
          setVisible(scrollTop > 100 && progress < 98);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed right-6 top-[10vh] h-[80vh] w-[1.5px] bg-[#EDE8DF] z-40 hidden md:block transition-opacity duration-500 pointer-events-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <div
        className="w-full bg-[#A8854A] transition-all duration-150 ease-out"
        style={{ height: `${scrollProgress}%` }}
      />
    </div>
  );
};
