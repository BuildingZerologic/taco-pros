
import { Link } from "react-router-dom";
import "./Disc.css";
import TacoButton from "./TacoButton";


function Disc() {
    return (
        <>
            <div className="ox-card row-rev">
                <div className="ox-content">
                    {/* <span className="ox-overline">LOREM IPSUM</span> */}
                    <h1 className="ox-title">Flavor, Pure Sabor with Zero Polish and all Corazon</h1>
                    <p className="ox-description">
                        The pros cook with straight-up mercado energy — loud, smoky, real. Comal-born smoke, sunrise-built flavor, pure mercado sabor with zero polish and all corazón.
                    </p>


                    {/* <Link to="/our-story" className="ox-cta">
                        OUR STORY
                        <span className="ox-arrow">→</span> */}

                        <div >
                            <TacoButton text="ORDER online"
                            width="clamp(115px, 15vw, 191px)"
                            height="clamp(51px, 5vw, 57px)"
                            fontSize="clamp(16px, 2vw, 24px)"
                            styleType="2"
                            textColor ="#e4531e"
                        
                        />
                        </div>

                        

                   
                </div>
                <div className="ox-image-container">
                    <img src="/tp site square nachos.jpg" alt="Authentic Mexican Food" className="ox-image" />
                </div>
            </div>
        </>
    )
}

export default Disc;
