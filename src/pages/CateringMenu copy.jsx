import React, { useState } from 'react';
import './CateringMenu.css';

const CateringMenu = () => {
  const [activeTab, setActiveTab] = useState('party-trays');

  const renderContent = () => {
    switch (activeTab) {
      case 'party-trays':
        return <PartyTraysSection />;
      case 'live-catering':
        return <LiveCateringSection />;
      case 'buffet-style':
        return <BuffetStyleSection />;
      case 'individual-packs':
        return <IndividualPacksSection />;
      case 'sides':
        return <SidesSection />;
      default:
        return <PartyTraysSection />;
    }
  };

  return (
    <div className="superman-container">
      {/* Scrollable Tabs Header */}
      <div className="superman-tabs-header">
        {['party-trays', 'live-catering', 'buffet-style', 'individual-packs', 'sides'].map((tab) => (
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
        <button className="superman-cta-btn ddnone">ORDER NOW</button>
      </div>
    </div>
    <div className="superman-info-col">
      <div className="superman-card">
        <h3>TACO TRAYS</h3>
        <p className="superman-subtitle">20 Tacos</p>
        <div className="superman-price-row">
          <span>REGULAR PROTEIN</span>
          <span className="superman-price">$65</span>
        </div>
        <div className="superman-price-row">
          <span>SIGNATURE PROTEIN</span>
          <span className="superman-price">$65</span>
        </div>
      </div>
      <div className="superman-card">
        <h3>BURRITO TRAYS</h3>
        <p className="superman-subtitle">10 Burritos</p>
        <div className="superman-price-row">
          <span>REGULAR PROTEIN</span>
          <span className="superman-price">$65</span>
        </div>
        <div className="superman-price-row">
          <span>SIGNATURE PROTEIN</span>
          <span className="superman-price">$65</span>
        </div>
      </div>
      <button className="superman-cta-btn mnone">ORDER NOW</button>
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
        <button className="superman-cta-btn ddnone">ORDER NOW</button>
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
        <button className="superman-cta-btn mnone">ORDER NOW</button>
    </div>
  </div>
);

/* --- 3. BUFFET STYLE SECTION --- */
const BuffetStyleSection = () => (
  <div className="superman-grid-layout">
    <h1 className="superman-title">BUFFET STYLE CATERING</h1>
    <div className="superman-media-col">
      <div className="superman-sticky-wrapper">
        <div className="superman-hero-img-wrapper">
          <img src="/BUFFET STYLE CATERING.png" alt="Buffet Style" className="superman-hero-img" />
        </div>
        <button className="superman-cta-btn ddnone">ORDER NOW</button>
      </div>
    </div>
    <div className="superman-info-col">
      <div className="superman-card">
        <p className="superman-server-info">Half Tray of Meat, 9x9 Topping Tray, 50 Tortillas, Side of Rice & Beans, Serves 15-20 People for $240</p>
        <small>(Starting At $12 Per Person)</small>
      </div>
      <div className="superman-card">
        <h3>Meat Trays</h3>
        <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$132</span></div>
        <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$240</span></div>
      </div>
      <div className="superman-card">
        <h3>Topping Trays</h3>
        <div className="superman-price-row"><span>9x9 Tray</span><span className="superman-price">$36</span></div>
        <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$72</span></div>
      </div>
        <button className="superman-cta-btn mnone">ORDER NOW</button>
    </div>
  </div>
);

/* --- 4. INDIVIDUAL PACKS SECTION --- */
const IndividualPacksSection = () => (
  <div className="superman-grid-layout">
    <h1 className="superman-title">INDIVIDUAL CATERING PACKS</h1>
    <div className="superman-media-col">
      <div className="superman-sticky-wrapper">
        <div className="superman-hero-img-wrapper">
          <img src="/INDIVISUAL CATERING.png" alt="Individual Packs" className="superman-hero-img" />
        </div>
        <button className="superman-cta-btn ddnone">ORDER NOW</button>
      </div>
    </div>
    <div className="superman-info-col">
      <div className="superman-live-card">
        <div className="superman-info-box">
          <h2 className="superman-main-price">Starting At $13</h2>
          <small>(Minimum of 25 Orders)</small>
        </div>
        <div className="superman-card">
          <h4>Rice And Beans (Comes With Each Order)</h4>
          <div className="superman-price-row"><span>3 Tacos Combo</span><span className="superman-price">$13</span></div>
          <div className="superman-price-row"><span>Burrito Combo</span><span className="superman-price">$13</span></div>
          <div className="superman-price-row"><span>Torta Combo</span><span className="superman-price">$13</span></div>
        </div>
      </div>
        <button className="superman-cta-btn mnone">ORDER NOW</button>
    </div>
  </div>
);


/* --- 5. SIDES SECTION (With Circular Images & Full Width) --- */
const SidesSection = () => (
  <div className="superman-grid-layout" style={{ display: 'block' }}>
    <h1 className="superman-title">SIDES</h1>

    
    
    <div className="superman-info-col" style={{ maxWidth: '100%' }}>
      <div className="superman-trays-container"> {/* Desktop grid support */}
        
        {/* Rice */}
        <div className="superman-card">
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <img src="/1_tp rice.jpg" alt="Rice" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6d7a52' }} />
            <h3>RICE</h3>
          </div>
          <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$48</span></div>
          <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$96</span></div>
        </div>

        {/* Refried Beans */}
        <div className="superman-card">
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <img src="/beans-circle.png" alt="Refried Beans" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6d7a52' }} />
            <h3>REFRIED BEANS</h3>
          </div>
          <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$48</span></div>
          <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$96</span></div>
        </div>

        {/* Guacamole */}
        <div className="superman-card">
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <img src="/guac-circle.png" alt="Guacamole" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6d7a52' }} />
            <h3>GUACAMOLE</h3>
          </div>
          <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$96</span></div>
          <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$180</span></div>
        </div>

        {/* Chips */}
        <div className="superman-card">
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <img src="/chips-circle.png" alt="Chips" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6d7a52' }} />
            <h3>CHIPS</h3>
          </div>
          <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$18</span></div>
          <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$30</span></div>
        </div>

        {/* Mini Churros */}
        <div className="superman-card">
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <img src="/churros-circle.png" alt="Mini Churros" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6d7a52' }} />
            <h3>MINI CHURROS</h3>
          </div>
          <div className="superman-price-row"><span>Half Tray</span><span className="superman-price">$24</span></div>
          <div className="superman-price-row"><span>Full Tray</span><span className="superman-price">$48</span></div>
        </div>

        {/* Salsa */}
        <div className="superman-card">
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <img src="/salsa-circle.png" alt="Salsa" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6d7a52' }} />
            <h3>SALSA (GREEN/RED)</h3>
          </div>
          <div className="superman-price-row"><span>16oz</span><span className="superman-price">$6</span></div>
        </div>
      </div>

      <button className="superman-cta-btn" style={{ marginTop: '30px', maxWidth: '100%' }}>ORDER NOW</button>
    </div>
  </div>
);
export default CateringMenu;