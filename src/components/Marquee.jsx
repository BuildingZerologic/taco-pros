import { useEffect, useRef, useState } from "react";
import "./marquee.css";

const MarqueeVideo = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return undefined;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        const playVideo = () => {
            video.play().catch(() => {});
        };

        playVideo();
        video.addEventListener("canplay", playVideo, { once: true });

        return () => {
            video.removeEventListener("canplay", playVideo);
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
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
