import React from 'react';

const farmers = [
  {
    id: 1,
    name: 'Ramesh Patil',
    location: 'Nashik, Maharashtra',
    image: 'https://i.pravatar.cc/150?img=12',
    produce: 'Vegetables & Fruits'
  },
  {
    id: 2,
    name: 'Sunita Deshmukh',
    location: 'Pune, Maharashtra',
    image: 'https://i.pravatar.cc/150?img=13',
    produce: 'Organic Grains'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    location: 'Amritsar, Punjab',
    image: 'https://i.pravatar.cc/150?img=14',
    produce: 'Pulses & Legumes'
  }
];

const Farmers = () => {
  return (
    <div className="bg-[#fdf6ec] min-h-screen py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-[#752f0a] mb-6">Meet Our Farmers</h2>
      <p className="text-lg text-gray-700 mb-10">
        Our local farmers work hard to bring you fresh, organic, and sustainable produce directly from their fields to your plate.
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
            <img src={farmer.image} alt={farmer.name} className="w-full h-52 object-cover rounded-t-xl" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#752f0a]">{farmer.name}</h3>
              <p className="text-sm text-gray-600">{farmer.location}</p>
              <p className="text-sm text-green-700 font-medium mt-2">Produces: {farmer.produce}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmers;
