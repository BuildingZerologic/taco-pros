import React, { useEffect, useRef } from "react";
import "./TimelineLayout.css";
import ScrollSVG from "../pages/ScrollSVG";
import { Link } from "react-router-dom";

import CounterSection from "../components/CounterSection"
import TacoButton from "./TacoButton";

const storyParagraphs = [
    "In Mexico, food isn't polished or perfect - it's alive. It's fire, hands, noise, and instinct. It's born in the streets, shaped in the markets, and carried in the memories of the people who make it.",
    "That's where Mercedes comes in.",
    "She grew up in the tianguis, Mexico's openair markets, working beside her parents as they cooked for crowds that wanted flavor with personality. As a kid, she learned everything the real way - grinding chiles on stone, pressing tortillas by hand, tasting until it felt right. No recipes. No shortcuts. Just skill, repetition, and heart.",
    "Over time, Mercedes built her own style - bold, colorful, unmistakably hers. Her tortillas, her salsas, her touch... people lined up for it. Not because it was fancy, but because it was real. Her stall became a spot where strangers turned into regulars and regulars turned into family.",
    "Her sons, Victor and Cesar, grew up in that world - waking up to the smell of roasted chiles, falling asleep to the sounds of the market shutting down. They didn't learn Mexican cooking from a book. They learned it from watching their mother work, grind, hustle, and create.",
    "When they came to Chicago, they didn't come emptyhanded. They brought the tianguis with them. They opened Taco Pros in Oak Park, building it on the same things Mercedes taught them: slowcrafted marinades, firekissed chiles, salsas with attitude, and flavors that don't apologize for being bold.",
    "The shop didn't take off because it was trendy - it took off because it tasted like something real, something livedin, something passed down.",
    "What started generations ago in a streetmarket stall now lives here - in every taco, every salsa, every bite.",
    "At Taco Pros, you're not just eating. You're tasting a story carried across borders, shaped by family hands, and sharpened through years of craft.",
    "Welcome to Taco Pros - where the streets of Mexico meet the heart of Chicago, and every bite carries a piece of our family's history.",
];

const StoryCopy = ({ paragraphs }) => (
    <>
        {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
        ))}
    </>
);

const missionCta = {
    eyebrow: "THE MISSION STAYS THE SAME",
    headlines: ["KEEP IT BOLD", "KEEP IT REAL", "KEEP IT COMING!"],
    body: "No fluff. No shortcuts. Just real food, made by real pros, with real flavor that hits every time.",
    image: "/tp taqueria only uncle.webp",
};

const MissionHeadline = ({ className = "", lineBreaks = false }) => (
    <>
        {missionCta.headlines.map((headline, index) => (
            lineBreaks ? (
                <React.Fragment key={headline}>
                    {headline}
                    {index < missionCta.headlines.length - 1 && <br />}
                </React.Fragment>
            ) : (
                <h2 key={headline} className={className}>{headline}</h2>
            )
        ))}
    </>
);

const ScrollCard = ({ children, className = "", triggerY = 0 }) => {

    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        if (triggerY === 0) {
            node.classList.add("show");
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add("show");
                    observer.unobserve(node);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -18% 0px" }
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
                        <img src="a1.png" className="cardOneImg" />
                        <div className="cardOneContent">
                            <span>OUR STORY</span>
                            <h2>WHERE IT STARTED</h2>
                            <StoryCopy paragraphs={storyParagraphs.slice(0, 3)} />
                        </div>
                    </div>
                </ScrollCard>

                <ScrollCard className="card-cyan card-3" triggerY={100}>

                    <div className="cardThree">
                        <div className="cardThreeLeft">
                            <img src="./a2.png" />
                            <img src="./a3.png" />
                            <img src="/a4.jpg" />
                            <img src="/a5.jpg" />
                        </div>
                        <div className="cardThreeRight">
                            <StoryCopy paragraphs={storyParagraphs.slice(3, 6)} />
                        </div>
                    </div>

                </ScrollCard>

                <ScrollCard className="card-pink card-4" triggerY={300}>
                    <div className="cardFour" style={{ flexDirection: "row-reverse" }}>
                        <div className="cardFourLeft">
                            <img src="./a6.jpg" />
                            <img src="./a7.png" />
                            <img src="./a8.jpg" />
                        </div>
                        <div className="cardFourRight">
                            <StoryCopy paragraphs={storyParagraphs.slice(6)} />

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
                                    width={window.innerWidth < 768 ? "155px" : "302px"}
                                    height={window.innerWidth < 768 ? "51px" : "57px"}
                                    styleType="2"
                                    fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                                    link="/locations"
                                />

                        

                            </Link>
                        </div>
                    </div>
                </section>

                <ScrollCard className="card-orange card-5" triggerY={1200}>
                    <div className="cardFive">
                        <div className="cardfiveLeft">
                            <span>{missionCta.eyebrow}</span>
                            <h2>
                                <MissionHeadline lineBreaks />
                            </h2>
                            <p>{missionCta.body}</p>

                

                             <TacoButton text="Order Now"
                                    width={window.innerWidth < 768 ? "155px" : "302px"}
                                    height={window.innerWidth < 768 ? "51px" : "57px"}
                                    styleType="1"
                                    fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                                    link="/locations"
                                />
                                 <div className="bottomTile"></div>
                        </div>

                        <div className="cardfiveRight">
                            <img src={missionCta.image}/>
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
                        <div className="jhv-body-text">
                            <StoryCopy paragraphs={storyParagraphs.slice(0, 3)} />
                        </div>
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
                        <div className="jhv-footer-text">
                            <StoryCopy paragraphs={storyParagraphs.slice(3, 6)} />
                        </div>
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
                        <div className="jhv-footer-text">
                            <StoryCopy paragraphs={storyParagraphs.slice(6)} />
                        </div>
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
                    <span className="jhv-cta-subheadline">{missionCta.eyebrow}</span>
                    <div className="jhv-headline-stack">
                        <MissionHeadline className="jhv-bold-title" />
                    </div>
                    <p className="jhv-cta-body">{missionCta.body}</p>
                    <a href="#" className="jhv-cta-button">
                        ORDER NOW
                    </a>
                    <img
                        src={missionCta.image}
                        alt=""
                        className="jhv-cta-img"
                    />
                </div>



            </section>

            <div className="mySpace"></div>

        </div>
    );
}
