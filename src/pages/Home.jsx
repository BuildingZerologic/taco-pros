import { Helmet } from "react-helmet-async";
import { Suspense, lazy, useMemo } from 'react';
import HeroSlider from '../components/HeroSlider'; 
import useVideoSource from './useVideoSource';


const NewsTicker = lazy(() => import('../components/NewsTicker'));
const SummerCarousel = lazy(() => import('../components/SummerCarousel'));
const Disc = lazy(() => import('../components/Disc'));
const ReelCarousel = lazy(() => import('../components/ReelCarousel'));
const Kit = lazy(() => import('../components/Kit'));
const BannerLocation = lazy(() => import('../components/BannerLocation'));
const ProK = lazy(() => import('../components/ProK'));
const DiscoverMenu = lazy(() => import('../components/DiscoverMenu'));

export default function Home() {

  const currentVideo = useVideoSource("/hero.mp4", "/hero-m.mp4");

  const heroProps = useMemo(() => ({
    images: null,
    video: currentVideo
  }), [currentVideo]);

  return (
    <>
      
      <Helmet>
        <title>Taco Pros | Fresh Tacos, Burritos & Mexican Food</title>

        <meta
          name="description"
          content="Order fresh tacos, burritos, catering and rewards from Taco Pros. Authentic Mexican food made fresh daily."
        />

        <meta
          name="keywords"
          content="tacos, burritos, mexican food, catering, restaurant, food delivery, order online"
        />

        <meta name="robots" content="index, follow" />

        
        <meta property="og:title" content="Taco Pros - Authentic Mexican Food" />
        <meta property="og:description" content="Fresh tacos, burritos & catering delivered fast." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />

        
        <meta name="twitter:card" content="summary_large_image" />

  
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Taco Pros",
            "image": "/logo.png",
            "servesCuisine": "Mexican",
            "description": "Authentic Mexican food made fresh daily.",
            "url": "https://tacopros.com",
            "potentialAction": {
              "@type": "OrderAction",
              "target": "https://tacopros.com/order-online"
            }
          })}
        </script>
      </Helmet>

   
      <HeroSlider {...heroProps} />

  
      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <NewsTicker />
        <DiscoverMenu />
        <Disc />
        <SummerCarousel />
        <Kit />
        <ReelCarousel />
        <ProK />
        <BannerLocation />
      </Suspense>
    </>
  );
}
