const HeroSection = () => {
  return (
    <section className="bg-[#fdf6ec] text-[#752f0a] px-6 py-16 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Fresh From Our Farms, Direct To Your Table
        </h1>
        <p className="text-gray-700 mt-6 text-lg">
          Connect directly with local farmers and enjoy the freshest organic produce delivered
          straight to your doorstep. Support sustainable farming while eating healthier.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-[#823e17] text-white px-6 py-3 rounded-md text-lg hover:bg-[#692f0f]">
            Shop Now
          </button>
          <button className="border border-[#823e17] text-[#823e17] px-6 py-3 rounded-md text-lg hover:bg-[#f3e2d9]">
            Meet Our Farmers
          </button>
        </div>

        <div className="mt-10 flex items-center space-x-4">
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/40?img=1" alt="" />
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/40?img=2" alt="" />
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/40?img=3" alt="" />
          </div>
          <p className="text-gray-600">30+ local farmers ready to serve you</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
