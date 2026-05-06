import React from 'react';
import './Locations.css';

const Locations = () => {
  return (
    <section className="cats-container">
      <div className="cat-wrapper">
        <h1 className="cats-title">LOCATIONS</h1>
        
        <div className="cat-list">
          <div className="cat-item">
            <span className="cat-location-text">HALSTED/CHICAGO, IL</span>
            <hr className="cat-divider" />
          </div>
          {/* Add more cat-items here as needed */}
        </div>
      </div>
    </section>
  );
};

export default Locations;