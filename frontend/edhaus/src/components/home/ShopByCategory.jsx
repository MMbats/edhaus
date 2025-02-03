import React from 'react';
import { Link } from 'react-router-dom';

const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      name: 'Cement & Concrete',
      href: '/products/cement',
      imageSrc: '/images/categories/cement.jpg',
      imageAlt: 'Various types of cement and concrete products.',
      description: 'Quality cement for all your construction needs',
    },
    {
      id: 2,
      name: 'Steel & Metal',
      href: '/products/steel',
      imageSrc: '/images/categories/steel.jpg',
      imageAlt: 'Steel bars and metal products.',
      description: 'Reinforcement bars and structural steel',
    },
    {
      id: 3,
      name: 'Roofing Materials',
      href: '/products/roofing',
      imageSrc: '/images/categories/roofing.jpg',
      imageAlt: 'Various roofing materials and accessories.',
      description: 'Complete roofing solutions',
    },
    {
      id: 4,
      name: 'Hardware & Tools',
      href: '/products/hardware',
      imageSrc: '/images/categories/hardware.jpg',
      imageAlt: 'Various construction tools and hardware items.',
      description: 'Essential tools and hardware supplies',
    },
    {
      id: 5,
      name: 'Paint & Finishes',
      href: '/products/paint',
      imageSrc: '/images/categories/paint.jpg',
      imageAlt: 'Paint cans and finishing materials.',
      description: 'Interior and exterior paints',
    },
    {
      id: 6,
      name: 'Doors & Windows',
      href: '/products/doors',
      imageSrc: '/images/categories/doors.jpg',
      imageAlt: 'Various types of doors and windows.',
      description: 'Quality doors and windows',
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
            <Link
              to="/products"
              className="text-orange-600 hover:text-orange-500 font-semibold flex items-center"
            >
              View All
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {categories.map((category) => (
              <Link key={category.id} to={category.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
