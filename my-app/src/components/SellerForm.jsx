import React, { useState } from 'react';

const SellerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    farmName: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log('Form submitted:', formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-300"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-300"
            />
          </>
        );
      case 2:
        return (
          <>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-300"
            />
            <input
              type="text"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              placeholder="Farm Name"
              className="w-full p-3 border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-300"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Farm Address"
              className="w-full p-3 border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-300"
            />
          </>
        );
      case 3:
        return (
          <>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full p-3 border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-300"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-300"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-semibold text-brown-700 text-center">Seller Onboarding</h2>
        
        {/* Progress Steps */}
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full ${
                step >= num ? 'bg-brown-600' : 'bg-brown-200'
              }`}
            />
          ))}
        </div>

        {renderStep()}

        <div className="flex justify-between space-x-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="w-1/2 p-3 border border-brown-600 text-brown-600 rounded-xl hover:bg-brown-50 transition"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className={`${step > 1 ? 'w-1/2' : 'w-full'} bg-brown-600 text-white p-3 rounded-xl hover:bg-brown-700 transition`}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className={`${step > 1 ? 'w-1/2' : 'w-full'} bg-brown-600 text-white p-3 rounded-xl hover:bg-brown-700 transition`}
            >
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellerForm;
