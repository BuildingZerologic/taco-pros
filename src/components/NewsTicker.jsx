import React from 'react';
import './NewsTicker.css';

const NewsTicker = () => {
  const newsItems = [
    "DEAL OF THE DAY: GET 1+1 ON TACOS*",
    "20% OFF ON CATERING",
    "COMBOS STARTING @ $12.99"
  ];

  // Repeat items multiple times for large screens
  const repeatedItems = [...newsItems, ...newsItems, ...newsItems, ...newsItems];

  return (
    <div className="news-container" role="region" aria-label="Latest offers">
      <div className="news-scroll-wrapper">
        <div className="news-track">
          {repeatedItems.map((item, index) => (
            <span key={index} className="news-item">
              {item}
              <span className="news-divider">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;