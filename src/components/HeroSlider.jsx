import React, { useState, useEffect, useMemo, useRef } from 'react';
import './HeroSlider.css';
import TacoButton from './TacoButton';

const ORDER_LINK = 'https://tacopros.toast.site/';

const getVideoType = (src = '') => {
  if (src.toLowerCase().endsWith('.webm')) return 'video/webm';
  return 'video/mp4';
};

const normalizeVideoSources = (video) => {
  if (!video) {
    return { key: '', sources: [] };
  }

  if (typeof video === 'string') {
    return {
      key: video,
      sources: [{ src: video, type: getVideoType(video) }],
    };
  }

  const sources = [
    video.mp4 && { src: video.mp4, type: 'video/mp4' },
    video.webm && { src: video.webm, type: 'video/webm' },
  ].filter(Boolean);

  return {
    key: [video.mp4, video.webm].filter(Boolean).join('|'),
    sources,
  };
};

const HeroSlider = ({ images, video }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const videoConfig = useMemo(() => normalizeVideoSources(video), [video]);

  const isSlider = images && images.length > 1;
  const showVideo = !images && videoConfig.sources.length > 0;

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

    const heroVideo = videoRef.current;

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.autoplay = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('autoplay', '');
    heroVideo.setAttribute('loop', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    let cancelled = false;
    const playHeroVideo = () => {
      if (cancelled) return;
      const playPromise = heroVideo.play();
      if (playPromise) {
        playPromise.catch(() => {
          // iOS may still block autoplay in Low Power Mode or strict user settings.
        });
      }
    };

    if (heroVideo.readyState >= 2) {
      playHeroVideo();
    } else {
      heroVideo.addEventListener('canplay', playHeroVideo, { once: true });
    }

    setIsMuted(true);

    return () => {
      cancelled = true;
      heroVideo.removeEventListener('canplay', playHeroVideo);
    };
  }, [showVideo, videoConfig.key]);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      videoRef.current.defaultMuted = nextMuted;
      setIsMuted(nextMuted);

      if (!videoRef.current.paused) return;
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
            key={videoConfig.key}
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            preload="metadata"
            className="cfx-hero-video"
          >
            {videoConfig.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>

          {/* Mute Toggle Button */}
          <button
            className={`cfx-mute-toggle ${isMuted ? 'is-muted' : 'is-active'}`}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
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
