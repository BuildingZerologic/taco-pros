import React from 'react';
import './TacoButton.css';

const TacoButton = ({ 
  styleType = 1, 
  text = "VIEW MENU", 
  link = "", 
  styleClass = "",
  width = "100%",   // default now responsive
  height = "60px",
  fontSize = "1.2rem",
  textColor,
  type = "button",
  disabled = false,
  onClick
}) => {
  
  const containerStyle = {
    width,
    height
  };

  const topStyle = {
    width: '100%',
    height: '100%',
    fontSize,
    color: textColor
  };

  const handleClick = (event) => {
    if (disabled) return;

    if (!link || link === "#") return;

    event.preventDefault();
    event.stopPropagation();

    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }

    window.location.href = link;
  };

  return (
    <button 
      type={type}
      className={`taco-btn-container taco-btn-style-${styleType} ${styleClass}`.trim()} 
      style={containerStyle}
      onClick={onClick || handleClick}
      disabled={disabled}
    >
      <div className="taco-btn-shadow"></div>
      <div className="taco-btn-top" style={topStyle}>
        {text}
      </div>
    </button>
  );
};

export default TacoButton;
