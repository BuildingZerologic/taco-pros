import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import "./burrito.css";
import { Link } from 'react-router-dom';
import TacoButton from './TacoButton';

const BurritoCarousel = () => {
    const menuData = [
        {
            id: 1,
            title: "APPETIZERS",
            description: "Nachos Supreme, Quesadillas, and fresh Chips with Guacamole or Salsa.",
            image: "/i-1.png",
        },
        {
            id: 2,
            title: "TACOS",
            description: "Traditional Steak, Chicken, Pork, and Barbacoa tacos with fresh toppings.",
            image: "/CHICKEN TACOS.png",
        },
        {
            id: 3,
            title: "TORTAS",
            description: "Authentic Mexican sandwiches served with beans, avocado, cheese, and sour cream.",
            image: "/i-3.png",
        },
        {
            id: 4,
            title: "BURRITOS",
            description: "Flour tortillas packed with rice, beans, corn, avocado, and your choice of meat.",
            image: "/STEAK BURRITOS.png",
        },
        {
            id: 5,
            title: "ENCHILADAS DINNER",
            description: "Three enchiladas with red or green salsa, served with lettuce and avocado.",
            image: "/i-5.png",
        },
        {
            id: 6,
            title: "PROTEIN BOWL",
            description: "A healthy mix of rice, beans, queso fresco, and tortilla strips in a bowl.",
            image: "/pro.png",
        },
        {
            id: 7,
            title: "KIDS MENU",
            description: "Child-friendly Tacos or Quesadillas served with juice and a side.",
            image: "/i-6.png",
        },
        {
            id: 8,
            title: "DESSERTS",
            description: "Crispy Churros covered in cinnamon sugar, fried to perfection.",
            image: "/i-7.png",
        },
        {
            id: 9,
            title: "DRINKS",
            description: "Refreshing Aguas Frescas, Horchata, Jarritos, and Fountain drinks.",
            image: "/tp aguas fresca.webp",
        },
        {
            id: 10,
            title: "SIDES",
            description: "Extra Rice, Beans, Guacamole, Queso, or French Fries.",
            image: "/GUAC.png",
        }
    ];

    return (
        <div className="carousel-container">


            <Swiper
                modules={[Pagination]}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                spaceBetween={15}
                pagination={{ clickable: true }}
                className="mySwiper"
            >
                {menuData.map((item) => (
                    <SwiperSlide key={item.id} className="custom-slide">
                        
                            <div className="card-content">
                                <h3 className='sw-title'>{item.title}</h3>
                               
                            </div>
                        <div className="card-frame">
                            <div className="image-container">
                                <img src={item.image} alt={item.title} />
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

           <Link to="/menu">
           

            <TacoButton text="View Full Menu"
            width={window.innerWidth < 768 ? "155px" : "302px"}
            height={window.innerWidth < 768 ? "51px" : "57px"} 
             styleType = "1"
             fontSize={window.innerWidth < 768 ? "18px" : "24px"} 
            />

            
           </Link>
        </div>
    );
};

export default BurritoCarousel;

