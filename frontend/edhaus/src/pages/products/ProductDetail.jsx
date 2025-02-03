import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useCart } from "../../hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  // This would typically come from an API
  const product = {
    id: 1,
    name: "Steel Reinforcement Bars",
    price: "KES 7,500",
    rating: 4,
    stock: 150,
    description: "High-quality steel reinforcement bars for construction.",
    specifications: [
      "Grade: 60",
      "Length: 12 meters",
      "Diameter: 16mm",
      "Yield Strength: 500 MPa",
      "Ultimate Strength: 650 MPa",
    ],
    images: [
      {
        id: 1,
        src: "/images/products/steel-bars.jpg",
        alt: "Steel Reinforcement Bars - Main View",
      },
      // Add more images as needed
    ],
    sizes: [
      { name: "12mm", inStock: true },
      { name: "16mm", inStock: true },
      { name: "20mm", inStock: true },
      { name: "25mm", inStock: true },
    ],
    features: [
      "Corrosion resistant",
      "High tensile strength",
      "Meets Kenya Bureau of Standards requirements",
      "Suitable for all structural applications",
    ],
    details:
      "Our steel reinforcement bars are manufactured to the highest quality standards, ensuring durability and reliability in construction projects.",
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize?.name,
        quantity: quantity,
        image: product.images[0].src,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="w-full aspect-square rounded-lg overflow-hidden">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{product.price}</p>
          </div>

          {/* Stock Status */}
          <div className="mt-4">
            <p className="text-green-600 font-medium">
              In Stock ({product.stock} available)
            </p>
          </div>

          {/* Size selector */}
          {product.sizes && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm border rounded-md ${
                      selectedSize?.name === size.name
                        ? "border-yellow-600 bg-yellow-50 text-yellow-600"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="mt-6">
            <label
              htmlFor="quantity"
              className="text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-yellow-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add to Cart
          </button>

          {/* Product details */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <div className="mt-4 prose prose-sm text-gray-500">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">
              Specifications
            </h2>
            <div className="mt-4">
              <ul className="list-disc space-y-2 pl-4 text-sm">
                {product.specifications.map((spec) => (
                  <li key={spec} className="text-gray-500">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">Features</h2>
            <div className="mt-4">
              <ul className="list-disc space-y-2 pl-4 text-sm">
                {product.features.map((feature) => (
                  <li key={feature} className="text-gray-500">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
