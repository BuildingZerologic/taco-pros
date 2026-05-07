import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './LocationCards.css';
import { useNavigate } from 'react-router-dom';
import locationsData from './locations';

function Location() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCountry] = useState('US');
  const navigate = useNavigate();

  const filteredLocations = locationsData.filter((loc) => {
    const searchTerm = searchQuery.toLowerCase();
    const locCountry = loc.country || 'US';
    const matchesCountry = locCountry === activeCountry;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm) ||
      loc.address.toLowerCase().includes(searchTerm);

    return matchesCountry && matchesSearch;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      document.dispatchEvent(new Event('render-event'));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (loc) => {
    navigate(`/locations/${loc.slug}/`);
  };

  return (
    <>
      <Helmet>
        <title>Find Tacopros Near Me | Taco & Mexican Food Locations</title>
        <meta
          name="description"
          content="Find your nearest Tacopros locations. Authentic tacos and Mexican street food near you in the US, Canada, and UK."
        />
      </Helmet>

      <section className="mn-svh">
        <div className="container py-4" id="location">
          <h2 className="text-center m-2 bcjj">Find Your Tacopros Location</h2>

          <div className="row justify-content-center mb-2">
            <div className="col-md-6">
              <div className="input-group search-container">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Search by city or zip in ${activeCountry}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <p className="text-muted small mt-2 njj">
                Showing {filteredLocations.length} locations in {activeCountry}
              </p>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-4">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <div key={loc.slug} className="card2">
                  <div className="one">
                    <iframe
                      src={loc.mapSrc}
                      width="100%"
                      height="219"
                      title={loc.name}
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="two" onClick={() => handleCardClick(loc)}>
                    <h1 className="heading">{loc.name}</h1>
                    <p className="address2">{loc.address}</p>
                    <p className="address2">{loc.displayPhone || loc.phone}</p>
                    <div className="actions2">
                      <a
                        href={loc.dir}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn2 primary2"
                      >
                        <span className="nbhh">Directions</span>
                      </a>
                      <a href={loc.orderLink} target="_blank" rel="noreferrer" className="btn2 btn-3">
                        <span className="nbh">Order Online</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5 no-results">
                <h3>No locations found in {activeCountry}</h3>
                <p>Try searching for a different city or clearing the search.</p>
                <button className="btn btn-link" onClick={() => setSearchQuery('')}>
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Location;
