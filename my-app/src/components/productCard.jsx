const ProductCard = ({ product }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
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
    );
  };
  
  export default ProductCard;
