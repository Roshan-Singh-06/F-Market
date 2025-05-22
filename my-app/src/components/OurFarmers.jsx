import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OurFarmers = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/farmers/all');
        setFarmers(res.data.farmers.slice(0, 3)); // Show top 3 farmers
      } catch (err) {
        setFarmers([]);
      }
    };
    fetchFarmers();
  }, []);

  return (
    <section className="bg-[#fef9f4] py-16 px-6 md:px-20 text-[#4b2e1e]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#7b3f00]">Our Farmers</h2>
        <p className="mt-2 text-lg text-[#5a4434]">Meet the people who grow your food with care</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {farmers.map((farmer, idx) => (
          <div key={farmer._id || idx} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <img
              src={farmer.imageUrl ? `http://localhost:5000${farmer.imageUrl}` : '/default-farmer.jpg'}
              alt={farmer.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#6b3f1d]">{farmer.name}</h3>
              <p className="text-[#5a4434] mt-2">{farmer.description}</p>
              <span className="inline-block mt-4 bg-[#9b8c76] text-white text-sm px-3 py-1 rounded-full">
                Featured Farmer
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/farmers"
          className="inline-block bg-[#6b3f1d] text-white px-6 py-3 rounded-md hover:bg-[#8c5125] transition"
        >
          Meet All Our Farmers
        </Link>
      </div>
    </section>
  );
};

export default OurFarmers;
