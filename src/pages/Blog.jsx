import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import "./BlogPage.css";

const posts = {
  "taco-trends-guide": {
    title: "TACO TRENDS GUIDE: WHAT'S HOT RIGHT NOW",
    subtitle: "BIRRIA, PLANT-BASED IDEAS AND BIG FLAVOR MOVES",
    image: "/b1.png",
    description: "Discover taco trends, from birria and quesabirria to plant-based ideas and global fusion flavors.",
    intro: "Taco culture keeps moving because great food keeps borrowing, remixing and getting better. The best trends make every bite juicier, brighter or easier to share.",
    sections: [
      ["Birria Still Leads", "Rich, slow-cooked fillings and crisped tortillas keep birria and quesabirria popular because they deliver comfort and texture in the same bite."],
      ["Plant-Based Choices", "Vegetable-forward tacos, beans, corn, avocado and flavorful salsas give guests more ways to enjoy fresh Mexican food."],
      ["Bolder Salsas", "Guests want heat with character, from smoky red salsa to bright green salsa and chile-forward finishes."]
    ]
  },
  "taco-pairing-guide": {
    title: "TACO PAIRING GUIDE: SIPS & SIDES TO COMPLETE YOUR MEAL",
    subtitle: "PERFECT PAIRINGS THAT ELEVATE EVERY BITE",
    image: "/b3.jpg",
    description: "Elevate your taco experience with refreshing drinks, street-style sides and tips for a balanced meal.",
    intro: "Tacos are all about bold flavors, and the right sides and drinks can take them even further. Pairing your tacos well creates a balanced meal that hits every note.",
    sections: [
      ["Why Taco Pairings Matter", "Great tacos bring spice, texture and richness. The right pairings help balance those elements by cooling heat, adding crunch or enhancing flavor."],
      ["Drinks That Pair Perfectly", "Margaritas, aguas frescas, Mexican sodas, horchata, iced tea and lemonade all bring a different kind of refreshment to the table."],
      ["Must-Try Sides", "Street-style corn, chips and salsa, guacamole, rice, beans, fries and loaded nachos add contrast and make the meal more complete."]
    ]
  },
  "taco-craft-guide": {
    title: "TACO CRAFT GUIDE: FROM GRILL TO PLATE",
    subtitle: "FRESH TORTILLAS, MARINADES AND BALANCED TOPPINGS",
    image: "/b3.jpg",
    description: "See how great tacos come together with fresh tortillas, bold marinades and careful layering.",
    intro: "A great taco is built in layers. Tortilla, protein, salsa and garnish all need to work together so the final bite feels balanced instead of busy.",
    sections: [
      ["Start With the Base", "Warm tortillas create the structure and aroma that carry the rest of the taco."],
      ["Build Flavor Early", "Marinades, seasoning and cooking technique create depth before toppings ever touch the plate."],
      ["Finish With Contrast", "Fresh onion, cilantro, lime, salsa and crisp textures keep rich fillings lively."]
    ]
  }
};

const Blog = () => {
  const { slug = "taco-pairing-guide" } = useParams();
  const post = posts[slug] || posts["taco-pairing-guide"];

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Taco Pros`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://tacopros.com/blog/${slug}`} />
      </Helmet>

      <div className="pop-blog-wrapper">
        <img src={post.image} alt={post.title} className="pop-cover-image" loading="eager" />

        <div className="pop-container">
          <header className="pop-header">
            <h1 className="pop-main-title">{post.title}</h1>
            <h2 className="pop-sub-title">{post.subtitle}</h2>
          </header>

          <article className="pop-content-section">
            <p className="pop-text">{post.intro}</p>
            {post.sections.map(([heading, text]) => (
              <React.Fragment key={heading}>
                <h3 className="pop-heading">{heading}</h3>
                <p className="pop-text">{text}</p>
              </React.Fragment>
            ))}
          </article>
        </div>
      </div>
    </>
  );
};

export default Blog;
