// FarmerInfoPage.jsx
import React, { useState } from "react";

export default function FarmerInfoPage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-cream p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-brown mb-6 text-center">Farmer Information</h2>

        <form className="space-y-5">
          {/* Farmer Image Upload */}
          <div className="flex items-center justify-center flex-col">
            {image && (
              <img
                src={image}
                alt="Farmer"
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-brown"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-brown"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-brown font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-brown focus:outline-none focus:ring-2 focus:ring-brown bg-cream text-brown"
              placeholder="Enter full name"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-brown font-medium mb-1">Contact Number</label>
            <input
              type="tel"
              className="w-full p-3 rounded-xl border border-brown bg-cream focus:ring-brown text-brown"
              placeholder="Enter contact number"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-brown font-medium mb-1">Village/City</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-brown bg-cream focus:ring-brown text-brown"
              placeholder="Enter location"
            />
          </div>

          {/* Farm Size */}
          <div>
            <label className="block text-brown font-medium mb-1">Farm Size (in acres)</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border border-brown bg-cream focus:ring-brown text-brown"
              placeholder="Enter farm size"
            />
          </div>

          {/* Crops */}
          <div>
            <label className="block text-brown font-medium mb-1">Crops Grown</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-brown bg-cream focus:ring-brown text-brown"
              placeholder="E.g., Wheat, Rice, Vegetables"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-brown font-medium mb-1">Short Bio</label>
            <textarea
              className="w-full p-3 rounded-xl border border-brown bg-cream focus:ring-brown text-brown"
              rows="3"
              placeholder="Tell us a bit about your farming journey..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-brown text-white px-6 py-3 rounded-xl hover:bg-opacity-90"
            >
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
