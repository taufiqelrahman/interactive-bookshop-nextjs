import detectIt from 'detect-it';
import { useEffect, useState } from 'react';

export const useStickyPreview = () => {
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setSticky(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, detectIt.passiveEvents ? { passive: true } : false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStickyClassName = () => (isSticky ? 'c-char-custom__char--sticky' : '');

  return { isSticky, getStickyClassName };
};
