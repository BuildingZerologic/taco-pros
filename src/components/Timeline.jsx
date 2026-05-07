import React, { useEffect, useRef } from "react";
import "./TimelineLayout.css";
import ScrollSVG from "../pages/ScrollSVG";
import { Link } from "react-router-dom";

import CounterSection from "../components/CounterSection"
import TacoButton from "./TacoButton";

const ScrollCard = ({ children, className = "", triggerY = 0 }) => {

    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        if (triggerY === 0) {
            node.classList.add("show");
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add("show");
                    observer.unobserve(node);
                }
            },
            { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(node);

        return () => observer.disconnect();

    }, [triggerY]);

    return (
        <div ref={ref} className={`timeline-card ${className}`}>
            <div className="card-contentt boxed">
                {children}
            </div>
        </div>
    );
};

export default function TimelineLayout() {

    return (
        <div className="main-wrapper">

            <div className="svgg">

            </div>

            <section className="container-x dotted-background ">

                <ScrollCard className="card-red card-1" triggerY={0}>
                    <div className="cardOne">
                        <img src="a1.png" className="cardOneImg" alt="Mexican street food preparation scene" />
                        <div className="cardOneContent">
                            <span>OUR STORY</span>
                            <h2>WHERE IT STARTED</h2>
                            <p>
                                In Mexico, food isn't polished or perfect - it's alive. It's fire,
                                hands, noise, and instinct. It's born in the streets, shaped in the
                                markets, and carried in the memories of the people who make it.
                                That's where Mercedes comes in.
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
                            <img src="/a4.jpg" />
                            <img src="/a5.jpg" />
                        </div>
                        <div className="cardThreeRight">
                            <p>
                                She grew up in the tianguis, Mexico's open-air markets, working
                                beside her parents as they cooked for crowds that wanted flavor with
                                personality. As a kid, she learned everything the real way - grinding
                                chiles on stone, pressing tortillas by hand, tasting until it felt
                                right. No recipes. No shortcuts. Just skill, repetition, and heart.
                                Over time, Mercedes built her own style - bold, colorful, and
                                unmistakably hers.
                            </p>
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
                                Her sons, Victor and Cesar, grew up in that world. When they came to
                                Chicago, they brought the tianguis with them. They opened Taco Pros
                                in Oak Park on the same things Mercedes taught them: slow-crafted
                                marinades, fire-kissed chiles, salsas with attitude, and flavors that
                                don't apologize for being bold. Welcome to Taco Pros - where the
                                streets of Mexico meet the heart of Chicago.
                            </p>

                        </div>
                    </div>
                </ScrollCard>

                <CounterSection />

                <section className="map-new">
                    <div className="mapBoxv">
                        <div className="mapcontent">
                            <p className="mapH">Find A Tacopros </p>

                            <Link to="/locations" data-discover="true">


                                <TacoButton text="Our Locations"
                                    width="clamp(155px, 22vw, 302px)"
                                    height="clamp(51px, 5vw, 57px)"
                                    styleType="2"
                                    fontSize="clamp(18px, 2vw, 24px)"
                                    link="/locations"
                                />



                            </Link>
                        </div>
                    </div>
                </section>

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



                            <TacoButton text="Order Now"
                                width="clamp(155px, 22vw, 302px)"
                                height="clamp(51px, 5vw, 57px)"
                                styleType="1"
                                fontSize="clamp(18px, 2vw, 24px)"
                                link="/locations"
                            />
                            <div className="bottomTile"></div>
                        </div>

                        <div className="cardfiveRight">
                            <img src="tp taqueria only uncle.webp" />
                        </div>
                    </div>


                </ScrollCard>

            </section>




            <section className="dnone">
                <div className="jhv-container">
                    <div className="jhv-top-section">
                        <div className="jhv-image-wrapper">
                            <img
                                src="/Image (Colorful Mexican street).png"
                                alt="Mexican Street"
                                className="jhv-main-img"
                            />
                        </div>
                        <div className="jhv-header-content">
                            <span className="jhv-subheadline">OUR STORY</span>
                            <h1 className="jhv-main-title">
                                WHERE IT
                                <br />
                                STARTED
                            </h1>
                        </div>
                    </div>
                    <div className="jhv-content-section">
                        <p className="jhv-body-text">
                            In Mexico, food isn't polished or perfect - it's alive. It's fire,
                            hands, noise, and instinct. It's born in the streets, shaped in the
                            markets, and carried in the memories of the people who make it.
                            That's where Mercedes comes in.
                        </p>
                    </div>
                </div>

                <div className="jhv-gallery-container">
                    <div className="jhv-img-row jhv-left">
                        <img
                            src="/XMLID_228_.png"
                            alt="Mexican Skulls"
                            className="da jhv-gallery-img jhv-portrait"
                        />
                    </div>
                    <div className="jhv-img-row jhv-right">
                        <img
                            src="/XMLID_233_.png"
                            alt="Cooking on grill"
                            className="jhv-gallery-img jhv-landscape db"
                        />
                    </div>
                    <div className="jhv-img-row jhv-left hgh">
                        <img
                            src="/XMLID_5829_.png"
                            alt="Eating a taco"
                            className="jhv-gallery-img jhv-square"
                        />
                    </div>
                    <div className="jhv-footer-content">
                        <p className="jhv-footer-text">
                            She grew up in the tianguis, Mexico's open-air markets, working beside
                            her parents as they cooked for crowds that wanted flavor with
                            personality. As a kid, she learned everything the real way - grinding
                            chiles on stone, pressing tortillas by hand, tasting until it felt right.
                            No recipes. No shortcuts. Just skill, repetition, and heart. Over time,
                            Mercedes built her own style - bold, colorful, and unmistakably hers.
                        </p>
                    </div>
                </div>

                <div className="jhv-final-section">
                    <div className="jhv-img-row jhv-left">
                        <img
                            src="/XMLID_6684_.png"
                            alt="Taco Spread"
                            className="jhv-gallery-img jhv-wide dc"
                        />
                    </div>
                    <div className="jhv-img-row jhv-right">
                        <img
                            src="/XMLID_6681_.png"
                            alt="Person at bar"
                            className="jhv-gallery-img jhv-portrait-small"
                        />
                    </div>
                    <div className="jhv-img-row jhv-left">
                        <img
                            src="/XMLID_222_.png"
                            alt="Holding a sandwich"
                            className="jhv-gallery-img jhv-square-small"
                        />
                    </div>
                    <div className="jhv-footer-content">
                        <p className="jhv-footer-text">
                            Her sons, Victor and Cesar, grew up in that world. When they came to
                            Chicago, they brought the tianguis with them. They opened Taco Pros in
                            Oak Park on the same things Mercedes taught them: slow-crafted marinades,
                            fire-kissed chiles, salsas with attitude, and flavors that don't
                            apologize for being bold. Welcome to Taco Pros - where the streets of
                            Mexico meet the heart of Chicago.
                        </p>
                    </div>
                    <div className="jhv-img-row">
                        <img
                            src="/XMLID_227_.png"
                            alt="Large food spread"
                            className="jhv-gallery-img jhv-full-width"
                        />
                    </div>
                    <hr className="jhv-divider" />
                </div>

                <CounterSection />

                <section className="map-new">
                    <div className="mapBoxv">
                        <div className="mapcontent">
                            <p className="mapH">Find A Tacopros  </p>

                            <Link to="/locations" data-discover="true">
                                <div className="jhv-cta-button-2">
                                    Our Locations
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>



                <div className="jhv-cta-container">
                    <span className="jhv-cta-subheadline">THE MISSION STAYS THE SAME</span>
                    <div className="jhv-headline-stack">
                        <h2 className="jhv-bold-title">KEEP IT BOLD</h2>
                        <h2 className="jhv-bold-title">KEEP IT REAL</h2>
                        <h2 className="jhv-bold-title">KEEP IT COMING!</h2>
                    </div>
                    <p className="jhv-cta-body">
                        No fluff. No shortcuts. Just real food, made by real pros, with real flavor
                        that hits every single time.
                    </p>
                    <a href="#" className="jhv-cta-button">
                        ORDER NOW
                    </a>
                    <img
                        src="/tp taqueria only uncle.webp"
                        alt=""
                        className="jhv-cta-img"
                    />
                </div>



            </section>

            <div className="mySpace"></div>

        </div>
    );
}
