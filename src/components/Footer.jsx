import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div>
          <div className='wave'>
        <div className='cactus-wrap'>
          <div className='c-left'>
            <img src='/cactus2.svg' alt='cactus2img' className='cactus2' />
            <img src='/cactus3.svg' alt='cactus3img' className='cactus3' />

          </div>

          <div className='c-middel'>
            <img src='/cactus4.svg' alt='cactus4img' className='cactus4' />
          </div>

          <div className='c-right'>
            <img src='/cactus1.svg' alt='cactus1img' className='cactus1' />
          </div>
     

        </div>
        <div class="pattern-bg"></div>
        <div class="pattern-bg-layer1">
          <img src='/cactus5.svg' alt='cactus5img' className='cactus5' />
        </div>
        <div class="pattern-bg-layer2"></div>

        <div class="pattern-bg-layer2_2"></div>
        <div class="pattern-bg-layer4"></div>




      </div>
      <footer className="footer_wrap footer_default scheme_dark">
        <div className="footer_logo_wrap">
          <div className="footer_logo_inner">
            <Link to="/">
              <img
                src="/logo.png"
                className="logo_footer_image"
                alt="logo"
                width="130"
                height="161"
              />
            </Link>
          </div>
        </div>

        <div className="footer_socials_wrap socials_wrap">
          <div className="footer_socials_inner">
           
            <span className="social_item">
              <a href="https://www.facebook.com/thetacopros/" target="_blank" rel="noopener noreferrer" className="social_icons">
                <i className="fab fa-facebook-f"></i>
              </a>
            </span>
            <span className="social_item">
              <a href="https://www.instagram.com/taco_pros/ " target="_blank" rel="noopener noreferrer" className="social_icons">
                <i className="fab fa-instagram"></i>
              </a>
            </span>
          </div>
        </div>

        <div className="footer_menu_wrap">
          <div className="footer_menu_inner">
            <div className="content_wrap">
              <nav className="menu_footer_nav_area">
                <ul className="sc_layouts_menu_nav menu_footer_nav inited sf-js-enabled sf-arrows">
                  <li className="menu-item ">
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/our-story">
                      <span>Our story</span>
                    </Link>
                  </li>
                   
                     <li className="menu-item">
                    <Link to="/menu">
                      <span>Menu</span>
                    </Link>
                  </li>

                   <li className="menu-item">
                    <Link to="/catering">
                      <span>Catering Menu</span>
                    </Link>
                  </li>

                   <li className="menu-item">
                    <Link to="/rewards">
                      <span>Rewards</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/hiring">
                      <span>Hiring</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/franchising">
                      <span>Franchising</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/locations">
                      <span>Location</span>
                    </Link>
                  </li>
                    <li className="menu-item">
                    <Link to="/contact">
                      <span>Contact Us</span>
                    </Link>
                  </li>
                    <li className="menu-item">
                    <Link to="/news">
                      <span>News</span>
                    </Link>
                  </li>


                   

                   
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer_copyright_wrap">
          <div className="footer_copyright_inner">
            <div className="content_wrap">
              <div className="copyright_text">
                <a href="" target="_blank" rel="noopener noreferrer">
                  Tacos
                </a>{' '}
               <span> © 2026. All rights reserved.</span>
              </div> 
              <br />
                 <div className="copyright_text">
                <a class="links-shown" href="https://zerologic.io" target="_blank" rel="noopener noreferrer">
            Designed by Zerologic
          </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Footer;