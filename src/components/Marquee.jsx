import "./marquee.css";

export default function Marquee({
    data = [],
    direction = "left",
    speed = 10000,
    pauseOnHover = true,
    size = 200, // width of reel
}) {
    const isRight = direction === "right";
    const reelSize = typeof size === "number" ? `${size}px` : size;

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
                    {data.map((item, index) => (
                        <a
                            key={index}
                            href={item.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="marquee__item"
                        >
                            {item.type === "video" ? (
                                <video
                                    src={item.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
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
