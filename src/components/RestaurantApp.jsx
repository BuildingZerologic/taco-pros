import React, { useState, useEffect, useMemo } from "react";
import "./menu.css";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import TacoButton from "./TacoButton";

// Yeh aapka provide kiya hua raw data hai
const menuItems = [
  {
    category: 'APPETIZER',
    menuIcon: '/tp menu banners mobile appetizer.jpg',
    image: 'i-1.jpg',
    menuTitle: 'Appetizers',
     combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>3 TACOS SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>

    },
    dishes: [
      { title: 'Nachos Supreme', description: 'Lettuce, tomato, melted Chihuahua cheese, beans, guacamole, sour cream and your choice of meat. (Chipotle Chicken, Steak or Ground Beef)', price: '$10', img: "GUAC AND CHIPS.png" },
      { title: 'Chips & Salsa', description: 'Chips with freshly made salsa', price: '$9', img: "GUAC AND CHIPS.png" },
      // { title: 'Quesadilla (Chicken, Steak or Ground beef)', description: 'Flour tortilla with side of lettuce, tomato, and sour cream. (Extra Topping $0.25 each)', price: '$9', img: "GUAC AND CHIPS.png" },
      { title: 'French Fries with Nacho Cheese', description: '(Chipotle Chicken, Steak or Ground beef – ADD $1)', price: '$9', img: "GUAC AND CHIPS.png" },
      { title: 'Mexican French Fries Supreme', description: 'Lettuce, tomato, melted Chihuahua cheese, beans, guacamole, sour cream and your choice of meat. (Chipotle Chicken, Steak or Ground Beef)', price: '$9', img: "GUAC AND CHIPS.png" },
      // { title: 'Cheese Quesadilla (Flour Tortilla)', description: 'Melted C​hihuahua cheese with Mexican Sausage', price: '$9', img: "GUAC AND CHIPS.png" },
      { title: 'Chips & Guacamole', description: 'Chips with freshly made guacamole', price: '$9', img: "GUAC AND CHIPS.png" },
      { title: 'Elote (corn)', description: ' ', price: '$9', img: "GUAC AND CHIPS.png" },
      { title: 'Chips & Queso', description: ' ', price: '$9', img: "GUAC AND CHIPS.png" }
    ],
  },
  {
    category: 'Tacos',
    menuIcon: '/tp menu banners mobile taco.jpg',
    image: '/tp menu banners tacos 2.jpg',
    menuTitle: 'Tacos',
    combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>3 TACOS SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>

    }
    ,
    dishes: [
      { title: 'Veggie', description: 'American Style: Lettuce and Tomatoes • Mexican Style: Onion and Cilantro', price: '$12', img: "GUAC AND CHIPS.png" },
      {
        title: 'Picadillo (Ground Beef)', description: `American Style: Lettuce and Tomatoes • Mexican Style: Onion and Cilantro`, price: '$11', img: "GUAC AND CHIPS.png"
      },
      {
        title: 'Asada (Steak)', description: `American Style: Lettuce and Tomatoes • Mexican Style: Onion and Cilantro`, price: '$11', img: "GUAC AND CHIPS.png"
      },
      {
        title: 'Pollo (Chicken)', description: `American Style: Lettuce and Tomatoes • Mexican Style: Onion and Cilantro`, price: '$11', img: "GUAC AND CHIPS.png"
      },
      {
        title: 'Barbacoa (House Special)', description: `American Style: Lettuce and Tomatoes • Mexican Style: Onion and Cilantro`, price: '$11', img: "GUAC AND CHIPS.png"
      },
      {
        title: 'AL Pastor (Pork)', description: `American Style: Lettuce and Tomatoes • Mexican Style: Onion and Cilantro`, price: '$11', img: "GUAC AND CHIPS.png"
      }
    ]
  },
  {
    category: 'PROTEIN BOWL',
    menuIcon: '/proteinbowl.jpg',
    image: '/proteinbowl.jpg',
    menuTitle: 'Protein Bowl',
     combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>3 TACOS SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>

    },
    dishes: [
      { title: 'Veggie', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Asada (Steak)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Ground Beef (Picadillo)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Pollo (Chipotle Chicken)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'AL Pastor (Pork)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Barbacoa (House Special)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" }
    ],
  },
  {
    category: 'BURRITOS',
    menuIcon: '/tp menu banners mobile burrito.jpg',
    image: '/tp menu banners burrito.jpg',
    menuTitle: 'Burritos',
    combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>1 BURRITO SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>
      ,
    },

    dishes: [
      { title: 'Veggie', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream. (Extra Topping $0.25 each)`, price: '$6', img: "GUAC AND CHIPS.png" },
      {
        title: 'Ground Beef (Picadillo)', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream.
(Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png"
      },
      {
        title: 'Asada (Steak)', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream.
(Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png"
      },
      {
        title: 'Pollo (Chicken)', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream.
(Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png"
      },
      { title: 'Barbacoa (House Special)', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'AL Pastor (Pork)', description: `Served with lettuce, tomato, avocado, rice, beans & cheese.`, price: '$5', img: "GUAC AND CHIPS.png" },
    ],
  },
  {
    category: 'TORTAS',
    menuIcon: '/tp menu banners mobile torta.jpg',
    image: '/tp menu banners torta.jpg',
    menuTitle: 'Tortas',
    combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>1 TORTA SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>
      ,
    },
    dishes: [
      { title: 'Veggie', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each)`, price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Picadillo (Ground Beef)', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Asada (Steak)', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Pollo (Chicken)', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Barbacoa (House Special)', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'AL Pastor (Pork)', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
    ],
  },
   {
    category: 'Quesadilla',
    menuIcon: '/tp menu banners mobile quesadilla.jpg',
    image: '/tp menu banners quesadilla.jpg',
    menuTitle: 'Quesadilla',
     combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>Cheese in a flour tortilla with your choice of meat, with lettuce, tomatoes and sour cream on side.
        </>

    },
    dishes: [
      { title: 'Classic Protein (Pollo, Picadillo, Al Pastor ,Veggie)', description: 'Flour tortilla with side of lettuce, tomato, and sour cream. (Extra Topping $0.25 each)', price: '$9', img: "GUAC AND CHIPS.png" },
      { title: 'Signature Protein (Barbacoa, Asada, Camaron)', description: 'Melted C​hihuahua cheese with Mexican Sausage', price: '$9', img: "GUAC AND CHIPS.png" },
    ],
  },
  
  
  {
    category: 'ENCHILADAS DINNER',
    menuIcon: '/tp menu banners mobile drink enchilada dinner.jpg',
    image: '/tp menu banners enchilada dinner.jpg',
    menuTitle: 'Enchiladas Dinner',
     combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>Three soft corn tortillas rolled with your choice of protein, topped with our signature green salsa or smoky red salsa.
        </>

    },
    dishes: [
      { title: 'Veggie', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Asada (Steak)', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Picadillo (Ground Beef)', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Pollo (Chicken)', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
      { title: 'Cheese', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
    ],
  },
  {
    category: 'KIDS',
    menuIcon: '/tp menu banners mobile kids.jpg',
    image: '/tp menu banners kids.jpg',
    menuTitle: 'Kids',
     combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>3 TACOS SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>

    },
    dishes: [
      {
        title: 'Rice & Beans or Fries', description: <>
          SERVED WITH ONE SIDE OPTION: <br /> 1: Rice & Beans <br /> 2: Fries & Juice
        </>, price: '$6', img: "GUAC AND CHIPS.png"
      }
    ],
  },
  {
    category: 'DESSERTS',
    menuIcon: '/tp menu banners mobile dessert.jpg',
    image: '/tp menu banners dessert.jpg',
    menuTitle: 'Desserts',
     combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>3 TACOS SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>

    },
    dishes: [
      { title: 'Churros', description: 'Covered in cinnamon sugar, fried to perfection, these are crispy on the outside and tender on the inside.', price: '$6', img: "GUAC AND CHIPS.png" }
    ],
  },
  {
    category: 'DRINKS',
    image: '/tp menu banners drink.jpg',
    menuIcon: '/tp menu banners mobile drink.jpg',
    menuTitle: 'Drinks',
     combo: {
      title: 'TACO TRIO COMBO',
      description:
        <>3 TACOS SERVED WITH ONE SIDE OPTION: <br />
          1: Rice & Beans <br />
          2: Fries and 1 can of Soda
        </>

    },
    dishes: [
      { title: 'Bottle of Water', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Agua Fresca Lemonade', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Agua Fresca Watermelon', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Horchata', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Sandia Splash', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Jarritos', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },

    ],
  },
  {
    category: 'SIDES',
    menuIcon: '/tp menu banners mobile side.jpg',
    image: '/tp menu banners sides.jpg',
    menuTitle: 'Sides',
    dishes: [
      { title: 'Extra Meat', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Refried Beans', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'French Fries', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Chips', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Rice', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
      { title: 'Freshly made Guacamole', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },

    ],
  },

];

const categoriesData = menuItems.map(item => ({
  id: item.category.toLowerCase().replace(/\s+/g, '-'),
  name: item.menuTitle,
  menuIcon: item.menuIcon,
  cover: `./${item.image}`,
  combo: item.combo,
  items: item.dishes.map(dish => ({
    name: dish.title,
    description: dish.description,
    price: dish.price,
    img: dish.img
  }))
}));


const ORDER_LINK = "https://tacopros.toast.site/";

const comboStyleContent = {
  tacos: {
    title: "Style Options For Tacos",
    description: (
      <>
        American: Lettuce & Tomato <br />
        Mexican: Onion & Cilantro <br />
        PRO: Lettuce, Tomato, Cheese, Sour Cream & Avocado
      </>
    ),
  },
  "protein-bowl": {
    title: "Served With",
    description: "Rice, Beans, Lettuce, Tomato, Queso Fresco, Tortilla Strips, Corn & Avocado (with Choice of Dressing)",
  },
  tortas: {
    title: "Served With",
    description: "Lettuce, Tomato, Avocado, Beans, Cheese & Sour Cream",
  },
  burritos: {
    title: "Served With",
    description: "Lettuce, Tomato, Avocado, Beans, Cheese & Sour Cream",
    
  },
  quesadilla: {
    title: "Quesadilla",
    description: "Cheese in a flour tortilla with your choice of meat, with lettuce, tomatoes and sour cream on side.",
  },
  "enchiladas-dinner": {
    title: "Enchiladas Dinner",
    description: "Three soft corn tortillas rolled with your choice of protein, topped with our signature green salsa or smoky red salsa.",
  },
};

export default function RestaurantApp() {

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(categoriesData[0]);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pageTitle = useMemo(() => {
    return `${activeCategory.name} Menu | Taco Pros`;
  }, [activeCategory]);

  const pageDescription = useMemo(() => {
    return `Explore Taco Pros ${activeCategory.name.toLowerCase()} menu. Fresh Mexican food including tacos, burritos, tortas and more. Order online now.`;
  }, [activeCategory]);

  const isTacosCategory = activeCategory.id === "tacos";
  const activeComboStyle = comboStyleContent[activeCategory.id] || comboStyleContent.tacos;
  const hideComboSection = ["appetizer", "kids", "desserts", "drinks", "sides"].includes(activeCategory.id);
  const showComboSection = activeCategory.combo && !hideComboSection;

  useEffect(() => {
    const categoryId = new URLSearchParams(location.search).get("category");
    const selectedCategory = categoriesData.find((cat) => cat.id === categoryId);

    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [location.search]);

  // ✅ FIX: safe responsive detection (no window.innerWidth in render)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.classList.add("menu-page");
    return () => document.body.classList.remove("menu-page");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/menu-og.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Menu",
            "name": activeCategory.name,
            "hasMenuSection": activeCategory.items.map(item => ({
              "@type": "MenuItem",
              "name": item.name,
              "description":
                typeof item.description === "string"
                  ? item.description
                  : "Mexican dish",
              "offers": {
                "@type": "Offer",
                "price": item.price.replace("$", ""),
                "priceCurrency": "USD"
              }
            }))
          })}
        </script>
      </Helmet>

      <main className="cat-container">

        {/* CATEGORY TABS */}
        <div className={`cat-tabs-wrapper ${isSticky ? "is-fixed" : ""}`}>
          <div className="cat-tabs">
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat)}
                className={`cat-tab ${activeCategory.id === cat.id ? "cat-tab-active" : ""}`}
                aria-label={`View ${cat.name} menu`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* TITLE */}
        <h1 className="cat-title">{activeCategory.name}</h1>

        {/* COVER IMAGE (SEO FIXED) */}
        <div className={`coverImg ${activeCategory.name === "Protein Bowl" ? "protein-bowl-cover" : ""}`}>
          <picture className="cat-cover">
            <source
              media="(max-width: 767px)"
              srcSet={encodeURI(activeCategory.menuIcon)}
            />

            <img
              src={activeCategory.cover}
              alt={`${activeCategory.name} menu`}
              className="cat-cover"
              loading="lazy"
            />
          </picture>
        </div>

        {/* COMBO SECTION */}
        {showComboSection && (
          <section className="cds-card">
            <div className="cds-panel cds-style-panel">
              <h2 className="cds-title">{activeComboStyle.title}</h2>
              <p className="cds-description">
                {activeComboStyle.description}
              </p>
            </div>

            <div className="cds-panel cds-combo-panel cds-image-panel">
              <img
                src={isTacosCategory ? "/3 taco combo banner-02.jpg" : "/make combo banner-01.jpg"}
                alt={isTacosCategory ? "Taco Trio Combo" : "Make it a combo"}
                className="cds-combo-img"
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* ITEMS */}
        <section className="cat-items">
          {activeCategory.items.map((item, index) => (
            <article key={index} className="cat-item-card">
              <div className="cat-item-info">
                <h2 className="cat-item-title">{item.name}</h2>
              </div>
            </article>
          ))}
        </section>

        {/* ORDER BUTTON */}
        <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer" className="cat-order-link">
          <TacoButton
            text="Order now"
            width="100%"
            height={isMobile ? "51px" : "57px"}
            styleType="1"
            styleClass="cat-order-taco-btn"
            fontSize={isMobile ? "18px" : "24px"}
          />
        </a>

        <hr className="divider" />

        {/* CATERING CTA */}
        <section className="fix-card">
          <div className="fix-card-header">
            <img
              src="/ImageWithFallback.png"
              alt="Taco Catering Tray"
              className="fix-card-img"
              loading="lazy"
            />
          </div>

          <div className="fix-card-body">
            <h2 className="fix-card-title">CATERING MENU</h2>

            <TacoButton
              text="VIEW CATERING"
              width={isMobile ? "155px" : "302px"}
              height={isMobile ? "51px" : "57px"}
              styleType="2"
              fontSize={isMobile ? "18px" : "24px"}
              link="/catering"
              textColor="#E3501d"
            />
          </div>
        </section>

        <div className="mySpace" aria-hidden="true" />
      </main>
    </>

  );
}
