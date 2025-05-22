import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FarmerProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.sellerProfile?.username || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.sellerProfile?.imageUrl || '');
  const [description, setDescription] = useState(user?.sellerProfile?.description || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/farmers/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setSuccess('Profile updated successfully!');
      setUser({ ...user, sellerProfile: res.data.profile });
      setTimeout(() => navigate('/farmers'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 flex flex-col gap-6"
        style={{ border: '2px solid #8B5E3C' }}
      >
        <h2 className="text-2xl font-bold text-[#8B5E3C] mb-4 text-center">Farmer Profile</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}

        {/* Profile Image Preview */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-[#8B5E3C] bg-[#FFF5E1] flex items-center justify-center overflow-hidden shadow">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-[#8B5E3C] text-4xl">+</span>
            )}
          </div>
          <label className="mt-3 text-[#5C4033] font-medium cursor-pointer">
            Add Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block text-[#5C4033] mb-2">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-[#5C4033] mb-2">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#8B5E3C] text-white py-2 rounded-lg hover:bg-[#6e462b] transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default FarmerProfile;