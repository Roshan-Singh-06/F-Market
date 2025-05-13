import React, { useEffect, useState } from 'react';
import { apiService } from '../api/axiosInstance';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiService.get('/products');
        // Show only the first 5 products as featured
        setProducts(res.data.slice(0, 5));
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-10 px-4 md:px-16 bg-[#fdf6ee]">
      <h2 className="text-3xl font-bold text-center text-[#5b2c06] mb-2">Featured Products</h2>
      <p className="text-center text-lg text-gray-700 mb-10">
        Browse our selection of fresh, seasonal products
      </p>

      <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 min-w-[280px]">
            <img
              src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-[#5b2c06]">
                  {product.name}
                </h2>
                <span className="text-sm text-[#5b2c06]">₹{product.price}/{product.unit || 'kg'}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 text-sm">In Stock: {product.stock}</span>
                <button className="bg-[#823e17] text-white px-4 py-2 rounded-md text-sm hover:bg-[#692f0f]">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

