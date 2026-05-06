import React, { useEffect } from 'react';
import "./contact.css";
import { Helmet } from 'react-helmet-async';
import "./hire.css";
import HiringForm from '../components/HiringForm';

function Hiring() {
    useEffect(() => {
        const timer = setTimeout(() => {
            document.dispatchEvent(new Event('render-event'));
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <Helmet>
                <title>Hiring Us | Taco Pros - Fresh Mexican Street Food</title>
                <meta name="description" content="Have questions? Get in touch with Taco Pros. Find our locations in IL, WI, IN, and OH." />
            </Helmet>



            <section className='contact-banner-section'>
                <div className="contact-banner-container">
                    <img
                        src="/tp pg banners 1920x600 careers.jpg"
                        alt="Contact Taco Pros"
                        className="contact-banner-img"
                    />
                    <div className="contact-banner-overlay">
                        <h1>WE ARE HIRING</h1>
                    </div>
                </div>
            </section>


          


          
            <section className='form-mix-wrapper hirew'>
                <h1>JOIN OUR TEAM</h1>
                <p>We Are An Equal Opportunity Employer. <br /> <br />

                    All applicants are considered for all positions without regard to race, color, religion, disability, sex, national origin, age, marital status, veteran or military status, sexual orientation, or any other basis prohibited by state, federal or local law.</p>


                <hr className="divider2" />

                <HiringForm />

            </section>


        </>
    );
}

export default Hiring;
