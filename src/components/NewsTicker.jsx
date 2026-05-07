import React from 'react';
import './NewsTicker.css';

const NewsTicker = () => {
  const newsItems = [
    "Taco Tuesday – 2 for $4.99",
    " Lunch Special – 2 Tacos and a Drink $7.99",
    "Bigger Better Pro Burritos – Starting at $10"
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