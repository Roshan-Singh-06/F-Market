import React from 'react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: "$4.99/lb",
      brand: "Green Valley Farm",
      description: "Fresh, locally grown organic tomatoes picked at peak ripeness",
      image: "https://source.unsplash.com/400x300/?tomatoes"
    },
    {
      id: 2,
      name: "Farm Fresh Eggs",
      price: "$6.99/dozen",
      brand: "Happy Hens Farm",
      description: "Free-range eggs from pasture-raised chickens",
      image: "https://source.unsplash.com/400x300/?eggs"
    },
    {
      id: 3,
      name: "Organic Spinach",
      price: "$3.99/bunch",
      brand: "Pure Greens",
      description: "Nutrient-rich organic spinach leaves, freshly harvested",
      image: "https://source.unsplash.com/400x300/?spinach"
    }
  ];

  return (
    <section className="py-10 px-4 md:px-16 bg-[#fdf6ee]">
      <h2 className="text-3xl font-bold text-center text-[#5b2c06] mb-2">Featured Products</h2>
      <p className="text-center text-lg text-gray-700 mb-10">
        Browse our selection of fresh, seasonal products
      </p>

      <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 min-w-[280px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-[#5b2c06]">
                  {product.name}
                </h2>
                <span className="text-sm text-[#5b2c06]">{product.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 text-sm">In Stock</span>
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

