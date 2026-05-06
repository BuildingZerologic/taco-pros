import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://tacopros.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

const seoByPath = {
  "/": {
    title: "Taco Pros | Fresh Tacos, Burritos & Mexican Food",
    description: "Order fresh tacos, burritos, catering and rewards from Taco Pros. Authentic Mexican food made fresh daily.",
  },
  "/our-story": {
    title: "Our Story | Taco Pros",
    description: "Learn the Taco Pros story, our fresh Mexican food roots, and the people behind our tacos, burritos, catering and restaurants.",
  },
  "/menu": {
    title: "Menu | Taco Pros Tacos, Burritos, Bowls & Catering",
    description: "Explore the Taco Pros menu with tacos, burritos, tortas, enchiladas, bowls, sides, desserts and drinks. Order online today.",
  },
  "/catering": {
    title: "Catering Menu | Taco Pros Party Trays & Live Catering",
    description: "Plan your event with Taco Pros catering, including party trays, live catering, buffet style catering, individual packs and sides.",
  },
  "/rewards": {
    title: "Rewards | Taco Pros",
    description: "Join Taco Pros Rewards to earn points, get member benefits and enjoy fresh Mexican food perks.",
  },
  "/hiring": {
    title: "Hiring | Taco Pros Careers",
    description: "Apply for Taco Pros restaurant jobs and career opportunities across our locations.",
  },
  "/franchising": {
    title: "Franchising | Taco Pros",
    description: "Explore Taco Pros franchise opportunities and submit your franchise interest application.",
  },
  "/locations": {
    title: "Locations | Taco Pros Near You",
    description: "Find Taco Pros locations, directions, phone numbers and online ordering for fresh tacos and Mexican food near you.",
  },
  "/contact": {
    title: "Contact Us | Taco Pros",
    description: "Contact Taco Pros for questions, feedback, locations, catering, hiring and general inquiries.",
  },
  "/news": {
    title: "News & Taco Guides | Taco Pros",
    description: "Read Taco Pros news, food guides and taco inspiration for pairings, trends and fresh Mexican flavors.",
  },
  "/blog": {
    title: "Taco Pairing Guide | Taco Pros",
    description: "Explore drinks, sides and pairing tips that complete your Taco Pros meal.",
  },
};

export default function RouteSeo() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/locations/")) {
    return null;
  }

  const key = pathname;
  const seo = seoByPath[key] || {
    title: "Taco Pros",
    description: "Fresh Mexican food, tacos, burritos, catering, rewards and online ordering from Taco Pros.",
  };
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content="Taco Pros" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Helmet>
  );
}
