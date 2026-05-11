import React from 'react';
import './MexSection.css';

const Culture = () => {
  return (
    <section className="mex-section" >
      <div className="mex-row" style={{flexDirection : 'row-reverse'}}>
        {/* Left Column: Image */}
        <div className="mex-col-left">
          <img 
            src="/culture.jpg" 
            alt="Delicious Nachos" 
            className="mex-image" 
          />
        </div>

        {/* Right Column: Content */}
        <div className="mex-col-right" style={{background : "#838b7d"}}>
          <div className="mex-content">
            <h2 className="mex-heading">
              Cusine crafted <br/> by Culture
            </h2>
            <p className="mex-body">
             Inspired by the gastronomic art of Mexico, Taco
Pros aims to transport you to the flavors of
Mexican Tianguis (market) street foods. We take
pride in investing in quality ingredients to
ensure our customers get the great taste we’re
famous for, because our vision is to present the
purest flavors of Mexico.
            </p>
            <button
              className="mex-button"
              style={{background : "#6a724a"}}
              onClick={() => window.open('https://tacopros.toast.site/', '_blank', 'noopener,noreferrer')}
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
