import { useEffect, useState } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device is mobile based on window width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile devices
    };

    // Initial check
    checkIsMobile();

    // Add event listener to handle window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return { isMobile };
};
