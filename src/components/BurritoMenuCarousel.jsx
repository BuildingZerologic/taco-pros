import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import TacoButton from './TacoButton';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./burrito.css";


const BurritoCarousel = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);

    const menuData = [
          { id: 2, title: "TACOS", image: "/1_slider chicken taco.png" },
           { id: 3, title: "TORTAS", image: "/1_slider tortas.png" },
        { id: 1, title: "KIDS MENU", image: "/1_slider kids menu.png" },
      
      

       
        { id: 4, title: "BURRITOS", image: "/1_slider burritos.png" },
        { id: 5, title: "ENCHILADAS DINNER", image: "/1_red enchillada_slider.png" },
        { id: 6, title: "PROTEIN BOWL", image: "/1_slider al pastor protien bowl.png" },

        // { id: 8, title: "DESSERTS", image: "/1_slider churros.png" },
          { id: 7, title: "APPETIZERS", image: "/1_slider mex fries.png" },
        // { id: 9, title: "DRINKS", image: "/1_slider drink.png" },
        // { id: 10, title: "SIDES", image: "/1_slider guac.png" }
    ];


    return (
        <div className="carousel-container">

            <Swiper
                modules={[Pagination, Navigation]}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                spaceBetween={15}

                onBeforeInit={(swiper) => {
                    setTimeout(() => {
                        if (swiper.params.navigation) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }

                        if (swiper.params.pagination) {
                            swiper.params.pagination.el = paginationRef.current;
                            swiper.pagination.init();
                            swiper.pagination.update();
                        }
                    });
                }}


                pagination={false}
            >
                {menuData.map((item) => (
                    <SwiperSlide key={item.id} className="custom-slide">
                        <h3 className="sw-title">{item.title}</h3>

                        <div className="image-container">
                            <img src={item.image} alt={item.title} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* CONTROLS */}
            <div className="sw-controls-row">

                <div className="" ref={prevRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 20" fill="none">
                        <path d="M17.4121 10H1.41211M1.41211 10L10.3877 1M1.41211 10L10.3877 19" stroke="#E4531E" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="sw-pagination-container" ref={paginationRef}></div>

                <div className="" ref={nextRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 20" fill="none">
                        <path d="M1 10H17M17 10L8.02439 1M17 10L8.02439 19" stroke="#E4531E" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

            </div>

            <Link to="/menu">


                <TacoButton text="View Full Menu"
                    width={window.innerWidth < 768 ? "155px" : "302px"}
                    height={window.innerWidth < 768 ? "51px" : "57px"}
                    styleType="1"
                    fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                />
            </Link>

        </div>
    );
};

export default BurritoCarousel;