import React from 'react';
import Hero from '../components/home/Hero';
import Featured from '../components/home/Featured';
import WhyShopWithUs from '../components/home/WhyShopWithUs';
import ExploreMore from '../components/home/ExploreMore';

const Home = () => {
  return (
    <div className="bg-[#020617]">
      {/* Main sections in the requested order */}
      <Hero />
      <Featured />
      <WhyShopWithUs />
      <ExploreMore />
    </div>
  );
};

export default Home;
