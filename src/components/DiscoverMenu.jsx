
import { useState, useEffect } from "react";
import "./Disk.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import TacoButton from "./TacoButton";


const menuItems = [
    {
        category: 'APPETIZERS',
        menuIcon: 'i-1.png',
        image: 'i-1.png',
        menuTitle: 'Appetizers',
        dishes: [
            {
                title: 'Nachos Supreme',
                description:
                    'Sour cream with a hint of queso fresco',
                price: '$10',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Chips & Salsa',
                description:
                    'Chips with freshly made salsa.',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Quesadilla (Chicken, Steak or Ground beef)',
                description:
                    'Flour tortilla with side of lettuce, tomato, and sour cream. (Extra Topping $0.25 each)',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'French Fries with Nacho Cheese',
                description:
                    'Chicken, Steak or Ground beef – ADD $1',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Mexican French Fries Supreme',
                description:
                    'tomato, guacamole, sour cream, nacho cheese with a hint of queso fresco',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }
            , {
                title: 'Cheese Quesadilla (Flour Tortilla)',
                description:
                    'Melted C​hihuahua cheese with Mexican Sausage.',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Chips & Guacamole',
                description:
                    'Chips with freshly made guacamole.',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Elote (corn)',
                description:
                    ' ',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Chips & Queso',
                description:
                    ' ',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }


        ],
    },
    {
        category: 'Tacos',
        menuIcon: 'CHICKEN TACOS.png',
        image: 'CHICKEN TACOS.png',
        menuTitle: 'Tacos',
        dishes: [
            {
                title: 'Veggie',
                description:
                    'American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro (Extra Topping $0.25 each)',
                price: '$12',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Picadillo (Ground Beef)',
                description:
                    `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`,
                price: '$11',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Asada (Steak)',
                description:
                    `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`,
                price: '$11',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Pollo (Chicken)',
                description:
                    `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`,
                price: '$11',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Barbacoa (House Special)',
                description:
                    `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`,
                price: '$11',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'AL Pastor (Pork)',
                description:
                    `American Style: Lettuce & Tomato Mexican Style: Onion & Cilantro
(Extra Topping $0.25 each – ADD Extra Meat $1.50)`,
                price: '$11',
                img: "GUAC AND CHIPS.png"
            }
        ],
    },
    {
        category: 'PROTEIN BOWL',
        menuIcon: 'pro.png',
        image: 'pro.png',
        menuTitle: 'Protein Bowl',
        dishes: [
            {
                title: 'Veggie',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Asada (Steak)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Ground Beef (Picadillo)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Pollo (Chicken)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'AL Pastor (Pork)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Barbacoa (House Special)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }
        ],
    },
    {
        category: 'BURRITOS',
        menuIcon: 'i-4.png',
        image: 'STEAK BURRITOS.png',
        menuTitle: 'Burritos',
        dishes: [
            {
                title: 'Veggie',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Ground Beef (Picadillo)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Asada (Steak)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Pollo (Chicken)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Barbacoa (House Special)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'AL Pastor (Pork)',
                description:
                    'Served with rice, beans, lettuce, tomato, queso fresco, tortilla strips, corn & avocado.',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
        ],
    },
    {
        category: 'TORTAS',
        menuIcon: 'i-33.png',
        image: 'i-33.png',
        menuTitle: 'Tortas',
        dishes: [
            {
                title: 'Veggie',
                description:
                    'Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each)',
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Picadillo (Ground Beef)',
                description:
                    'Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Asada (Steak)',
                description:
                    'Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Pollo (Chicken)',
                description:
                    'Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Barbacoa (House Special)',
                description:
                    'Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'AL Pastor (Pork)',
                description:
                    'Mexican sandwiches served with lettuce, tomato, avocado, beans, cheese & sour cream. (Extra Topping $0.25 each – ADD Extra Meat $3.00)',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
        ],
    },
    {
        category: 'Quesadilla',
        menuIcon: 'quesadilla.png',
        image: 'quesadilla.png',
        menuTitle: 'Quesadilla',
        dishes: [
            {
                title: 'Nachos Supreme',
                description:
                    'Sour cream with a hint of queso fresco',
                price: '$10',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Chips & Salsa',
                description:
                    'Chips with freshly made salsa.',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Quesadilla (Chicken, Steak or Ground beef)',
                description:
                    'Flour tortilla with side of lettuce, tomato, and sour cream. (Extra Topping $0.25 each)',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'French Fries with Nacho Cheese',
                description:
                    'Chicken, Steak or Ground beef – ADD $1',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Mexican French Fries Supreme',
                description:
                    'tomato, guacamole, sour cream, nacho cheese with a hint of queso fresco',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }
            , {
                title: 'Cheese Quesadilla (Flour Tortilla)',
                description:
                    'Melted C​hihuahua cheese with Mexican Sausage.',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Chips & Guacamole',
                description:
                    'Chips with freshly made guacamole.',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Elote (corn)',
                description:
                    ' ',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Chips & Queso',
                description:
                    ' ',
                price: '$9',
                img: "GUAC AND CHIPS.png"
            }


        ],
    },
    {
        category: 'ENCHILADAS DINNER',
        menuIcon: 'i-5.png',
        image: 'i-5.png',
        menuTitle: 'Enchiladas Dinner',
        dishes: [
            {
                title: 'Veggie',
                description:
                    '3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado',
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Asada (Steak)',
                description:
                    '3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Picadillo (Ground Beef)',
                description:
                    '3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Pollo (Chicken)',
                description:
                    '3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Cheese',
                description:
                    '3 Enchiladas served with red or green salsa with a side of lettuce, tomato, and avocado',
                price: '$5',
                img: "GUAC AND CHIPS.png"
            },
        ],
    },
    {
        category: 'KIDS',
        menuIcon: 'i-6.png',
        image: 'i-6.png',
        menuTitle: 'Kids',
        dishes: [
            {
                title: 'KIDS MEAL(Taco or Quesadilla)',
                description:
                    `SERVED WITH ONE SIDE OPTION:
                    1) Rice & Beans
                    2) Fries & Juice`,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }
        ],
    }, 
    {
        category: 'DESSERTS',
        menuIcon: 'i-7.png',
        image: 'i-7.png',
        menuTitle: 'Desserts',
        dishes: [
            {
                title: 'Churro',
                description:
                    `Covered in cinnamon sugar, fried to perfection, these are crispy on the outside and tender on the inside.`,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }
        ],
    }, 
    {
        category: 'DRINKS',
        menuIcon: 'tp aguas fresca.webp',
        image: 'tp aguas fresca.webp',
        menuTitle: 'Drinks',
        dishes: [
            {
                title: 'Bottle of Water',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Horchata',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: ' Bottled Water',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Jarritos',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Fouintain drinks',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Aguas Frescas: Horchata',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Aguas Frescas: Watermelon',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Aguas Frescas: Lime',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },

            {
                title: 'Bottled drinks',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: ' Aguas Frescas',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }





        ],
    }, 
    {
        category: 'SIDES',
        menuIcon: 'GUAC.png',
        image: 'GUAC.png',
        menuTitle: 'Sides',
        dishes: [
            {
                title: 'Extra Meat',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Refried Beans',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'French Fries',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Chips',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Rice',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Freshly made Guacamole',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Queso',
                description:
                    ` `,
                price: '$6',
                img: "GUAC AND CHIPS.png"
            }


        ],
    },
   
];

const cateringItems = [
    {
        category: 'PARTY TRAYS',
        menuIcon: 'PARTY TRAYS.png',
        image: 'PARTY TRAYS.png',
        menuTitle: 'Party Trays',
        dishes: [
            {
                title: `<b>Taco Trays <b> <br> <div class="subitem"> (20 Tacos) </div>`,
                description: '',
                price: '',
                img: "GUAC AND CHIPS.png"
            },
            {
                title: 'Regular Protein',
                description: '',
                price: '$78',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Signature Protein',
                description: '',
                price: '$84',
                img: "GUAC AND CHIPS.png"
            }, {
                title: `<b>Burrito Trays <b> <br> <div class="subitem"> (10 Burritos) </div>`,
                description: '',
                price: '',
            }, {
                title: 'Regular Protein',
                description: '',
                price: '$96',
            }, {
                title: 'Signature Protein',
                description: '',
                price: '$106',
                img: "GUAC AND CHIPS.png"
            }
        ],
        orderNow: 'link'
    },
    {
        category: 'LIVE CATERING',
        menuIcon: 'LIVE CATERING.png',
        image: 'LIVE CATERING.png',
        menuTitle: 'Live Catering',
        dishes: [
            {
                title: `
                    <div class="mkjk">
                        <div class="dwee"> <p> Tacos </p>   <p> Mini Burritos </p> </div> <div class="dwee"> <p> Quesadillas </p>   <p> Veg Or 2 Proteins </p> </div>
                    </div>
                `,
                description: '',
                price: '',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Toppings:',
                description: 'Lettuce, Cilantro, Onions, Tomatoes, Cheese',
                price: '',
                img: "GUAC AND CHIPS.png"
            }, {
                title: 'Chips, Salsa and Guacamole (at additional cost)',
                description: `*Utensils – $1 per person <br> 
                <div class="mkjkj">
                    $15 Per Person, Minimum 75 People,
3 Live Servers at $300 for 2 Hours
                </div>
                `,
                price: '',
                img: "GUAC AND CHIPS.png"
            }
        ], orderNow: 'link'
    },
//     {
//         category: 'BUFFET STYLE CATERING',
//         menuIcon: 'INDIVISUAL CATERING.png',
//         image: 'INDIVISUAL CATERING.png',
//         menuTitle: 'BUFFET STYLE CATERING',
//         dishes: [
//             {
//                 title: '',
//                 description: ` <div class="mkjkj">
//                    Half Tray of Meat, 9×9 Topping Tray, 50 Tortillas, Side of Rice & Beans, Serves 15-20 People for $240 <br>
//                    <div class="kkikp">
// (Starting At $12 Per Person)
//                    </div>
//                 </div>`,
//                 price: '',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: '<b> Meat Trays </b>',
//                 description: "Chicken Chipotle, Steak, Barbacoa, Pork, Groundbeef",
//                 price: '',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: 'Half Tray',
//                 description: "",
//                 price: '$132',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: 'Full Tray',
//                 description: "",
//                 price: '$240',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: '<b> Topping Trays </b>',
//                 description: "Lettuce, Tomatoes, Onion, Cilantro, Cheese",
//                 price: '',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: '9x9 Tray',
//                 description: "",
//                 price: '$36',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: 'Half Tray',
//                 description: "",
//                 price: '$72',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: '<b> Tortillas </b>',
//                 description: "Lettuce, Tomatoes, Onion, Cilantro, Cheese",
//                 price: '',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: '50 Tortillas',
//                 description: "",
//                 price: '$24',
//                 img: "GUAC AND CHIPS.png"
//             }, {
//                 title: '100 Tortillas',
//                 description: "",
//                 price: '$48',
//                 img: "GUAC AND CHIPS.png"
//             }
//         ], orderNow: 'link'
//     },
    {
        category: 'INDIVIDUAL CATERING PACKS',
        menuIcon: 'BUFFET STYLE CATERING.png',
        image: 'BUFFET STYLE CATERING.png',
        menuTitle: 'Individual Catering Packs',
        dishes: [
            {
                title: '',
                description: ` <div class="mkjkj">Starting At $14 <br>
                   <div class="kkikp">

(Minimum of 25 Orders)
                   </div>
                </div>`,
                price: '',
                img: "GUAC AND CHIPS.png"
            }
        ], orderNow: 'link'
    }, {
        category: 'PROKIT',
        menuIcon: 'tp pro kit b.png',
        image: 'tp pro kit b.png',
        menuTitle: 'Pro Kit',
        dishes: [
            {
                title: '',
                description: ` <div class="mkjkj">Starting At $ <br>
                   <div class="kkikp">

(Minimum of 25 Orders)
                   </div>
                </div>`,
                price: '',
                img: "GUAC AND CHIPS.png"
            }
        ], orderNow: 'link'
    },
     {
        category: 'SIDES',
        menuIcon: '/600px_tp chips.png',
        image: '/600px_tp chips.png',
        menuTitle: 'Sides',
        dishes: [
            {
                title: '',
                description: ` <div class="mkjkj">Starting At $ <br>
                   <div class="kkikp">

(Minimum of 25 Orders)
                   </div>
                </div>`,
                price: '',
                img: "GUAC AND CHIPS.png"
            }
        ], orderNow: 'link'
    }

];

export default function DiscoverMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const menuScrollRef = useRef(null);
    const autoScrollRef = useRef(null);



    // const menuScrollRef = useRef(null);

    // const scrollMenu = (direction) => {
    //     if (!menuScrollRef.current) return;

    //     const scrollAmount = 220; // card width + gap
    //     menuScrollRef.current.scrollBy({
    //         left: direction === "left" ? -scrollAmount : scrollAmount,
    //         behavior: "smooth",
    //     });
    // };


    const [menuType, setMenuType] = useState('discover'); // 'discover' or 'catering'
    const [activeTab, setActiveTab] = useState(0);
   

    const currentItems = menuType === 'discover' ? menuItems : cateringItems;
    const CURRENT = currentItems[activeTab];

    // ✅ Dynamic URL nikalne ka logic

    const DYNAMIC_ORDER_LINK = "https://order.toasttab.com/online/taco-pros-chicago-halsted-833-west-chicago-avenue";

    const [animateIndex, setAnimateIndex] = useState(null);

     const startAutoScroll = () => {
        stopAutoScroll();

        autoScrollRef.current = setInterval(() => {
            if (!menuScrollRef.current) return;

            const container = menuScrollRef.current;
            const scrollAmount = 220;

            if (
                container.scrollLeft + container.clientWidth >=
                container.scrollWidth - 10
            ) {
                container.scrollTo({
                    left: 0,
                    behavior: "smooth",
                });
            } else {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }, 4000);
    };

    const stopAutoScroll = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }
    };

    const getMenuCategoryId = (item) => {
        const categoryId = item.menuTitle.toLowerCase().replace(/\s+/g, "-");
        return categoryId === "appetizers" ? "appetizer" : categoryId;
    };

    const getCateringCategoryId = (item) => {
        const categoryId = item.menuTitle.toLowerCase().replace(/\s+/g, "-");
        const categoryMap = {
            "individual-catering-packs": "individual-packs",
            "pro-kit": "prokit",
        };

        return categoryMap[categoryId] || categoryId;
    };

     useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    useEffect(() => {
        if (location.pathname === "/catering") {
            setMenuType("catering");
            setActiveTab(0);
        } else {
            setMenuType("discover");
            setActiveTab(0);
        }
    }, [location.pathname]);

    const handleClick = (idx) => {
        setActiveTab(idx);
        setAnimateIndex(idx);

        // remove animation after it plays (so it can replay next click)
        setTimeout(() => setAnimateIndex(null), 700);

        const selectedItem = currentItems[idx];

        if (menuType === "discover") {
            navigate(`/menu?category=${getMenuCategoryId(selectedItem)}`);
        } else {
            navigate(`/catering?category=${getCateringCategoryId(selectedItem)}`);
        }
    };

     const scrollMenu = (direction) => {
        if (!menuScrollRef.current) return;

        stopAutoScroll();

        const scrollAmount = 220;

        menuScrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });

        setTimeout(startAutoScroll, 3000);
    };





    return (
        <>


            <section className="discoverMenu">

                <h2>{menuType === 'discover' ? 'Discover Menu' : 'Catering Menu'}</h2>
                <span className="underline"></span>

                {/* Menu Type Switcher */}
                <div className="menuTypeTabs">
                    <button
                        onClick={() => {
                            setMenuType('discover');
                            setActiveTab(0);
                        }}
                        className={menuType === 'discover' ? 'activeTab' : ''}
                    >
                        Discover
                    </button>
                    <button
                        onClick={() => {
                            setMenuType('catering');
                            setActiveTab(0);
                        }}
                        className={menuType === 'catering' ? 'activeTab' : ''}
                    >
                        Catering
                    </button>
                </div>

                <div className="discoverMenuCnt">

                    {/* ===== Menu Tabs with Arrows ===== */}
                    <div className="mdx-menu-wrapper">

                        {/* Left Arrow */}
                        <button
                            type="button"
                            className="mdx-scroll-arrow mdx-left"
                            onClick={() => scrollMenu("left")}
                            aria-label="Scroll menu left"
                        >
                            ❮
                        </button>

                        {/* Scrollable Menu */}
                        <div
                            ref={menuScrollRef}
                            className={`menuDiscover mdx-menu-scroll ${menuType === "catering" ? "justify-center catering-mode" : "justify-start"
                                }`}
                             onMouseEnter={stopAutoScroll}
                        onMouseLeave={startAutoScroll}
                        onTouchStart={stopAutoScroll}
                        onTouchEnd={startAutoScroll}
                        >
                            {currentItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`menuDiscoverCard ${idx === activeTab ? "active" : ""}`}
                                    onClick={() => handleClick(idx)}
                                >

                                    <div className="MenuCage">
                                        <img
                                            src={item.menuIcon}
                                            alt={`${item.category} icon`}
                                            className={`menuIcon ${animateIndex === idx ? "bounce" : ""
                                                }`}
                                        />

                                    </div>

                                    <span>{item.menuTitle}</span>
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            type="button"
                            className="mdx-scroll-arrow mdx-right"
                            onClick={() => scrollMenu("right")}
                            aria-label="Scroll menu right"
                        >
                            ❯
                        </button>
                    </div>


                    <div className="btnCenter">
                        <TacoButton text="View Full Menu"
                            width="clamp(155px, 22vw, 302px)"
                            height="clamp(51px, 5vw, 57px)"
                            styleType="1"
                            fontSize="clamp(18px, 2vw, 24px)"
                            link="/menu"
                        />
                    </div>


                </div>
            </section>

        </>
    );
}
