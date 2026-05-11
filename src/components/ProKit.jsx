import React from 'react';
import './MexSection.css';

const MexSection = () => {
    return (
        <section className="mex-section">
            <div className="mex-row">
                {/* Left Column: Image */}
                <div className="mex-col-left">
                    <img
                        src="/prokit.jpg"
                        alt="Delicious Nachos"
                        className="mex-image"
                    />
                </div>

                {/* Right Column: Content */}
                <div className="mex-col-right">
                    <div className="mex-content">
                        <h2 className="cfx-mex-heading">
                            INTRODUCING <br />
                            THE PRO-KIT <span className="cfx-trademark">TM</span>
                        </h2>
                        <p className="mex-body">
                            The pros have created the ultimate DIY
                            party kit, jam-packed with flavor and variety like never seen before. <br/><br/>
                            Everything you need for your fiest, all in
                            one beautiful kit.
                        </p>
                        <button className="mex-button" onClick={() => window.open('https://tacopros.toast.site/', '_blank', 'noopener,noreferrer')}>
                            ORDER NOW
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MexSection;
