import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LocationDetail from './components/LocationDetail';
import RouteSeo from './components/RouteSeo';

const Home = lazy(() => import('./pages/Home'));
const Timeline = lazy(() => import('./components/Timeline'));
const RestaurantApp = lazy(() => import('./components/RestaurantApp'));
const Contact = lazy(() => import('./pages/Contact'));
const Hiring = lazy(() => import('./pages/Hiring'));
const FranchiseForm = lazy(() => import('./pages/FranchiseForm'));
const Location = lazy(() => import('./pages/Location'));
const CateringMenu = lazy(() => import('./pages/CateringMenu'));
const Rewards = lazy(() => import('./pages/Rewards'));
const News = lazy(() => import('./pages/News'));
const Blog = lazy(() => import('./pages/Blog'));
const Mex404 = lazy(() => import('./components/Mex404'));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loaderDiv">
        <img src="./taco logo.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="cfx-app-wrapper">
      <Header />
      <RouteSeo />

      <ScrollToTop />

      <Suspense fallback={<div className="page-loader">Loading...</div>}>
        <main className="cfx-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<Timeline />} />
            <Route path="/menu" element={<RestaurantApp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catering" element={<CateringMenu />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/franchising" element={<FranchiseForm />} />
            <Route path="/locations" element={<Location />} />
              <Route path="/locations/:slug" element={<LocationDetail />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/news" element={<News />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="*" element={<Mex404 />} />
          </Routes>
        </main>
      </Suspense>

      <Footer />
    </div>
  );
}
