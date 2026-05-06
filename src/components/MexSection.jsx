import React from 'react';
import './MexSection.css';

const MexSection = () => {
  return (
    <section className="mex-section">
      <div className="mex-row">
        {/* Left Column: Image */}
        <div className="mex-col-left">
          <img
            src="/authenticate.jpg"
            alt="Delicious Nachos"
            className="mex-image"
          />
        </div>

        {/* Right Column: Content */}
        <div className="mex-col-right">
          <div className="mex-content">
            <h2 className="mex-heading">
              AN AUTHENTIC <br /> MEX-PERIENCE!
            </h2>
            <p className="mex-body">
              The pros cook with straight‑up mercado energy — loud, smoky, real. Comal‑born smoke, sunrise‑built flavor, pure mercado sabor with zero polish and all corazón." Heading remains the same.
            </p>
            <button className="mex-button">
              RECOMMENDATIONS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MexSection;