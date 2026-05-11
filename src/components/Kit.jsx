
import { Link } from "react-router-dom";
import "./Disc.css";
import TacoButton from "./TacoButton";
import ResponsiveImage from "./ResponsiveImage";

function Kit() {
    return (
        <>
            <div className="ox-card row-rev2">
                <div className="ox-content-2">

                    <h1 className="ox-title">CUISINE CRAFTED BY CULTURE</h1>
                    <p className="ox-description">
                        Inspired by the gastronomic art of Mexico, Taco Pros aims to transport you to the flavors of
                        Mexican Tianguis (market) street foods. We take
                        pride in investing in quality ingredients to
                        ensure our customers get the great taste we’re
                        famous for, because our vision is to present the
                        purest flavors of Mexico.
                    </p>

                    <div>
                        <TacoButton text="Order now"
                            width="clamp(115px, 15vw, 191px)"
                            height="clamp(51px, 5vw, 57px)"
                            fontSize="clamp(16px, 2vw, 24px)"
                            styleType="2"
                            link ="https://tacopros.toast.site/"
                            textColor ="#538C42"
                        
                        />
                    </div>

                        

                </div>
                <div className="ox-image-container">
                    <ResponsiveImage
                        mobileSrc="/old dudes mobile.jpg"
                        tabletSrc="/culture.jpg"
                        desktopSrc="/tp site landscape desktop old dudes.jpg"
                        alt="Authentic Mexican Food"
                        className="ox-image"
                    />
                </div>
            </div>
        </>
    )
}

export default Kit;
