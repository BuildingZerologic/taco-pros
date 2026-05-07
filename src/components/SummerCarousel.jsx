import React, { useEffect, useMemo, useState } from 'react';
import "./burrito.css"; // reuse same CSS
import TacoButton from './TacoButton';

const SummerCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const data = useMemo(() => [
        {
            id: 1,
            title: "New Dish Alert",
            desc: `Bigger Better Pro Burritos Starting at $10 `,
            img: "/tp mob offer new dish alert (1).jpg"
        },
        {
            id: 2,
            title: "Happy Hours",
            desc: `Clock out, pull up, and unwind.
$5 margaritas from 4–8 PM - no excuses needed.`,
            img: "/tp mob offer happy hr.jpg"
        },
        {
            id: 3,
            title: "Lunch Special",
            desc: `2 Tacos and a Drink $7.99 (11am – 4pm)`,
            img: "/tp mob offer lunch spl.jpg"
        }, {
            id: 4,
            title: "New Dish Alert",
            desc: `Bigger Better Pro Burritos Starting at $10`,
            img: "/tp mob offer new dish alert (1).jpg"
        },
        {
            id: 5,
            title: "Happy Hours",
            desc: `Clock out, pull up, and unwind.
$5 margaritas from 4–8 PM - no excuses needed.`,
            img: "/tp mob offer happy hr.jpg"
        },
        {
            id: 6,
            title: "Lunch Special",
            desc: `2 Tacos and a Drink $7.99 (11am – 4pm)`,
            img: "/tp mob offer lunch spl.jpg"
        },

    ], []);

    const lastIndex = data.length - 1;

    const goToPrev = () => {
        setActiveIndex((current) => (current === 0 ? lastIndex : current - 1));
    };

    const goToNext = () => {
        setActiveIndex((current) => (current === lastIndex ? 0 : current + 1));
    };

    useEffect(() => {
        if (isPaused) return undefined;

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current === lastIndex ? 0 : current + 1));
        }, 2800);

        return () => window.clearInterval(timer);
    }, [isPaused, lastIndex]);

    const slides = useMemo(() => {
        const midpoint = data.length / 2;

        return data.map((item, index) => {
            let offset = index - activeIndex;

            if (offset > midpoint) offset -= data.length;
            if (offset < -midpoint) offset += data.length;

            const absOffset = Math.abs(offset);

            return {
                ...item,
                offset,
                absOffset,
                isActive: offset === 0,
            };
        });
    }, [activeIndex, data]);

    return (
        <div
            className="carousel-container summer-carousel-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >

            <div
                className="summer-offer-swiper"
                aria-roledescription="carousel"
                aria-label="Summer offers"
            >
                <div className="summer-slider-stage">
                    {slides.map((item) => (
                        <article
                            key={item.id}
                            className={`custom-slide2 summer-slide-card ${item.isActive ? "is-active" : ""}`}
                            data-distance={item.absOffset}
                            data-side={item.offset < 0 ? "left" : item.offset > 0 ? "right" : "center"}
                            aria-hidden={!item.isActive}
                        >

                            <h3 className="sw-title2">{item.title}</h3>

                            <img src={item.img} alt={item.title} className='swe' />


                            <p className="sw-desc">{item.desc}</p>
                        </article>
                    ))}
                </div>
            </div>

            {/* CONTROLS */}
            <div className="sw-controls-row">

                <button className="sw-nav-button" type="button" onClick={goToPrev} aria-label="Previous offer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 20" fill="none">
                        <path d="M17.4121 10H1.41211M1.41211 10L10.3877 1M1.41211 10L10.3877 19" stroke="#E4531E" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <button className="sw-nav-button" type="button" onClick={goToNext} aria-label="Next offer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 20" fill="none">
                        <path d="M1 10H17M17 10L8.02439 1M17 10L8.02439 19" stroke="#E4531E" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

            </div>



            <TacoButton text="Order Now"
                width="clamp(155px, 22vw, 302px)"
                height="clamp(51px, 5vw, 57px)"
                styleType="1"
                fontSize="clamp(18px, 2vw, 24px)"
            />

        </div>
    );
};

export default SummerCarousel;
