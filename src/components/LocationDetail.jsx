import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import locationsData from '../pages/locations';
import './LocationDetail.css';

const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getAddressLines = (address) => {
  const parts = address.split(',').map((part) => part.trim()).filter(Boolean);

  if (parts.length <= 3) {
    return parts;
  }

  return [
    parts.slice(0, parts.length - 2).join(', '),
    parts[parts.length - 2],
    parts[parts.length - 1],
  ];
};

const LocationDetail = () => {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const location = useMemo(
    () => locationsData.find((item) => createSlug(item.name) === slug),
    [slug]
  );

  useEffect(() => {
    document.dispatchEvent(new Event('render-event'));
  }, [slug]);

  if (!location) {
    return (
      <div className="location-detail-page not-found">
        <h1>Location Not Found</h1>
        <Link to="/locations">Back to Locations</Link>
      </div>
    );
  }

  const city = location.name;
  const cityName = city.split(',')[0];
  const addressLines = getAddressLines(location.address);
  const seoDescription = `Visit Taco Pros in ${city} for fresh tacos, burritos, Mexican street food, online ordering, and catering. Find address, phone, directions, and store details.`;
  const locationUrl = `https://www.tacopros.com/locations/${slug}`;
  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `Taco Pros - ${city}`,
    url: locationUrl,
    telephone: location.phone,
    address: location.address,
    servesCuisine: 'Mexican',
    hasMap: location.dir,
  };

  const faqs = [
    {
      q: 'What type of food does Taco Pros serve?',
      a: 'Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo plates made fresh daily.',
    },
    {
      q: `Does Taco Pros in ${city} offer catering?`,
      a: `Yes! Catering is available for events and gatherings in ${city}.`,
    },
    {
      q: `Can I order Taco Pros online in ${city}?`,
      a: 'Yes, online ordering is available for pickup and delivery.',
    },
    {
      q: 'What are the most popular items at Taco Pros?',
      a: 'Street tacos, burritos, quesadillas, and combo plates are customer favorites.',
    },
  ];

  return (
    <div className="location-detail-page">
      <Helmet>
        <title>Taco Pros {city} | Mexican Food, Tacos & Online Ordering</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={locationUrl} />
        <meta property="og:title" content={`Taco Pros ${city}`} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content={locationUrl} />
        <script type="application/ld+json">{JSON.stringify(locationSchema)}</script>
      </Helmet>

      <section
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Taco Pros - {city}</h1>
          <p className="subtitle">Authentic Mexican Food in {city}</p>
          <a href={location.orderLink} target="_blank" rel="noreferrer" className="tp-action-button">
            Order Now
          </a>
        </div>
      </section>

      <section className="intro-section">
        <div className="container">
          <p className="intro-text">
            Looking for a Mexican restaurant in {city}? Taco Pros brings bold, authentic Mexican street food to the area,
            serving freshly made tacos, burritos, quesadillas, and more. Whether you're stopping by for a quick bite,
            ordering takeout, or planning a catered event, Taco Pros delivers a fast-casual dining experience rooted in
            traditional Mexican flavors.
          </p>
        </div>
      </section>

      <div className="container content-wrapper">
        <div className="main-grid">
          <div className="location-main-content">
            <section className="info-section">
              <h2>Why Choose Taco Pros in {city}</h2>
              <ul className="info-list">
                <li>Fresh, made-to-order tacos and burritos</li>
                <li>Authentic Mexican street food flavors</li>
                <li>Fast service for dine-in and takeout</li>
                <li>Convenient online ordering</li>
                <li>Catering available for events and gatherings</li>
              </ul>
            </section>

            <section className="info-section">
              <h2>Popular Menu Items</h2>
              <p>Taco Pros is known for classic Mexican favorites made fresh daily:</p>
              <ul className="info-list">
                <li>Street Tacos (Chicken, Steak, Al Pastor)</li>
                <li>Burritos & Burrito Bowls</li>
                <li>Quesadillas</li>
                <li>Taco Dinners & Combo Plates</li>
                <li>Mexican Sides & Add-ons</li>
              </ul>

              <a href={location.orderLink} target="_blank" rel="noreferrer" className="tp-action-button btn-inline">
                Explore Full Menu
              </a>
            </section>

            <section className="info-section">
              <h2>Mexican Catering in {cityName}</h2>
              <p>Planning an event in {cityName}? Taco Pros offers reliable Mexican catering services perfect for:</p>
              <ul className="info-list">
                <li>Corporate events</li>
                <li>Birthday parties</li>
                <li>Family gatherings</li>
                <li>Office lunches</li>
              </ul>

              <a href={location.orderLink} target="_blank" rel="noreferrer" className="tp-action-button btn-inline">
                View Catering Menu
              </a>
            </section>
          </div>

          <aside>
            <div className="location-sidebar">
              <h3 className="sidebar-title">Location Details</h3>

              <div className="detail-item">
                <span className="detail-label">Address</span>
                <p className="address-lines">
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </div>

              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <a href={`tel:${location.phone}`}>{location.phone}</a>
              </div>

              <a href={location.orderLink} target="_blank" rel="noreferrer" className="tp-action-button btn-order-sidebar">
                Order Online
              </a>

              <div className="detail-item">
                <span className="detail-label">Store Hours</span>
                <div className="hours-list">
                  <div>
                    <span>Mon - Fri</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </div>
                  <div>
                    <span>Sat - Sun</span>
                    <span>11:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="map-container">
                <span>Find Us On The Map</span>
                <iframe src={location.mapSrc} title={`${city} map`} loading="lazy"></iframe>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>

          {faqs.map((faq, index) => (
            <div className="faq-item" key={faq.q}>
              <button
                className="faq-trigger"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                type="button"
              >
                <span className="faq-icon" aria-hidden="true">
                  {openFaq === index ? '-' : '+'}
                </span>
                <span>{faq.q}</span>
              </button>

              {openFaq === index && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Explore More Taco Pros Locations</h2>
          <p>Looking for Taco Pros near you? We have locations in Libertyville, Gurnee, Vernon Hills, and more.</p>
          <Link to="/locations" className="tp-action-button btn-cta">
            View All Locations
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LocationDetail;
