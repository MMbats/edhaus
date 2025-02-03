import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, DollarSign, Building2 } from 'lucide-react';
import ScrollReveal from 'scrollreveal';

const WhyShopWithUs = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease',
      reset: true,
    });

    sr.reveal('.feature-card', {
      interval: 200,
    });
  }, []);

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Over 24 Product Categories",
      description: "Build with Quality Locally Sourced Materials",
      image: "/images/products/construction-site.jpg",
      link: "/products",
      size: "lg:col-span-1"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Over 40 Active Transporters",
      description: "Capitalize on our Vast Logistics Network for Delivery",
      image: "/images/products/delivery-truck.jpg",
      link: "/delivery",
      size: "lg:col-span-1"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Affordable Market Rates",
      description: "Best Prices for Quality Construction Materials",
      image: "/images/products/affordable-rates.jpg",
      link: "/pricing",
      size: "lg:col-span-1"
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Over 20 Supported Brands",
      description: "Quality Construction Partners You Can Trust",
      image: "/images/products/construction-worker.jpg",
      link: "/brands",
      size: "lg:col-span-2"
    }
  ];

  return (
    <div className="bg-[#0a192f] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
            Why Shop with Us
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.link}
              className={`feature-card group relative overflow-hidden rounded-2xl ${feature.size} h-[400px] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20`}
            >
              <div className="relative w-full h-full bg-[#112240] rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/80 to-transparent">
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
                    {feature.icon}
                  </div>
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-3 transform transition-all duration-500 group-hover:translate-x-2 group-hover:bg-orange-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div className="absolute bottom-8 left-6 text-white transform transition-all duration-500 group-hover:translate-y-[-8px]">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 mb-4 inline-block transform transition-all duration-500 group-hover:bg-orange-500">
                      <p className="text-sm font-medium">{feature.title}</p>
                    </div>
                    <h3 className="text-3xl font-bold max-w-[80%] leading-tight">
                      {feature.description}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyShopWithUs;
