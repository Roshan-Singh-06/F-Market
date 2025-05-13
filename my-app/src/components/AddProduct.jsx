import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'react-feather';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    pricePerKg: '', // Updated field name for backend compatibility
    stock: '',
    description: '',
    category: '',
    unit: 'kg', // Default unit
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData.images.forEach(image => {
          formDataToSend.append('images', image);
        });
      } else if (key === 'pricePerKg') {
        formDataToSend.append('price', formData[key]); // Map pricePerKg to price for backend
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        navigate('/dashboard/products');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: [...e.target.files]
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-[#5C4033] mb-6">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-[#5C4033]">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#5C4033]"> Price (₹/kg)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerKg}
                onChange={(e) => setFormData({...formData, pricePerKg: e.target.value})}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#5C4033]">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#5C4033]">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]"
              required
            >
              <option value="">Select category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="pulses">Pulses</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[#5C4033]">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#5C4033]">Product Images</label>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="images"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-[#8B5E3C]" />
                <p className="mt-2 text-sm text-[#5C4033]">Click to upload images</p>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8B5E3C] text-white py-3 rounded-lg hover:bg-[#6e462b] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;