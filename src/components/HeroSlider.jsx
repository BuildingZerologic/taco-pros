import React, { useState, useEffect, useRef } from 'react';
import './HeroSlider.css';
import { Link } from 'react-router-dom';
import TacoButton from './TacoButton';

const HeroSlider = ({ images, video }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
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

    const heroVideo = videoRef.current;

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    const playHeroVideo = () => {
      const playPromise = heroVideo.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Safari may still block autoplay in Low Power Mode or strict user settings.
        });
      }
    };

    heroVideo.load();
    playHeroVideo();
    heroVideo.addEventListener('canplay', playHeroVideo, { once: true });

    return () => {
      heroVideo.removeEventListener('canplay', playHeroVideo);
    };
  }, [showVideo, video]);

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
            preload="auto"
            className="cfx-hero-video"
          >
            <source src={video} type="video/mp4" />
          </video>

          {/* Mute Toggle Button */}
          <button
            className={`cfx-mute-toggle ${isMuted ? 'is-muted' : 'is-active'}`}
            onClick={toggleMute}
            aria-label="Toggle Mute"
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" strokeLinejoin="round" />
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
        <Link to="/menu">
          {/* <button className="cfx-hero-button">ORDER NOW</button> */}

          <TacoButton text="ORDER NOW"
            width="clamp(155px, 22vw, 302px)"
            height="clamp(51px, 5vw, 57px)" 
             styleType = "1"
             fontSize="clamp(18px, 2vw, 24px)" 
            />

            

        </Link>
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
