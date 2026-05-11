import { useEffect, useState } from "react";

const getResponsiveSrc = ({ mobileSrc, tabletSrc, desktopSrc }) => {
    if (typeof window === "undefined") return desktopSrc;

    const width = window.innerWidth;
    if (width <= 480) return mobileSrc;
    if (width <= 768) return tabletSrc;
    return desktopSrc;
};

const ResponsiveImage = ({ mobileSrc, tabletSrc, desktopSrc, alt = "", className = "" }) => {
    const [src, setSrc] = useState(() => getResponsiveSrc({ mobileSrc, tabletSrc, desktopSrc }));

    useEffect(() => {
        const updateSrc = () => {
            setSrc(getResponsiveSrc({ mobileSrc, tabletSrc, desktopSrc }));
        };

        updateSrc();
        window.addEventListener("resize", updateSrc);

        return () => window.removeEventListener("resize", updateSrc);
    }, [mobileSrc, tabletSrc, desktopSrc]);

    return <img src={src} alt={alt} className={className} />;
};

export default ResponsiveImage;
