import React from "react";

const steps = [
  {
    title: "Browse Products",
    description: "Explore fresh offerings from local farmers in your area",
    icon: "🍃",
  },
  {
    title: "Place Your Order",
    description: "Submit an inquiry for the products you want to purchase",
    icon: "🧾",
  },
  {
    title: "Farmers Prepare",
    description: "Local farmers harvest and prepare your order fresh",
    icon: "🌾",
  },
  {
    title: "Enjoy Fresh Food",
    description: "Receive farm-fresh products delivered to your doorstep",
    icon: "📦",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-[#813d09] mb-4">
        How Farm Fresh Works
      </h2>
      <p className="text-center text-gray-600 text-lg mb-12">
        We make it easy to get fresh, local produce from the farm to your table
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-[#f0f3eb] text-[#606c4f] text-3xl mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-[#813d09]">{step.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
