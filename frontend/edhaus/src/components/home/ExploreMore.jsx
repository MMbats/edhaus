import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';

const ExploreMore = () => {
  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease',
      reset: true,
    });

    // Apply animation to explore cards
    sr.reveal('.explore-card', {
      reset: true,
      interval: 200, // Adds delay between each card animation
    });
  }, []);

  const categories = [
    'Wire Products',
    'Plumbing',
    'Paint & Accessories',
    'Wood & Accessories',
    'Cement',
    'Steel',
    'Conduits and Fittings',
    'Polythene and Heat Insulators',
    'Antitermite',
    'Bathroom and Ceramics',
    'Bolts &nuts',
    'Carpentry'
  ];

  return (
    <div className="bg-[#0a192f] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
            Explore More
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category List */}
          <div className="explore-card bg-[#0a192f] rounded-lg p-6 border border-gray-800 transform transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="text-orange-500 mr-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4z" />
                </svg>
              </span>
              CATEGORY
            </h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block py-2 px-4 text-gray-300 bg-[#112240] hover:bg-[#1a365d] rounded-full transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Quality Products */}
          <div className="explore-card bg-[#112240] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            <div className="relative h-full">
              <img
                src="/images/products/quality-products.png"
                alt="Quality Products"
                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white transform transition-transform group-hover:translate-y-[-4px]">
                  Quality Products under one Roof
                </h3>
              </div>
            </div>
          </div>

          {/* Products Count */}
          <Link 
            to="/products"
            className="explore-card bg-[#112240] rounded-lg p-6 flex flex-col justify-between group hover:bg-[#1a365d] transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 transform transition-transform group-hover:translate-y-[-4px]">
                Products available for your construction
              </h3>
              <div className="text-7xl font-bold text-orange-500 mt-8 flex items-center gap-4">
                300+
                <svg
                  className="w-12 h-12 transform transition-transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-orange-500 group-hover:text-orange-400">
                View All Products
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
