import React, { useState, useEffect } from 'react';

const farmers = [
    {
        name: 'Ramesh Patil',
        text: 'Ramesh grows organic vegetables with love and care. He believes healthy soil means healthy food.',
        image: '/farmer7.jpg',
    },
    {
        name: 'Sunita Devi',
        text: 'Sunita leads a group of women farmers who are transforming rural livelihoods with sustainable farming.',
        image: '/farmer4.jpg',
    },
    {
        name: 'Rupesh Yadav',
        text: 'Rupesh specializes in grains and pulses, and ensures every harvest is of the best quality.',
        image: '/farmer8.jpg',
    },
];

const FarmerCarousel = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  
  const currentFarmer = farmers[index];
  const fullText = currentFarmer?.text || '';

  // Typewriter effect
  useEffect(() => {
    if (!fullText) return;
    
    let charIndex = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [fullText]); // Only depend on fullText since it contains all we need

  const prevFarmer = () => setIndex((index - 1 + farmers.length) % farmers.length);
  const nextFarmer = () => setIndex((index + 1) % farmers.length);

  if (!currentFarmer) return null;

  return (
    <section className="bg-[#fdf6ee] py-12 px-6 md:px-20 text-white">
      <div className="bg-white text-[#4b2e1e] rounded-2xl shadow-2xl p-6 md:flex items-center">
        {/* Text Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 px-4">
          <h2 className="text-2xl font-bold mb-3 text-[#6b2d06]">{currentFarmer.name}</h2>
          <p className="text-lg min-h-[100px] font-medium leading-7">{displayedText}</p>
        </div>

        {/* Image + Controls */}
        <div className="md:w-1/2 relative flex items-center justify-center">
          {currentFarmer.image && (
            <img
              src={currentFarmer.image}
              alt={currentFarmer.name}
              className="w-full max-w-md rounded-xl shadow-lg object-cover h-72"
            />
          )}
          {/* Arrows */}
          <button
            onClick={prevFarmer}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#6b2d06] text-white p-2 rounded-full hover:bg-[#823c10] shadow"
          >
            &#8592;
          </button>
          <button
            onClick={nextFarmer}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6b2d06] text-white p-2 rounded-full hover:bg-[#823c10] shadow"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default FarmerCarousel;
