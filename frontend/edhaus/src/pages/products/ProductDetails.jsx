import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, getProduct]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show cart modal
    document.getElementById("cartModal").classList.remove("hidden");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-600">Home</Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
            </svg>
          </li>
          <li className="flex items-center">
            <Link to="/products" className="text-gray-600">Products</Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
            </svg>
          </li>
          <li className="flex items-center">
            <Link to={`/category/${product.category_id}`} className="text-gray-600">
              {product.category_name}
            </Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
            </svg>
          </li>
          <li>
            <span className="text-gray-800">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <img
                src={product.image_url || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            {product.additional_images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-auto rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-8">
            <div className="text-2xl font-bold mb-2">
              KES {product.price.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border rounded-lg">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-x py-2"
              />
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add To Cart
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <div className="space-y-4">
              {product.specifications?.map((spec, index) => (
                <div key={index} className="flex">
                  <div className="w-1/3 text-gray-600">{spec.name}</div>
                  <div className="w-2/3">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <div id="cartModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <div className="mb-6">
            <div className="flex justify-between items-center py-4 border-b">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">Quantity: {quantity}</p>
              </div>
              <div className="text-lg font-bold">
                KES {(product.price * quantity).toLocaleString()}
              </div>
            </div>
            <div className="flex justify-between items-center py-4">
              <div className="font-bold">Total</div>
              <div className="text-xl font-bold">
                KES {(product.price * quantity).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => document.getElementById("cartModal").classList.add("hidden")}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
