import React from 'react';
import './ReelSection.css';

const ReelSection = ({ videoPaths }) => {
  return (
    <section className="reel-container">
      <h3 className="reel-title">FOLLOW US @TACOPROSOFFICIAL</h3>
      
      <div className="reel-grid">
        {videoPaths.map((path, index) => (
          <div 
            key={index} 
            className={`reel-item ${index === 1 ? 'reel-featured' : ''}`}
          >
            <video 
              className="reel-media" 
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src={path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReelSection;