import React, { useState, useEffect } from 'react';
import { countryCodes } from './countryCodes';
import "./contact.css";
import { Helmet } from 'react-helmet-async';
import TacoButton from '../components/TacoButton';

function Contact() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.dispatchEvent(new Event('render-event'));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    desiredLocation: '',
    message: ''
  });

  const [status, setStatus] = useState(null);

  const locations = [
    "Old Town, IL: 1435 N Wells St, Chicago IL 60610",
    "Carol Stream, IL: 772 W Army Trail Road, Carol Stream IL 60188",
    "Marysville, OH: 15710 US Hwy 36, Marysville, OH 43040",
    "Valparaiso, IN: 2005 Morthland Drive, Valparaiso, IN 46383",
    "Chatham, IL: 1515 E 87th Street, Chicago, IL 60619",
    "Hyde Park, IL: 1400 E 47th Street, Unit E, Chicago, IL 60653",
    "West Milwaukee, WI: 2068 Miller Park Way, Ste B, West Milwaukee, WI 53219",
    "Edgewater, IL: 5310 N Broadway, Chicago, IL 60640",
    "North Ave, IL: 6427 W North Ave, Oak Park, IL 60302",
    "Glen Ellyn, IL: 850 Roosevelt Rd, Glen Ellyn, IL 60137",
    "Milwaukee, WI: 242 East Capitol Drive, Milwaukee, WI 53212",
    "Franklin, WI: 7730 S Lovers Lane Road, Franklin, WI 53132",
    "Milwaukee, WI (Wells St): 1400 W Wells St, Milwaukee, WI 53233",
    "Cicero, IL: 3800 S Cicero Ave, Cicero, IL 60804",
    "Dyer, IN: 1078-80 Joliet Street, Dyer, IN 46311",
    "Green Oaks, IL: 14010 W Rockland Rd, Green Oaks, IL – 60044",
    "Naperville, IL: 2860 Showplace Dr, STE 114, Naperville, IL 60564",
    "79th and Cicero, IL: 7959 S Cicero Ave, Chicago, IL 60652",
    "Mequon, WI: 10942 N. Port Washington Rd, Mequon, WI 53092",
    "Franklin Park, IL: 2830 Mannheim Rd, Franklin Park, IL 60131",
    "Merrillville, IN: 8160 Mississippi Street, Merrillville, IN 46410",
    "71st and Western, IL: 7108 Western Ave, Chicago, IL 60636",
    "W Montrose Ave, IL: 4126 W Montrose Ave, Chicago, IL 60641",
    "Niles, IL: 7870 N Milwaukee Ave, Niles, IL 60714",
    "Gurnee, IL: 6681 Grand Ave, Unit A-1, Gurnee, IL 60031",
    "Pulaski/Belmont, IL: 3029 N Pulaski Rd, Chicago, IL 60641",
    "Diversey/Austin, IL: 5959 W Diversey Ave, Chicago, IL 60639",
    "Taylor/Ogden, IL: 2200 W Taylor St, Chicago, IL 60612",
    "Damen/Chicago, IL: 1959 W Chicago Ave, Chicago, IL 60622",
    "Halsted/Chicago, IL: 833 W Chicago Ave, Chicago, IL 60642",
    "Oak Park, IL: 2 Chicago Ave, Oak Park, IL 60302"
  ];

  const handleChange = (e) => {
    if (status === "missing_fields") setStatus(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, desiredLocation, message } = formData;
    if (!firstName || !lastName || !email || !phone || !desiredLocation || !message) {
      setStatus("missing_fields");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/contactapi.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ firstName: '', lastName: '', email: '', countryCode: '+1', phone: '', desiredLocation: '', message: '' });
      } else {
        throw new Error(result.message || "Server Error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Taco Pros - Fresh Mexican Street Food</title>
        <meta name="description" content="Have questions? Get in touch with Taco Pros. Find our locations in IL, WI, IN, and OH." />
      </Helmet>
      <section className='contact-banner-section'>
        <div className="contact-banner-container">
          <img
            src="/tp contact op.jpg"
            alt="Contact Taco Pros"
            className="contact-banner-img"
          />
        </div>
      </section>

      <div className="Heading-main">
        <h1>CONTACT US</h1>
      </div>



      
      <section className='form-mix-wrapper'>
        <div className='form-mix-container'>
          <form onSubmit={handleSubmit} className="form-mix-body">
            <div className="form-mix-group">
              <label>First Name <span className="required-star">*</span></label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-mix-group">
              <label>Last Name <span className="required-star">*</span></label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-mix-group">
              <label>Email <span className="required-star">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-mix-group">
              <label>Phone Number <span className="required-star">*</span></label>
              <div className="form-mix-phone-row">
                <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="form-mix-select-code">
                  {countryCodes.map((c, idx) => (
                    <option key={idx} value={c.code}>{c.code}</option>
                  ))}
                </select>
                <input type="tel" name="phone" placeholder="123-456-7890" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-mix-group">
              <label>Contact Location <span className="required-star">*</span></label>
              <select name="desiredLocation" value={formData.desiredLocation} onChange={handleChange} required>
                <option value="">Select a location</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="form-mix-group">
              <label>Message <span className="required-star">*</span></label>
              <textarea name="message" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} required></textarea>
            </div>
            {status === "missing_fields" && <p className="form-mix-error">Please fill in all required fields.</p>}
            {status === "success" && <p className="form-mix-success">Message sent successfully!</p>}
            {status === "error" && <p className="form-mix-error">Something went wrong. Please try again.</p>}
            <TacoButton
              type="submit"
              text={status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              width="100%"
              height="clamp(51px, 5vw, 57px)"
              fontSize="clamp(16px, 2vw, 22px)"
              styleType="2"
              styleClass="taco-btn-form-green contact-submit-button"
              disabled={status === "loading"}
            />
          </form>
        </div>
      </section>

    
      <section className="form-reach-wrapper">
        <div className="form-reach-container">
          <h2 className="form-reach-heading">OTHER WAYS TO REACH US</h2>

          <div className="form-reach-card ">
            <h3 className="form-reach-subheading">EMAIL US</h3>
            <div className="form-reach-white-box vvv">
              <p className="form-reach-label">GENERAL INQUIRIES</p>
              <a href="mailto:contact@tacopros.com" className="form-reach-link">contact@tacopros.com</a>
            </div>
          </div>

          <div className="form-reach-card">
            <h3 className="form-reach-subheading">FOLLOW US</h3>
            <div className="form-reach-white-box social-box">
              <a href='https://www.facebook.com/thetacopros'>
                <div className="social-item">
                  <img src="/Facebook.svg" alt="Instagram" />

                  <p>Facebook</p>
                </div>
              </a>

              <a href='https://www.instagram.com/taco_pros/'>
                <div className="social-item">
                  <img src="/Instagram.svg" alt="Instagram" />

                  <p>Instagram</p>
                </div>
              </a>


            </div>
          </div>
        </div>
      </section>
      <div className="mySpace"></div>
    </>
  );
}

export default Contact;
