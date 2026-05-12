import { useEffect, useRef, useState } from "react";
import "./marquee.css";

const nudgeScrollForAutoplay = () => {
    if (typeof window === "undefined") return;
    

    const initialX = window.scrollX;
    const initialY = window.scrollY;

    window.requestAnimationFrame(() => {
        window.scrollTo(initialX, initialY + 1);
        window.requestAnimationFrame(() => {
            window.scrollTo(initialX, initialY);
        });
    });
};

const MarqueeVideo = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return undefined;

        if (!("IntersectionObserver" in window)) {
            setShouldLoad(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "600px" }
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoad) return undefined;

        const video = videoRef.current;
        if (!video) return undefined;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        const playVideo = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        };

        const resume = () => {
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute("muted", "");
            video.play().catch(() => {});
            document.removeEventListener("touchstart", resume);
            document.removeEventListener("click", resume);
            window.removeEventListener("scroll", resume);
        };

        const tryPlay = () => {
            video.muted = true;
            video.defaultMuted = true;

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    nudgeScrollForAutoplay();
                    document.addEventListener("touchstart", resume, { once: true });
                    document.addEventListener("click", resume, { once: true });
                    window.addEventListener("scroll", resume, { once: true, passive: true });
                });
            }
        };

        const handleLoadedData = () => setIsPlaying(true);

        playVideo();
        nudgeScrollForAutoplay();
        document.addEventListener("touchstart", resume, { once: true });
        document.addEventListener("click", resume, { once: true });
        window.addEventListener("scroll", resume, { once: true, passive: true });
        video.addEventListener("loadeddata", handleLoadedData, { once: true });
        video.addEventListener("canplay", tryPlay);

        return () => {
            video.removeEventListener("loadeddata", handleLoadedData);
            video.removeEventListener("canplay", tryPlay);
            document.removeEventListener("touchstart", resume);
            document.removeEventListener("click", resume);
            window.removeEventListener("scroll", resume);
        };
    }, [src, shouldLoad]);

    return (
        <video
            ref={videoRef}
            src={shouldLoad ? src : undefined}
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            webkit-playsinline="true"
            preload={shouldLoad ? "metadata" : "none"}
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            x-webkit-airplay="deny"
            controlsList="nodownload noplaybackrate noremoteplayback"
            onPlaying={() => setIsPlaying(true)}
            className={isPlaying ? "is-playing" : ""}
        />
    );
};

export default function Marquee({
    data = [],
    direction = "left",
    speed = 10000,
    pauseOnHover = true,
    size = 200, // width of reel
}) {
    const isRight = direction === "right";
    const reelSize = typeof size === "number" ? `${size}px` : size;
    const repeatedData = data.length > 0
        ? Array.from({ length: Math.ceil(8 / data.length) }, () => data).flat()
        : [];

    return (
        <div
            className={`marquee ${!pauseOnHover ? "no-hover" : ""}`}
            style={{
                "--duration": `${speed}ms`,
                "--direction": isRight ? "reverse" : "normal",
                "--size": reelSize,
            }}
        >
            {[...Array(2)].map((_, groupIndex) => (
                <div className="marquee__group" key={groupIndex}>
                    {repeatedData.map((item, index) => (
                        <a
                            key={`${groupIndex}-${index}`}
                            href={item.link || "https://www.instagram.com/taco_pros/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="marquee__item"
                        >
                            {item.type === "video" ? (
                                <MarqueeVideo src={item.src} />
                            ) : (
                                <img src={item.src} alt="" />
                            )}
                        </a>
                    ))}
                </div>
            ))}
        </div>
    );
}
