import './About.css';
import ScrollSVG from './ScrollSVG';

export default function About() {
    return (
        <>

      

            <section className='dx-about'>


                <span>
                    OUR STORY
                </span>

                <h2 class="about-heading">
                    ROOTED IN

                    MEXICAN FLAVOR
                </h2>
            </section>

            <section className='story'>
                <img src="./candle.png" className='candle' />
                <img src="./heartz.png" className='heartz' />

                <div className='left-image'>
                    <img src='/splash.jpg' className='imageofstory' />
                </div>
                <div className='right-story'>
                    <h1>VIVA LA <br />
                        MEXICO!</h1>
                    <p>
                        In Mexico, food has always been more than
                        just a meal — it’s an experience... and an
                        <br />   <br />
                        experiment. Blending spices, roasting chil-
                        ies, and perfecting recipes not with cook-
                        books, but with curiosity. Every dish is a
                        <br />   <br />
                        discovery, every spice a new note in the
                        story of flavor.
                        <br />   <br />
                        That spirit of experimentation, love, and
                        authenticity, that's our drive. Taco Pros
                        was built on the belief that Mexican food
                        should surprise, comfort, and connect.
                        <br />   <br />
                        At Taco Pros, we share with you a journey.
                        A journey of flavors discovered, perfected,
                        and shared — one unforgettable first bite at
                        a time.
                    </p>
                </div>


            </section>
            <section className='abouthero'>
                <div className='wave2'></div>

                <img src="./about.jpg" className='aboutheroimg' />

                <div className='leftabout'>
                    <span>THE MISSION STAYS THE SAME</span>
                    <h2>
                        KEEP IT BOLD
                        KEEP IT REAL
                        KEEP IT COMING!
                    </h2>
                    <p>
                        No fluff. No shortcuts. Just real food, made by
                        real pros, with real flavor that hits every time.
                    </p>

                    <button className="cfx-hero-button">ORDER NOW</button>
                </div>

            </section>
        </>
    )
}