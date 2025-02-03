import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: 'Building Materials',
      description: 'Cement, blocks, sand, and aggregates',
      href: '/products/building-materials',
      imageSrc: '/images/categories/building-materials.jpg',
    },
    {
      name: 'Plumbing',
      description: 'Pipes, fittings, and fixtures',
      href: '/products/plumbing',
      imageSrc: '/images/categories/plumbing.jpg',
    },
    {
      name: 'Electrical',
      description: 'Wires, switches, and accessories',
      href: '/products/electrical',
      imageSrc: '/images/categories/electrical.jpg',
    },
    {
      name: 'Tools & Equipment',
      description: 'Hand tools and power tools',
      href: '/products/tools',
      imageSrc: '/images/categories/tools.jpg',
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {categories.map((category) => (
              <div key={category.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={category.imageSrc}
                    alt={category.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  <Link to={category.href}>
                    <span className="absolute inset-0" />
                    {category.name}
                  </Link>
                </h3>
                <p className="text-base text-gray-500">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
