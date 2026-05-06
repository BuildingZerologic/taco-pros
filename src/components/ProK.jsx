
import { Link } from "react-router-dom";
import "./Disc.css";
import TacoButton from "./TacoButton";

function ProK() {
    return (
        <>
            <div className="ox-card row-rev">
                <div className="ox-content-2" style={{background : "#e4531e"}}>

                    <h1 className="ox-title">INTRODUCING THE PRO-KIT</h1>
                    <p className="ox-description">
                        The pros have created the ultimate DIY party kit, jam-packed with flavor and variety like never seen before.
                        <br /> <br />
                        Everything you need for your fiesta, all in
                        one beautiful kit.
                    </p>


                    <div >
                        <TacoButton text="VIEW CATERING"
                        width="clamp(115px, 15vw, 191px)"
                        height="clamp(51px, 5vw, 57px)"
                        fontSize="clamp(16px, 2vw, 24px)"
                        styleType="2"
                        link="/catering"
                        textColor="#e4531e"

                    />
                    </div>



                </div>
                <div className="ox-image-container">
                    <img src="/tp site pro kit square.jpg" alt="Authentic Mexican Food" className="ox-image" />
                </div>
            </div>
        </>
    )
}

export default ProK;
