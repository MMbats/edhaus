import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

const Featured = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      delay: 200,
      easing: "ease",
      reset: true,
    });

    sr.reveal(".product-card", {
      interval: 200,
    });
  }, []);

  const featuredProducts = [
    {
      id: 1,
      category: "Wire Products",
      imageSrc: "/images/products/wire-products.jpg",
      imageAlt: "Wire Products Category",
      link: "/products/wire-products"
    },
    {
      id: 2,
      category: "Plumbing & Pipes",
      imageSrc: "/images/products/pipes.jpg",
      imageAlt: "PVC Pipes & Fittings",
      link: "/products/pipes"
    },
    {
      id: 3,
      category: "Paints & Coatings",
      imageSrc: "/images/products/paints.jpg",
      imageAlt: "Paint Cans & Brushes",
      link: "/products/paints"
    },
    {
      id: 4,
      category: "Wood & Boards",
      imageSrc: "/images/products/wood.jpg",
      imageAlt: "Wooden Boards & Timber",
      link: "/products/wood"
    },
    {
      id: 5,
      category: "Cement",
      imageSrc: "/images/products/cement.jpg",
      imageAlt: "Construction Grade Sand per ton",
      link: "/products/cement"
    },
    {
      id: 6,
      category: "Steel",
      imageSrc: "/images/products/steel.jpg",
      imageAlt: "Steel Bars & Rods",
      link: "/products/steel"
    },
    {
      id: 7,
      category: "Conducts & Fittings",
      imageSrc: "/images/products/conducts.jpg",
      imageAlt: "Construction Grade Sand per ton",
      link: "/products/conducts"
    },
    {
      id: 8,
      category: "Polythene & Heat insulation",
      imageSrc: "/images/products/heat.jpg",
      imageAlt: "Construction Grade Sand per ton",
      link: "/products/polythene"
    }
  ];

  return (
    <div className="bg-[#020617] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] to-[#020617] opacity-80"></div>
      <div className="relative max-w-7xl mx-auto py-20 px-4 sm:py-28 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-20">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 font-[Poppins]">
            Top Categories
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              to={product.link}
              key={product.id}
              className="product-card group relative block h-[400px] rounded-3xl overflow-hidden"
            >
              <div className="relative w-full h-full bg-[#0a192f]/80 rounded-3xl overflow-hidden shadow-lg shadow-black/50">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent">
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-2xl font-bold tracking-wide transform transition-all duration-500 
                      group-hover:translate-y-[-8px] group-hover:text-orange-400
                      font-[Poppins] uppercase
                      after:content-[''] after:block after:w-1/3 after:h-0.5 
                      after:bg-orange-400 after:mt-2 after:transition-all
                      after:duration-500 group-hover:after:w-full">
                      {product.category}
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

export default Featured;
