import { useState, useEffect } from 'react';

const useVideoSource = (desktopVideo, mobileVideo, breakpoint = 768) => {
  const [videoSrc, setVideoSrc] = useState(
    typeof window !== 'undefined' && window.innerWidth <= breakpoint 
      ? mobileVideo 
      : desktopVideo
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= breakpoint) {
        setVideoSrc(mobileVideo);
      } else {
        setVideoSrc(desktopVideo);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [desktopVideo, mobileVideo, breakpoint]);

  return videoSrc;
};

export default useVideoSource;