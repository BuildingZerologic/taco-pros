import React, { useEffect, useRef } from "react";
import "./TimelineLayout.css";
import ScrollSVG from "../pages/ScrollSVG";

const ScrollCard = ({ children, className = "", triggerY = 0 }) => {

    const ref = useRef(null);

    useEffect(() => {

        const handleScroll = () => {

            const scrollY = window.scrollY;

            if (scrollY > triggerY) {
                ref.current.classList.add("show");
            }

        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);

    }, [triggerY]);

    return (
        <div ref={ref} className={`timeline-card ${className}`}>
            <div className="card-content boxed">
                {children}
            </div>
        </div>
    );
};

export default function TimelineLayout() {

    return (
        <div className="main-wrapper" style={{background : "#fad200"}}>

      <div className="svgg">
                <ScrollSVG/>
            </div>

            <section className="container-x dotted-background">

                <ScrollCard className="card-red card-1" triggerY={0}>
                    <div className="cardOne">
                        <img src="a1.png" className="cardOneImg" />
                        <div className="cardOneContent">
                            <span>OUR STORY</span>
                            <h2>WHERE IT STARTED</h2>
                            <p>
                                In Mexico, food has always been more
                                than just a meal — it’s an experience...
                                and an experiment. Blending spices,
                                roasting chilies, and perfecting recipes
                                not with cookbooks, but with curiosity.
                                Every dish is a discovery, every spice a
                                new note in the story of flavor.
                            </p>
                        </div>
                    </div>
                </ScrollCard>

                <ScrollCard className="card-yellow card-2" triggerY={100}>
                    <div className="cardTwoContent">
                        <img src="./a2.png" className="cardTwoLeft" />
                        <img src="./a3.png" className="cardTwoRight" />
                    </div>
                </ScrollCard>

                <ScrollCard className="card-cyan card-3" triggerY={400}>

                    <div className="cardThree">
                        <div className="cardThreeLeft">
                            <img src="./a4.jpg" />
                            <img src="./a5.jpg" />
                        </div>
                        <div className="cardThreeRight">
                            <p>That spirit of experimentation, love, and
                                authenticity, that's our drive. Taco Pros
                                was built on the belief that Mexican food
                                should surprise, comfort, and connect.</p>
                        </div>
                    </div>

                </ScrollCard>

                <ScrollCard className="card-pink card-4" triggerY={600}>
                    <div className="cardFour" style={{ flexDirection: "row-reverse" }}>
                        <div className="cardFourLeft">
                            <img src="./a6.jpg" />
                            <img src="./a7.png" />
                            <img src="./a8.jpg" />
                        </div>
                        <div className="cardFourRight">
                            <p>
                                At Taco Pros, we share with you
                                a journey. A journey of flavors
                                discovered, perfected, and
                                shared — one unforgettable first
                                bite at a time.
                            </p>

                        </div>
                    </div>
                </ScrollCard>

                <ScrollCard className="card-orange card-5" triggerY={1200}>
                    <div className="cardFive">
                        <div className="cardfiveLeft">
                            <span>THE MISSION STAYS THE SAME</span>
                            <h2>
                                KEEP IT BOLD
                                KEEP IT REAL
                                KEEP IT COMING!
                            </h2>
                            <p>
                                No fluff. No shortcuts. Just real food, made by
                                real pros, with real flavor that hits every time.
                            </p>
                        </div>

                        <div className="cardfiveRight">
                           
                        </div>
                    </div>
                </ScrollCard>

            </section>

          

        </div>
    );
}