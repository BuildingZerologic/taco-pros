import './CookingSection.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';
import TacoButton from '../components/TacoButton';

const News = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Menu SEO Tags injected - Dispatching render-event");
      document.dispatchEvent(new Event('render-event'));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  const cards = [
    {
      title: "Taco Trends Guide | What's Hot Right Now",
      date: "13th - 15th March",
      link: "/blog/taco-trends-guide",
      description: "Discover the latest taco trends, from birria tacos and quesabirria to plant-based ideas and global fusion flavors redefining the taco scene.",
      image: "b1.png"
    },
    {
      title: "Taco Pairing Guide | Sips & Sides",
      date: "13th - 15th March",
      link: "/blog/taco-pairing-guide",
      description: "Explore perfect pairings for your tacos, including margaritas, aguas frescas, street-style corn, and house-made salsas that elevate every bite.",
      image: "b1.jpg"
    },
    {
      title: "Taco Craft Guide | From Grill to Plate",
      date: "13th - 15th March",
      link: "/blog/taco-craft-guide",
      description: "Get an inside look at how your favorite tacos come together, from fresh tortillas to bold marinades and balanced toppings.",
      image: "b3.jpg"
    },
  ];

  return (

    <>

      <Helmet>
        <title>News & Taco Guides | Taco Pros
        </title>
        <meta
          name="description"
          content="Read Taco Pros news, taco guides, food trends, pairing ideas and behind-the-scenes stories from our fresh Mexican food menu."
        />
      </Helmet>




      <section className="cx-container">
        <header className="cx-header">
          <h1 className="cx-main-title">
            Just One Story More
          </h1>
          <p className="cx-subtitle">Lights. Camera. Masala full of backstories behind what you eat</p>
        </header>

        <div className='tab-spacing'>
          <div className="cx-grid">
            {cards.map((card, index) => (
              <div key={index} className="cx-card">
                <div className="cx-image-wrapper">
                  {card.image ? (
                    <img src={card.image} alt={card.title} className="cx-image" />
                  ) : (
                    <div className="cx-placeholder"></div>
                  )}
                </div>
                <div className="cx-content">
                  <h2 className="cx-card-title">{card.title}</h2>
                  <p className="cx-description">
                    {card.description.length > 110
                      ? `${card.description.substring(0, 110)}...`
                      : card.description}
                  </p>
                  <TacoButton
                    text="Find out more"
                    width="168px"
                    height="48px"
                    styleType="1"
                    styleClass="cx-link"
                    fontSize="18px"
                    onClick={() => navigate(card.link)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>


  );
};

export default News;
