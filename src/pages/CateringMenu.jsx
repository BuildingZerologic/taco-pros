import React, { useState, useEffect } from "react";
import './CateringMenu.css';
import { useLocation } from "react-router-dom";
import TacoButton from '../components/TacoButton';

const CATERING_TABS = ['party-trays', 'live-catering', 'individual-packs','prokit', 'sides'];

const CateringMenu = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('party-trays');

    const renderContent = () => {
        switch (activeTab) {
            case 'party-trays':
                return <PartyTraysSection />;
            case 'live-catering':
                return <LiveCateringSection />;
            // case 'buffet-style':
            //     return <BuffetStyleSection />;
            case 'individual-packs':
                return <IndividualPacksSection />;
            case 'prokit':
                return <ProkitCateringSection/>;
            case 'sides':
                return <SidesSection />;
            default:
                return <PartyTraysSection />;
        }
    };

        const [isSticky, setIsSticky] = useState(false);
    
        useEffect(() => {
            const handleScroll = () => {
                if (window.scrollY > 100) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        useEffect(() => {
            document.body.classList.add("catering-page");
            return () => document.body.classList.remove("catering-page");
        }, []);

        useEffect(() => {
            const categoryId = new URLSearchParams(location.search).get("category");

            if (CATERING_TABS.includes(categoryId)) {
                setActiveTab(categoryId);
            }
        }, [location.search]);

    return (
        <>
        <div className="superman-container">
            {/* Scrollable Tabs Header */}
            <div className={`superman-tabs-header ${isSticky ? "is-fixed" : ""}`}>
                {CATERING_TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`superman-tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.replace('-', ' ').toUpperCase()}
                    </button>
                ))}
            </div>

            <main className="superman-content-area">
                {renderContent()}
            </main>
        </div>

         <div className="mySpace"></div>
        </>
    );
};

/* --- 1. PARTY TRAYS SECTION --- */
const PartyTraysSection = () => (
    <div className="superman-grid-layout">
        <h1 className="superman-title">PARTY TRAYS</h1>
        <div className="superman-media-col">
            <div className="superman-sticky-wrapper">
                <div className="superman-hero-img-wrapper">
                    <img src="/PARTY TRAYS.png" alt="Party Trays" className="superman-hero-img" />
                </div>
                <div className='ddnone'>
                    <TacoButton text="ORDER NOW"
                        width={window.innerWidth < 768 ? "100%" : "100%"}
                        height={window.innerWidth < 768 ? "51px" : "57px"}
                        styleType="1"
                        fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                        link="https://www.ezcater.com/brand/pvt/taco-pros"
                        textColor={"#E3501d"}
                    />
                </div>
            </div>
        </div>
        <div className="superman-info-col">
            <div className="superman-card">
                <h3>TACO TRAYS</h3>
                <p className="superman-subtitle">20 Tacos</p>
                <div className="superman-price-row">
                    <span>REGULAR PROTEIN</span>
                    <span className="superman-price">$78</span>
                </div>
                <div className="superman-price-row">
                    <span>SIGNATURE PROTEIN</span>
                    <span className="superman-price">$84</span>
                </div>
            </div>
            <div className="superman-card">
                <h3>BURRITO TRAYS</h3>
                <p className="superman-subtitle">10 Burritos</p>
                <div className="superman-price-row">
                    <span>REGULAR PROTEIN</span>
                    <span className="superman-price">$96</span>
                </div>
                <div className="superman-price-row">
                    <span>SIGNATURE PROTEIN</span>
                    <span className="superman-price">$106</span>
                </div>
            </div>

            <TacoButton text="Order now"
                width={window.innerWidth < 768 ? "100%" : "100%"}
                height={window.innerWidth < 768 ? "51px" : "57px"}
                styleType="1"
                fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                link="https://www.ezcater.com/brand/pvt/taco-pros"
                textColor={"#E3501d"}
            />
        </div>
    </div>
);

/* --- 2. LIVE CATERING SECTION --- */
const LiveCateringSection = () => (
    <div className="superman-grid-layout">
        <h1 className="superman-title">LIVE CATERING</h1>
        <div className="superman-media-col">
            <div className="superman-sticky-wrapper">
                <div className="superman-hero-img-wrapper">
                    <img src="/fffff.png" alt="Live Catering" className="superman-hero-img" />
                </div>
                <div className="ddnone">
                    <TacoButton text="ORDER NOW"
                        width={window.innerWidth < 768 ? "100%" : "100%"}
                        height={window.innerWidth < 768 ? "51px" : "57px"}
                        styleType="1"
                        fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                        link="https://www.ezcater.com/brand/pvt/taco-pros"
                        textColor={"#E3501d"}
                    />
                </div>

            </div>
        </div>
        <div className="superman-info-col">
            <div className="superman-live-card">
                <h2 className="superman-main-price">$15 PER PERSON</h2>
                <h3 className="superman-min-people">MINIMUM 75 PEOPLE</h3>
                <p className="superman-server-info">3 Live Servers at $300 for 2 Hours</p>
                <div className="superman-info-box">
                    <h4>INCLUDES:</h4>
                    <ul>
                        <li>Tacos, Mini Burritos, Quesadillas, Veg Or 2 Proteins</li>
                    </ul>
                </div>
                <div className="superman-info-box">
                    <h4>TOPPINGS:</h4>
                    <p>Lettuce, Cilantro, Onions, Tomatoes, Cheese</p>
                </div>
                <div className="superman-info-box">
                    <h4>CHIPS, SALSA AND GUACAMOLE</h4>
                    <p>*Utensils — $1 per person</p>
                </div>
            </div>
            <TacoButton text="ORDER NOW"
                width={window.innerWidth < 768 ? "100%" : "100%"}
                height={window.innerWidth < 768 ? "51px" : "57px"}
                styleType="1"
                fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                link="https://www.ezcater.com/brand/pvt/taco-pros"
                textColor={"#E3501d"}
            />
        </div>
    </div>
);

/* --- 3. BUFFET STYLE SECTION --- */
// const BuffetStyleSection = () => (
//     <div className="superman-grid-layout">
//         <h1 className="superman-title">BUFFET STYLE CATERING</h1>
//         <div className="superman-media-col">
//             <div className="superman-sticky-wrapper">
//                 <div className="superman-hero-img-wrapper">
//                     <img src="/BUFFET STYLE CATERING.png" alt="Buffet Style" className="superman-hero-img" />
//                 </div>
//                 <div className="ddnone">
//                     <TacoButton text="CATER NOW"
//                         width={window.innerWidth < 768 ? "100%" : "100%"}
//                         height={window.innerWidth < 768 ? "51px" : "57px"}
//                         styleType="1"
//                         fontSize={window.innerWidth < 768 ? "18px" : "24px"}
//                         link="https://www.ezcater.com/brand/pvt/taco-pros"
//                         textColor={"#E3501d"}
//                     />
//                 </div>

//             </div>
//         </div>
//         <div className="superman-info-col">
//             <div className="superman-card">
//                 <p className="superman-server-info">Half Tray of Meat, 9x9 Topping Tray, 50 Tortillas, Side of Rice & Beans, Serves 15-20 People for $240</p>
//                 <small>(Starting At $12 Per Person)</small>
//             </div>
//             <div className="superman-card">
//                 <h3>Meat Trays</h3>
//                 <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$132</span></div>
//                 <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$240</span></div>
//             </div>
//             <div className="superman-card">
//                 <h3>Topping Trays</h3>
//                 <div className="superman-price-row"><span>9x9 Tray</span><span className="superman-price">$36</span></div>
//                 <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$72</span></div>
//             </div>
//               <div className="superman-card">
//                 <h3>Tortillas</h3>
//                 <div className="superman-price-row"><span>50 Tortillas</span><span className="superman-price">$24</span></div>
//                 <div className="superman-price-row"><span>100 Tortillas</span><span className="superman-price">$48</span></div>
//             </div>
//             <TacoButton text="CATER NOW"
//                 width={window.innerWidth < 768 ? "100%" : "100%"}
//                 height={window.innerWidth < 768 ? "51px" : "57px"}
//                 styleType="1"
//                 fontSize={window.innerWidth < 768 ? "18px" : "24px"}
//                 link="https://www.ezcater.com/brand/pvt/taco-pros"
//                 textColor={"#E3501d"}
//             />
//         </div>
//     </div>
// );

/* --- 4. INDIVIDUAL PACKS SECTION --- */
const IndividualPacksSection = () => (
    <div className="superman-grid-layout">
        <h1 className="superman-title">INDIVIDUAL CATERING PACKS</h1>
        <div className="superman-media-col">
            <div className="superman-sticky-wrapper">
                <div className="superman-hero-img-wrapper">
                    <img src="/INDIVISUAL CATERING.png" alt="Individual Packs" className="superman-hero-img" />
                </div>
                <div className="ddnone">
                     <TacoButton text="ORDER NOW"
                    width={window.innerWidth < 768 ? "100%" : "100%"}
                    height={window.innerWidth < 768 ? "51px" : "57px"}
                    styleType="1"
                    fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                    link="https://www.ezcater.com/brand/pvt/taco-pros"
                    textColor={"#E3501d"}
                />
                </div>
            </div>
        </div>
        <div className="superman-info-col">
            <div className="superman-live-card">
                <div className="superman-info-box">
                    <h2 className="superman-main-price">Individual Catering Packs start at $14</h2>
                    <small>(Minimum of 25 Orders)</small>
                </div>
                <div className="superman-card2">
                    <h4>Rice And Beans (Comes With Each Order)</h4>
                    <div className="superman-price-row"><span>3 Tacos Combo</span><span className="superman-price">$13</span></div>
                    <div className="superman-price-row"><span>Burrito Combo</span><span className="superman-price">$13</span></div>
                    <div className="superman-price-row"><span>Torta Combo</span><span className="superman-price">$13</span></div>
                    <div className="superman-price-row"><span>Quesadilla Combo</span><span className="superman-price">$13</span></div>
                     <div className="superman-price-row"><span>Enchiladas Combo</span><span className="superman-price">$13</span></div>
                </div>
            </div>
            <TacoButton text="ORDER NOW"
                width={window.innerWidth < 768 ? "100%" : "100%"}
                height={window.innerWidth < 768 ? "51px" : "57px"}
                styleType="1"
                fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                link="https://www.ezcater.com/brand/pvt/taco-pros"
                textColor={"#E3501d"}
            />
        </div>
    </div>
);

const ProkitCateringSection = () => (
    <div className="superman-grid-layout">
        <h1 className="superman-title">Prokit</h1>
        <div className="superman-media-col">
            <div className="superman-sticky-wrapper">
                <div className="superman-hero-img-wrapper">
                    <img src="tp pro kit.png" alt="Live Catering" className="superman-hero-img" />
                </div>
                <div className="ddnone">
                    <TacoButton text="ORDER NOW"
                        width={window.innerWidth < 768 ? "100%" : "100%"}
                        height={window.innerWidth < 768 ? "51px" : "57px"}
                        styleType="1"
                        fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                        link="https://www.ezcater.com/brand/pvt/taco-pros"
                        textColor={"#E3501d"}
                    />
                </div>

            </div>
        </div>
        <div className="superman-info-col">
            <div className="superman-live-card">
                <h2 className="superman-main-price">Build Your Own Pro Kit</h2>
                <h3 className="superman-min-people">91.99 $ ($11.50 / person) Serves 8</h3>
                <p className="superman-server-info">A complete, customizable taco bar experience. Everything you need to build the perfect meal for your group, including your choices of 2 proteins, style & tortillas, 3 salsas , a traditional duo (Mexican rice & savory beans, 28oz each), and 3 sides.</p>
                <div className="superman-info-box">
                    <h4>PROTEIN OPTIONS : </h4>
                    <ul>
                        <li>Regular Protein,Signature Protein</li>
                    </ul>
                </div>
                <div className="superman-info-box">
                    <h4>STYLE OPTIONS :  </h4>
                    <ul>
                        <li>American Style,Mexican Style</li>
                    </ul>
                </div>
                <div className="superman-info-box">
                    <h4>TORTILLA OPTIONS : </h4>
                    <p>Flour Tortillas,Corn Tortillas,Mix & Match</p>
                </div>
                <div className="superman-info-box">
                    <h4>ADD EXTRA SIDES, TOPPINGS, DESSERT & BEVERAGES AS PER YOUR CHOICE. CHARGES APPLY.</h4>
                    {/* <p>*Utensils — $1 per person</p> */}
                </div>
            </div>
            <TacoButton text="ORDER NOW"
                width={window.innerWidth < 768 ? "100%" : "100%"}
                height={window.innerWidth < 768 ? "51px" : "57px"}
                styleType="1"
                fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                link="https://www.ezcater.com/brand/pvt/taco-pros"
                textColor={"#E3501d"}
            />
        </div>
    </div>
);


/* --- 5. SIDES SECTION (With Circular Images & Full Width) --- */
const SidesSection = () => (
    <div className="superman-grid-layout">
        <h1 className="superman-title">INDIVIDUAL CATERING PACKS</h1>

        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp rice.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>Rice</h4>
                    <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$48</span></div>
                    <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$96</span></div>


                </div>

            </div>
        </>

        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp beans.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>REFRIED BEANS</h4>
                    <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$48</span></div>
                    <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$96</span></div>


                </div>

            </div>
        </>

        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp guac.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>GUACAMOLE</h4>
                    <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$96</span></div>
                    <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$180</span></div>


                </div>

            </div>
        </>
        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp chips.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>CHIPS</h4>
                    <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$18</span></div>
                    <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$30</span></div>


                </div>

            </div>
        </>
        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp mini churros.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>MINI CHURROS</h4>
                    <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$24</span></div>
                    <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$48</span></div>


                </div>

            </div>
        </>
        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp red salsa.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>SALSA (RED)</h4>
                    <div className="superman-price-row"><span>16oz</span><span className="superman-price">$6</span></div>



                </div>
                
            </div>
        </>

        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp green salsa.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>SALSA (GREEN)</h4>
                    <div className="superman-price-row"><span>16oz</span><span className="superman-price">$6</span></div>



                </div>
                
            </div>
        </>

        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp chunky warm salsa.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4>Signature SALSA</h4>
                    <div className="superman-price-row"><span>16oz</span><span className="superman-price">$6</span></div>



                </div>
              
            </div>
        </>

        <>
            <div className="superman-media-col">
                <div className="superman-sticky-wrapper">
                    <div className="superman-hero-img-wrapper2">
                        <img src="/600px_tp salsa de arbol.png" alt="Individual Packs" className="superman-hero-img2" />
                    </div>

                </div>
            </div>
            <div className="superman-info-col">
                <div className="superman-live-card">


                    <h4> SALSA de arbol</h4>
                    <div className="superman-price-row"><span>16oz</span><span className="superman-price">$6</span></div>



                </div>



                <TacoButton text="ORDER NOW"
                    width={window.innerWidth < 768 ? "100%" : "100%"}
                    height={window.innerWidth < 768 ? "51px" : "57px"}
                    styleType="1"
                    fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                    link="https://www.ezcater.com/brand/pvt/taco-pros"
                    textColor={"#E3501d"}
                />


            </div>
        </>




    </div>

    


);
export default CateringMenu;
