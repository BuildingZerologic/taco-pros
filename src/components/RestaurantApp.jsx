import React, { useState, useEffect, useMemo } from "react";
import "./menu.css";
import { Helmet } from "react-helmet-async";
import TacoButton from "./TacoButton";

// Yeh aapka provide kiya hua raw data hai
const menuItems = [
    {
        category: 'APPETIZERS',
        menuIcon: '/tp menu banners mobile appetizer.jpg',
        image: 'i-1.jpg',
        menuTitle: 'Appetizers',
        dishes: [
            { title: 'Nachos Supreme', description: 'Lettuce, tomato, melted Chihuahua cheese, beans, guacamole, sour cream and your choice of meat. (Chipotle Chicken, Steak or Ground Beef)', price: '$10', img: "GUAC AND CHIPS.png" },
            { title: 'Chips & Salsa', description: 'Chips with freshly made salsa', price: '$9', img: "GUAC AND CHIPS.png" },
            { title: 'Quesadilla (Chicken, Steak or Ground beef)', description: 'Flour tortilla with side of lettuce, tomato, and sour cream. (Extra Topping $0.25 each)', price: '$9', img: "GUAC AND CHIPS.png" },
            { title: 'French Fries with Nacho Cheese', description: '(Chipotle Chicken, Steak or Ground beef – ADD $1)', price: '$9', img: "GUAC AND CHIPS.png" },
            { title: 'Mexican French Fries Supreme', description: 'Lettuce, tomato, melted Chihuahua cheese, beans, guacamole, sour cream and your choice of meat. (Chipotle Chicken, Steak or Ground Beef)', price: '$9', img: "GUAC AND CHIPS.png" },
            { title: 'Cheese Quesadilla (Flour Tortilla)', description: 'Melted C​hihuahua cheese with Mexican Sausage', price: '$9', img: "GUAC AND CHIPS.png" },
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
                <>3 TACOS SERVED WITH ONE SIDE OPTION: <br/>
                    1: Rice & Beans <br/>
                    2: Fries and 1 can of Soda
                </>
            
        }
        ,
        dishes: [
            { title: 'Veggie', description: 'American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro (Extra Topping $0.25 each)', price: '$12', img: "GUAC AND CHIPS.png" },
            {
                title: 'Picadillo (Ground Beef)', description: `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`, price: '$11', img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Asada (Steak)', description: `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`, price: '$11', img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Pollo (Chicken)', description: `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`, price: '$11', img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Barbacoa (House Special)', description: `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`, price: '$11', img: "GUAC AND CHIPS.png"
            },
            {
                title: 'AL Pastor (Pork)', description: `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`, price: '$11', img: "GUAC AND CHIPS.png"
            }
        ]
    },
    {
        category: 'TORTAS',
        menuIcon: '/tp menu banners mobile torta.jpg',
        image: '/tp menu banners torta.jpg',
        menuTitle: 'Tortas',
        combo: {
            title: 'TACO TRIO COMBO',
            description:
                <>1 TORTA SERVED WITH ONE SIDE OPTION: <br/>
                    1: Rice & Beans <br/>
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
        category: 'BURRITOS',
        menuIcon: '/tp menu banners mobile burrito.jpg',
        image: '/tp menu banners burrito.jpg',
        menuTitle: 'Burritos',
        combo: {
            title: 'TACO TRIO COMBO',
            description:
                <>1 BURRITO SERVED WITH ONE SIDE OPTION: <br/>
                    1: Rice & Beans <br/>
                    2: Fries and 1 can of Soda
                </>
            ,
        },

        dishes: [
            { title: 'Veggie', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream. (Extra Topping $0.25 each)`, price: '$6', img: "GUAC AND CHIPS.png" },
            { title: 'Ground Beef (Picadillo)', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream.
(Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Asada (Steak)', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream.
(Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Pollo (Chicken)', description: `Served with lettuce, tomato, avocado, beans, cheese and sour cream.
(Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Barbacoa (House Special)', description: `Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)`, price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'AL Pastor (Pork)', description: `Served with lettuce, tomato, avocado, rice, beans & cheese.`, price: '$5', img: "GUAC AND CHIPS.png" },
        ],
    },
    {
        category: 'ENCHILADAS DINNER',
        menuIcon: '/tp menu banners mobile drink enchilada dinner.jpg',
        image: '/tp menu banners enchilada dinner.jpg',
        menuTitle: 'Enchiladas Dinner',
        dishes: [
            { title: 'Veggie', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$6', img: "GUAC AND CHIPS.png" },
            { title: 'Asada (Steak)', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Picadillo (Ground Beef)', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Pollo (Chicken)', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Cheese', description: `3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado`, price: '$5', img: "GUAC AND CHIPS.png" },
        ],
    },
    {
        category: 'KIDS menu',
        menuIcon: '/tp menu banners mobile kids.jpg',
        image: '/tp menu banners kids.jpg',
        menuTitle: 'Kids menu',
        dishes: [
            { title: 'KIDS MEAL(Taco or Quesadilla)', description: <>
            SERVED WITH ONE SIDE OPTION: <br/> 1: Rice & Beans <br/> 2: Fries & Juice
            </>, price: '$6', img: "GUAC AND CHIPS.png" }
        ],
    },
    {
        category: 'DESSERTS',
        menuIcon: '/tp menu banners mobile dessert.jpg',
        image: '/tp menu banners dessert.jpg',
        menuTitle: 'Desserts',
        dishes: [
            { title: 'Churro', description: 'Covered in cinnamon sugar, fried to perfection, these are crispy on the outside and tender on the inside.', price: '$6', img: "GUAC AND CHIPS.png" }
        ],
    },
    {
        category: 'DRINKS',
        image: '/tp menu banners drink.jpg',
        menuIcon: '/tp menu banners mobile drink.jpg',
        menuTitle: 'Drinks',
        dishes: [
            { title: 'Bottle of Water', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
            { title: 'Horchata', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
            { title: 'Bottled Mexican Drink', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
            { title: 'Soda Can', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
            { title: 'Fresh Lemonade', description: ' ', price: '$6', img: "GUAC AND CHIPS.png" },
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
    {
        category: 'PROTEIN BOWL',
        menuIcon: '/tp menu banners mobile protein bowl.jpg',
        image: '/tp menu banners protein bowl.jpg',
        menuTitle: 'Protein Bowl',
        dishes: [
            { title: 'Veggie', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$6', img: "GUAC AND CHIPS.png" },
            { title: 'Asada (Steak)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Ground Beef (Picadillo)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Pollo (Chipotle Chicken)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'AL Pastor (Pork)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" },
            { title: 'Barbacoa (House Special)', description: 'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.', price: '$5', img: "GUAC AND CHIPS.png" }
        ],
    }
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


const ORDER_LINK = "https://tacopros.com/order-online";

export default function RestaurantApp() {

  const [activeCategory, setActiveCategory] = useState(categoriesData[0]);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

   const pageTitle = useMemo(() => {
    return `${activeCategory.name} Menu | Taco Pros`;
  }, [activeCategory]);

  const pageDescription = useMemo(() => {
    return `Explore Taco Pros ${activeCategory.name.toLowerCase()} menu. Fresh Mexican food including tacos, burritos, tortas and more. Order online now.`;
  }, [activeCategory]);

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
      <div className="coverImg">
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
      {activeCategory.combo && (
        <section className="cds-card">
          <h2 className="cds-title">{activeCategory.combo.title}</h2>
          <p className="cds-description">
            {activeCategory.combo.description}
          </p>
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
      <a href={ORDER_LINK} style={{ width: "99%" }}>
        <TacoButton
          text="Order now"
          width={isMobile ? "155px" : "100%"}
          height={isMobile ? "51px" : "57px"}
          styleType="1"
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
