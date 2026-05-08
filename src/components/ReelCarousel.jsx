import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import "./reelcarousel.css";
import Marquee from './Marquee';

const MENU_DATA = [
    { id: 1, video: "1.mp4" },
    { id: 2, video: "2.mp4" },
    { id: 3, video: "1.mp4" },
    { id: 4, video: "2.mp4" },
];


const data = [
    {
        type: "video",
        src: "1.mp4",
        link: "https://www.instagram.com/taco_pros/",
    },
    {
        type: "video",
        src: "2.mp4",
        link: "https://www.instagram.com/taco_pros/",
    },
    {
        type: "video",
        src: "tacopros1.mp4",
        link: "https://www.instagram.com/taco_pros/",
    },
    {
        type: "video",
        src: "tacopros2.mp4",
        link: "https://www.instagram.com/taco_pros/",
    },




];


const ReelCarousel = () => {
    return (
        <div className="ox-carousel-container">
         
            <h2 className="ox-menu-title ox-menu-size">FOLLOW US @TACOPROSOFFICIAL</h2>

            {/* <Swiper
                modules={[Pagination, Autoplay]} 
                pagination={{ clickable: true }}
                loop={true}
                centeredSlides={true}
                // slidesPerView 'auto' hi rahega, width hum CSS se control karenge
                slidesPerView={'auto'} 
                spaceBetween={25} // Mobile gaps
                breakpoints={{
                    0: {
                        autoplay: { delay: 2000, disableOnInteraction: false },
                    },
                    1024: {
                        autoplay: false,
                    }
                }}
                className="ox-mySwiper"
            >
                {menuData.map((item) => (
                    <SwiperSlide key={item.id} className="ox-custom-slide">
                        <div className="ox-card-frame-y">
                            <div className="ox-image-container-3">
                                <video src={item.video} autoPlay muted loop playsInline />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> */}

            <Marquee
                data={data}
                direction="left"
                speed={12000}
                pauseOnHover={false}
                size="clamp(130px, 16vw, 210px)"
            />



        </div>
    );
};

export default ReelCarousel;
