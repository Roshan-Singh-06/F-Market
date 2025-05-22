import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      const res = await axios.get('http://localhost:5000/api/farmers/all');
      setFarmers(res.data.farmers);
    };
    fetchFarmers();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5E1] py-12 px-4">
      <h2 className="text-3xl font-bold text-[#8B5E3C] mb-8 text-center">Our Farmers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {farmers.map(farmer => (
          <div key={farmer._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-[#8B5E3C]">
            <img
              src={farmer.imageUrl ? `http://localhost:5000${farmer.imageUrl}` : '/default-farmer.jpg'}
              alt={farmer.name}
              className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-[#FFF5E1]"
            />
            <h3 className="text-xl font-bold text-[#5C4033]">{farmer.name}</h3>
            <p className="text-[#8B5E3C] mt-2 text-center">{farmer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmers;
