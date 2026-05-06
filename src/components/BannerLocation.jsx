import React from 'react';
import './BannerLocation.css';
import TacoButton from './TacoButton';

const BannerLocation = () => {
  return (
    <section className="banner-location">
      <div className="billboard-container">
        {/* Content Overlay */}
        <div className="billboard-content">
          <h1 className="location-number">36</h1>
          <h2 className="location-text">
            Locations <br /> & Growing
          </h2>
        

          <TacoButton text=" Find a TacoPros"
            width="clamp(155px, 22vw, 302px)"
            height="clamp(51px, 5vw, 57px)" 
             styleType = "1"
             fontSize="clamp(18px, 2vw, 24px)"
             link="/locations"
            />

            
        </div>

        <div className="billboard-content-d">

          <div className="sjdhik">

            <h1 className="location-number">36</h1>
            <h2 className="location-text2">
              Locations 
            </h2>
         
          </div>

          <span className='mskdj'>
              & Growing...
          </span>

          <a href="/locations" className="find-button2">
           <TacoButton text=" Find a TacoPros"
            width="clamp(155px, 22vw, 302px)"
            height="clamp(51px, 5vw, 57px)" 
             styleType = "1"
             fontSize="clamp(18px, 2vw, 24px)"
             link="/locations"
            />
          </a>

             
        </div>
      </div>
    </section>
  );
};

export default BannerLocation;
