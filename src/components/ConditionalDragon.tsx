'use client';

import { useEffect, useState } from 'react';
import InteractiveDragon from './InteractiveDragon';

const ConditionalDragon = () => {
  const [showDragon, setShowDragon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show dragon only in the first 2 viewport heights (Hero + About sections)
      // This means it will appear above Hero and About sections only
      if (scrollY < windowHeight * 2) {
        setShowDragon(true);
      } else {
        setShowDragon(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return showDragon ? <InteractiveDragon /> : null;
};

export default ConditionalDragon;




