import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './LocationCards.css';
import { useNavigate } from 'react-router-dom';

// Added 'country' property to each object so the filter works correctly

const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const locationsData = [
  {
    name: "Huntley, IL",
    address: "12902 IL-47, Huntley, IL 60142",
    phone: "(847) 802-4358",
    orderLink: "https://order.toasttab.com/online/taco-pros-huntley-il-wqcmd",
    country: "US",
    dir: "https://maps.app.goo.gl/hL1UH4b4HyubozSu9",
    mapSrc: "https://maps.google.com/maps?q=12902+IL-47+Huntley+IL+60142&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Rogers Park, IL",
    address: "2321 W Howard Street, Chicago IL 60645",
    phone: "(847) 905-0241",
    orderLink: "https://order.toasttab.com/online/taco-pros-howard-il",
    country: "US",
    dir: "https://maps.app.goo.gl/YzeqqGWzjV7wQxY99",
    mapSrc: "https://maps.google.com/maps?q=2321+W+Howard+Street+Chicago+IL+60645&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Elburn, IL",
    address: "780 N Main St., Elburn, IL 60119",
    phone: "(630) 206-3956",
    orderLink: "https://order.toasttab.com/online/taco-pros-elburn-il",
    country: "US",
    dir: "https://maps.app.goo.gl/q4Au98NWRAjzJtgx8",
    mapSrc: "https://maps.google.com/maps?q=780+N+Main+St+Elburn+IL+60119&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Suwanee, GA",
    address: "3155 Peachtree Parkway, Suite 170, Suwanee Georgia 30024",
    phone: "(470) 239-3255",
    orderLink: "https://order.toasttab.com/online/taco-pros-suwanee-ga",
    country: "US",
    dir: "https://maps.app.goo.gl/dAM7EFG16uBcHpcE9",
    mapSrc: "https://maps.google.com/maps?q=3155+Peachtree+Parkway+Suwanee+GA+30024&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Tinley Park, IL",
    address: "15943 S Harlem Ave Unit B, Tinley Park, IL 60477",
    phone: "(708) 904-4691",
    orderLink: "https://order.toasttab.com/online/taco-pros-tinley-park",
    country: "US",
    dir: "https://maps.app.goo.gl/b3HRHH8Pe47wyoTh8",
    mapSrc: "https://maps.google.com/maps?q=15943+S+Harlem+Ave+Tinley+Park+IL+60477&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Old Town, IL",
    address: "1435 N Wells St, Chicago IL 60610",
    phone: "(312) 248-8116",
    orderLink: "https://order.toasttab.com/online/taco-pros-old-town",
    country: "US",
    dir: "https://maps.app.goo.gl/tYmrq1nRyhChkH74A",
    mapSrc: "https://maps.google.com/maps?q=1435+N+Wells+St+Chicago+IL+60610&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Carol Stream, IL",
    address: "772 W Army Trail Road, Carol Stream IL 60188",
    phone: "(630) 855-6562",
    orderLink: "https://order.toasttab.com/online/taco-pros-carol-stream",
    country: "US",
    dir: "https://maps.app.goo.gl/abEqLcSMuJA6xoWK6",
    mapSrc: "https://maps.google.com/maps?q=772+W+Army+Trail+Road+Carol+Stream+IL+60188&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Marysville, OH",
    address: "15710 US Hwy 36, Marysville, OH 43040",
    phone: "(937) 553-9097",
    orderLink: "https://order.toasttab.com/online/taco-pros-marysville-oh",
    country: "US",
    dir: "https://maps.app.goo.gl/BF9DA2DpmjpB5eSZA",
    mapSrc: "https://maps.google.com/maps?q=15710+US+Hwy+36+Marysville+OH+43040&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Valparaiso, IN",
    address: "2005 Morthland Drive, Valparaiso, IN 46383",
    phone: "(219)242-8055",
    orderLink: "https://www.toasttab.com/taco-pros-valparaiso-in",
    country: "US",
    dir: "https://maps.app.goo.gl/UrNUDUhiXwudo1gb8",
    mapSrc: "https://maps.google.com/maps?q=2005+Morthland+Drive+Valparaiso+IN+46383&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "87 and Stoney (Chatham)",
    address: "1515 E 87th Street, Chicago, IL 60619",
    phone: "773-437-3735",
    orderLink: "https://www.toasttab.com/taco-pros-87-and-stoney",
    country: "US",
    dir: "https://maps.app.goo.gl/1fbGodf1XJxpDFzA8",
    mapSrc: "https://maps.google.com/maps?q=1515+E+87th+Street+Chicago+IL+60619&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Hyde Park, IL",
    address: "1400 E 47th Street, Unit E, Chicago, IL 60653",
    phone: "872-731-2101",
    orderLink: "https://www.toasttab.com/taco-pros-chicago-hyde-park",
    country: "US",
    dir: "https://maps.app.goo.gl/DiSLB9YSnZauGjQP7",
    mapSrc: "https://maps.google.com/maps?q=1400+E+47th+Street+Chicago+IL+60653&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "West Milwaukee, WI",
    address: "2068 Miller Park Way, Ste B, West Milwaukee, WI 53219",
    phone: "414-210-4034",
    orderLink: "https://order.toasttab.com/online/taco-pros-west-milwaukee",
    country: "US",
    dir: "https://maps.app.goo.gl/X9FtYSe8HetUeQXC6",
    mapSrc: "https://maps.google.com/maps?q=2068+Miller+Park+Way+West+Milwaukee+WI+53219&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Edgewater, IL",
    address: "5310 N Broadway, Chicago, IL 60640",
    phone: "(224) 814-0200",
    orderLink: "https://www.toasttab.com/taco-pros-edgewater",
    country: "US",
    dir: "https://maps.app.goo.gl/XYhpLutpHHgGu8oRA",
    mapSrc: "https://maps.google.com/maps?q=5310+N+Broadway+Chicago+IL+60640&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "North Ave, IL",
    address: "6427 W North Ave, Oak Park, IL 60302",
    phone: "(708) 665-3172",
    orderLink: "https://www.toasttab.com/taco-pros-north-ave",
    country: "US",
    dir: "https://maps.app.goo.gl/39ysohXxPjpnamYp9",
    mapSrc: "https://maps.google.com/maps?q=6427+W+North+Ave+Oak+Park+IL+60302&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Glen Ellyn, IL",
    address: "850 Roosevelt Rd, Glen Ellyn, IL 60137",
    phone: "262-344-3312",
    orderLink: "https://www.toasttab.com/taco-pros-glen-ellyn",
    country: "US",
    dir: "https://maps.app.goo.gl/smt49riuy3DhP8iw6",
    mapSrc: "https://maps.google.com/maps?q=850+Roosevelt+Rd+Glen+Ellyn+IL+60137&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Milwaukee (Capitol Dr), WI",
    address: "242 East Capitol Drive, Milwaukee, WI 53212",
    phone: "(414)-269-8317",
    orderLink: "https://www.toasttab.com/taco-pros-milwaukee",
    country: "US",
    dir: "https://maps.app.goo.gl/kKuq2gci7PL7Xspg9",
    mapSrc: "https://maps.google.com/maps?q=242+East+Capitol+Drive+Milwaukee+WI+53212&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Franklin, WI",
    address: "7730 S Lovers Lane Road, Franklin, WI 53132",
    phone: "(414)-235-3117",
    orderLink: "https://www.toasttab.com/taco-pros-franklin-wi",
    country: "US",
    dir: "https://maps.app.goo.gl/MXXk9hM5GtoithMb6",
    mapSrc: "https://maps.google.com/maps?q=7730+S+Lovers+Lane+Road+Franklin+WI+53132&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Milwaukee (Wells St), WI",
    address: "1400 W Wells St, Milwaukee, WI 53233",
    phone: "(414)-249-3197",
    orderLink: "https://www.toasttab.com/taco-pros-wells-st",
    country: "US",
    dir: "https://maps.app.goo.gl/D7cmZw2EoNUn7bJz9",
    mapSrc: "https://maps.google.com/maps?q=1400+W+Wells+St+Milwaukee+WI+53233&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Cicero, IL",
    address: "3800 S Cicero Ave, Cicero, IL 60804",
    phone: "(708)-943-6087",
    orderLink: "https://www.toasttab.com/taco-pros-cicero-il",
    country: "US",
    dir: "https://maps.app.goo.gl/gpsBiMP5PBG1W4CM8",
    mapSrc: "https://maps.google.com/maps?q=3800+S+Cicero+Ave+Cicero+IL+60804&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Dyer, IN",
    address: "1078-80 Joliet Street, Dyer, IN 46311",
    phone: "(219)-515-6953",
    orderLink: "https://www.toasttab.com/taco-pros-dyer-indiana",
    country: "US",
    dir: "https://maps.app.goo.gl/Tr29pyKdoA1TRmfB7",
    mapSrc: "https://maps.google.com/maps?q=1078+Joliet+Street+Dyer+IN+46311&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Green Oaks, IL",
    address: "14010 W Rockland Rd, Green Oaks, IL 60044",
    phone: "+1 (224) 842-1260",
    orderLink: "https://www.toasttab.com/taco-pros-libertyville-il",
    country: "US",
    dir: "https://maps.app.goo.gl/kYGSmz3hm4CXRBjb7",
    mapSrc: "https://maps.google.com/maps?q=14010+W+Rockland+Rd+Green+Oaks+IL+60044&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Naperville, IL",
    address: "2860 Showplace Dr, STE 114, Naperville, IL 60564",
    phone: "(331) 226-2186",
    orderLink: "https://www.toasttab.com/taco-pros-naperville-2860-showplace-drive-suite-114",
    country: "US",
    dir: "https://maps.app.goo.gl/2qVcM37ni1c3atu66",
    mapSrc: "https://maps.google.com/maps?q=2860+Showplace+Dr+Naperville+IL+60564&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "79th and Cicero, IL",
    address: "7959 S Cicero Ave, Chicago, IL 60652",
    phone: "(773)-912-6389",
    orderLink: "https://www.toasttab.com/taco-pros-79-and-cicero",
    country: "US",
    dir: "https://maps.app.goo.gl/sD3fH9Non1SBbEg97",
    mapSrc: "https://maps.google.com/maps?q=7959+S+Cicero+Ave+Chicago+IL+60652&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Mequon, WI",
    address: "10942 N. Port Washington Rd, Mequon, WI 53092",
    phone: "(262)-643-4003",
    orderLink: "https://www.toasttab.com/taco-pros-wisconsin-tbd",
    country: "US",
    dir: "https://maps.app.goo.gl/nGCSSxyHhbkbHrpy5",
    mapSrc: "https://maps.google.com/maps?q=10942+N+Port+Washington+Rd+Mequon+WI+53092&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Franklin Park, IL",
    address: "2830 Mannheim Rd, Franklin Park, IL 60131",
    phone: "(773)-377-6531",
    orderLink: "https://www.toasttab.com/taco-pros",
    country: "US",
    dir: "https://maps.app.goo.gl/z39SioLWgMky8zVV7",
    mapSrc: "https://maps.google.com/maps?q=2830+Mannheim+Rd+Franklin+Park+IL+60131&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Merrillville, IN",
    address: "8160 Mississippi Street, Merrillville, IN 46410",
    phone: "(219)-472-8193",
    orderLink: "https://www.toasttab.com/taco-pros-merrillville-8160-mississippi-street",
    country: "US",
    dir: "https://maps.app.goo.gl/96e1uKeQsqnXBw457",
    mapSrc: "https://maps.google.com/maps?q=8160+Mississippi+Street+Merrillville+IN+46410&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "71st and Western, IL",
    address: "7108 Western Ave, Chicago, IL 60636",
    phone: "(872)-267-7178",
    orderLink: "https://www.toasttab.com/taco-pros-71st-and-western-7108-south-western-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/xKYCaqQA9DmczYeV9",
    mapSrc: "https://maps.google.com/maps?q=7108+Western+Ave+Chicago+IL+60636&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "W Montrose Ave, IL",
    address: "4126 W Montrose Ave, Chicago, IL 60641",
    phone: "(773) 930-3815",
    orderLink: "https://www.toasttab.com/taco-pros-montrose-st-il-montrose-street",
    country: "US",
    dir: "https://maps.app.goo.gl/EbsaaZ9cEP7pJH4w5",
    mapSrc: "https://maps.google.com/maps?q=4126+W+Montrose+Ave+Chicago+IL+60641&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Niles, IL",
    address: "7870 N Milwaukee Ave, Niles, IL 60714",
    phone: "(847) 230-0050",
    orderLink: "https://www.toasttab.com/taco-pros-niles-7870-north-milwaukee-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/5fqwMRCrKWJz5hnn9",
    mapSrc: "https://maps.google.com/maps?q=7870+N+Milwaukee+Ave+Niles+IL+60714&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Gurnee, IL",
    address: "6681 Grand Ave, Unit A-1, Gurnee, IL 60031",
    phone: "(224) 656-5607",
    orderLink: "https://www.toasttab.com/taco-pros-gurnee-il-tbd",
    country: "US",
    dir: "https://maps.app.goo.gl/7FCo9VZfM7p9ZWet8",
    mapSrc: "https://maps.google.com/maps?q=6681+Grand+Ave+Gurnee+IL+60031&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Pulaski/Belmont, IL",
    address: "3029 N Pulaski Rd, Chicago, IL 60641",
    phone: "(773) 853-0559",
    orderLink: "https://www.toasttab.com/taco-pros-berry-plaza-il-tbd",
    country: "US",
    dir: "https://maps.app.goo.gl/ZYojdpG4skLUrvPH6",
    mapSrc: "https://maps.google.com/maps?q=3029+N+Pulaski+Rd+Chicago+IL+60641&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Diversey/Austin, IL",
    address: "5959 W Diversey Ave, Chicago, IL 60639",
    phone: "(773) 377-6402",
    orderLink: "https://www.toasttab.com/taco-pros-austin-diversey-5959-west-diversey-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/8ea2WJnutwtqCxWj8",
    mapSrc: "https://maps.google.com/maps?q=5959+W+Diversey+Ave+Chicago+IL+60639&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Taylor/Ogden, IL",
    address: "2200 W Taylor St, Chicago, IL 60612",
    phone: "(312) 877-5600",
    orderLink: "https://www.toasttab.com/taco-pros-chicago-taylor-2200-west-taylor-street",
    country: "US",
    dir: "https://maps.app.goo.gl/NFwCzdsnmTmGMZtB9",
    mapSrc: "https://maps.google.com/maps?q=2200+W+Taylor+St+Chicago+IL+60612&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Damen/Chicago, IL",
    address: "1959 W Chicago Ave, Chicago, IL 60622",
    phone: "(312) 666-5941",
    orderLink: "https://order.online/store/taco-pros-chicago-29531102/",
    country: "US",
    dir: "https://maps.app.goo.gl/wihEBnC65SnSkv6C6",
    mapSrc: "https://maps.google.com/maps?q=1959+W+Chicago+Ave+Chicago+IL+60622&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Halsted/Chicago, IL",
    address: "833 W Chicago Ave, Chicago, IL 60642",
    phone: "(312) 285-2992",
    orderLink: "https://www.toasttab.com/taco-pros-chicago-halsted-833-west-chicago-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/cku8ukw7FeUDPWuU9",
    mapSrc: "https://maps.google.com/maps?q=833+W+Chicago+Ave+Chicago+IL+60642&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Oak Park, IL",
    address: "2 Chicago Ave, Oak Park, IL 60302",
    phone: "(708) 613-5384",
    orderLink: "https://www.toasttab.com/taco-pros-oak-park-2-chicago-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/yCc34E7Kj5ym6jkt9",
    mapSrc: "https://maps.google.com/maps?q=2+Chicago+Ave+Oak+Park+IL+60302&t=&z=15&ie=UTF8&iwloc=&output=embed"
  }
];

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
    navigate(`/locations/${createSlug(loc.name)}/`);
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
              filteredLocations.map((loc, index) => (
                <div key={index} className="card2">
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
                    <p className="address2">{loc.phone}</p>
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
