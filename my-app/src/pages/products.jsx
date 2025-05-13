import { useEffect, useState } from 'react';
import { apiService } from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiService.get('/products');
        setProducts(res.data);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Filter by category if selected
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div className="bg-[#fdf6ec] py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-[#5b2c06] mb-8">Our Products</h1>
      <div className="mb-6">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="pulses">Pulses</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product._id || index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
