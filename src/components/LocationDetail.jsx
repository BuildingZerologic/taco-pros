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
    () => locationsData.find((item) => item.slug === slug || createSlug(item.name) === slug),
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

  const content = location.pageContent;
  const meta = location.meta;
  const city = location.name;
  const addressLines = getAddressLines(location.address);
  const faqs = content.faqs;
  const menuUrl = 'https://tacopros.com/menu/';
  const cateringUrl = 'https://tacopros.com/catering-menu/';

  return (
    <div className="location-detail-page">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:url" content={meta.ogUrl} />
        <script type="application/ld+json">{JSON.stringify(location.schema)}</script>
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
          <h1>{content.h1}</h1>
          <p className="subtitle">{content.introTitle}</p>
          <a href={location.orderLink} target="_blank" rel="noreferrer" className="tp-action-button">
            Order Now
          </a>
        </div>
      </section>

      <section className="intro-section">
        <div className="container">
          <p className="intro-text">
            {content.introText}
          </p>
        </div>
      </section>

      <div className="container content-wrapper">
        <div className="main-grid">
          <div className="location-main-content">
            <section className="info-section">
              <h2>{content.whyTitle}</h2>
              <ul className="info-list">
                {content.whyItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section className="info-section">
              <h2>{content.menuTitle}</h2>
              <ul className="info-list">
                {content.menuItems.map((item) => <li key={item}>{item}</li>)}
              </ul>

              <a href={menuUrl} className="tp-action-button btn-inline">
                View Full Menu
              </a>
            </section>

            <section className="info-section">
              <h2>{content.cateringTitle}</h2>
              <p>{content.cateringText}</p>
              <ul className="info-list">
                {content.cateringItems.map((item) => <li key={item}>{item}</li>)}
              </ul>

              <a href={cateringUrl} className="tp-action-button btn-inline">
                Explore Catering Menu
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
                <a href={`tel:${location.phoneE164}`}>{location.displayPhone || location.phone}</a>
              </div>

              <a href={location.orderLink} target="_blank" rel="noreferrer" className="tp-action-button btn-order-sidebar">
                Order Online
              </a>

              <div className="detail-item">
                <span className="detail-label">Store Hours</span>
                <div className="hours-list">
                  {content.hours.map((item) => (
                    <div key={item.label}>
                      <span>{item.label}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
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
          <p>Looking for Taco Pros near you? Browse every Taco Pros location and find fresh Mexican food nearby.</p>
          <Link to="/locations" className="tp-action-button btn-cta">
            View All Locations
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LocationDetail;
