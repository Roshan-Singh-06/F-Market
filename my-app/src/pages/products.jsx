import ProductCard from '../components/ProductCard';

const products = [
  {
    image: "https://source.unsplash.com/400x300/?eggs",
    name: "Pasture-Raised Eggs",
    price: "$6.99/dozen",
    brand: "Morning Harvest Poultry",
    description: "Fresh eggs from our free-range hens that spend their days roaming freely."
  },
  {
    image: "https://source.unsplash.com/400x300/?strawberries",
    name: "Organic Strawberries",
    price: "$5.99/pint",
    brand: "Sunshine Acres Farm",
    description: "Juicy strawberries picked at peak ripeness for maximum flavor."
  },
  // Add more products here
];

const Products = () => {
  return (
    <div className="bg-[#fdf6ec] py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-[#5b2c06] mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
