import React, { useState, useEffect, useRef } from 'react';
import './HeroSlider.css';
import TacoButton from './TacoButton';

const ORDER_LINK = 'https://tacopros.toast.site/';

const HeroSlider = ({ images, video }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef(null);

  const isSlider = images && images.length > 1;
  const showVideo = !images && video;

  useEffect(() => {
    if (!isSlider) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [isSlider, images?.length]);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;

    const video = videoRef.current;
    setIsVideoReady(false);
    setIsMuted(true);

    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playHeroVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const resume = () => {
            video.play().catch(() => {});
            document.removeEventListener("touchstart", resume);
            document.removeEventListener("click", resume);
          };
          document.addEventListener("touchstart", resume, { once: true });
          document.addEventListener("click", resume, { once: true });
        });
      }
    };

    playHeroVideo();
    video.addEventListener('loadedmetadata', playHeroVideo, { once: true });
    video.addEventListener('loadeddata', handleVideoPlaying, { once: true });
    video.addEventListener("canplay", tryPlay);

    return () => {
      video.removeEventListener('loadedmetadata', playHeroVideo);
      video.removeEventListener('loadeddata', handleVideoPlaying);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [showVideo, video]);

  const handleVideoPlaying = () => {
    setIsVideoReady(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="cfx-hero-container">
      {/* Video Logic */}
      {showVideo ? (
        <div className="cfx-video-wrapper">
          <video
            ref={videoRef}
            key={video}
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            src={video}
            onLoadedMetadata={(event) => {
              event.currentTarget.muted = true;
              event.currentTarget.defaultMuted = true;
              event.currentTarget.setAttribute('muted', '');
              event.currentTarget.play().catch(() => {});
            }}
            onLoadedData={handleVideoPlaying}
            onPlaying={handleVideoPlaying}
            className={`hero-video cfx-hero-video ${isVideoReady ? 'is-ready' : ''}`}
          />

          {/* Mute Toggle Button */}
          <button
            className={`cfx-mute-toggle ${isMuted ? 'is-muted' : 'is-active'}`}
            onClick={toggleMute}
            aria-label="Toggle Mute"
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" stroke="#e4531e">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="#e4531e" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" stroke="#e4531e">
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#e4531e" />
              </svg>
            )}
          </button>
        </div>
      ) : (
        <div
          className="cfx-slide-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images && images.map((img, index) => (
            <div className="cfx-slide-frame" key={index}>
              <img src={img} alt={`Slide ${index}`} className="cfx-hero-media" />
            </div>
          ))}
        </div>
      )}

      {/* Hero Overlay Content */}
      <div className="cfx-hero-overlay">
        <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
          {/* <button className="cfx-hero-button">ORDER NOW</button> */}

          <TacoButton text="ORDER NOW"
            width="clamp(155px, 22vw, 302px)"
            height="clamp(51px, 5vw, 57px)" 
             styleType = "1"
             fontSize="clamp(18px, 2vw, 24px)" 
            />

            

        </a>
      </div>

      {isSlider && (
        <div className="cfx-slide-dots">
          {images.map((_, index) => (
            <div
              key={index}
              className={`cfx-slide-dot ${index === currentIndex ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
