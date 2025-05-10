import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSeller } from "../api/axiosInstance";
import { useAuth } from '../context/AuthContext';

const SellerForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const { setUser } = useAuth();
  // ...existing state code...
  
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");

  const categories = ["Vegetables", "Pulses", "Rice", "Wheat", "Jowar"];

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateStep1 = () => {
    if (!email || !username || !description || selectedCategories.length === 0) {
      setError("Please fill in all fields and select at least one category.");
      return false;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }

    if (description.split(' ').length < 5) {
      setError("Description should be at least one complete sentence (5 words minimum).");
      return false;
    }

    setError("");
    return true;
  };

  const validateStep2 = () => {
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your password.");
      return false;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError("");
    return true;
  };

    const handleNext = async () => {  // Add async keyword here
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      try {
        setIsLoading(true);
        const sellerData = {
          email,
          username,
          description,
          categories: selectedCategories,
          password
        };
        const response = await registerSeller(sellerData);
        if (response.data) {
          localStorage.setItem('token', response.data.accessToken);
          setUser(response.data.user); // Update user context
          setStep(3);
        }
      } catch (err) {
        setError(err.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
};

// ...existing code...
const handleDashboard = () => {
    navigate('/');
  };


  const stepTracker = [
    { id: 1, label: "Farm Info" },
    { id: 2, label: "Password" },
    { id: 3, label: "Dashboard" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5E1] p-8">
      {/* Step Tracker */}
      <div className="flex justify-center space-x-4 text-sm font-medium text-[#8B5E3C] mb-8">
        {stepTracker.map((s, i) => (
          <div key={s.id} className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${
                step === s.id
                  ? "bg-[#8B5E3C]"
                  : step > s.id
                  ? "bg-[#c2a287]"
                  : "border border-[#8B5E3C] text-[#8B5E3C]"
              }`}
            >
              {s.id}
            </div>
            <span className={step === s.id ? "text-[#8B5E3C]" : "text-gray-500"}>
              {s.label}
            </span>
            {i < stepTracker.length - 1 && <span>—</span>}
          </div>
        ))}
      </div>

      {/* Step Form */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {/* Step 1: Farm Info */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold text-[#8B5E3C] mb-6">Register Your Farm</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a valid email address</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3"
                />
                <p className="text-xs text-gray-500 mt-1">At least 3 characters</p>
              </div>
              <div>
                <textarea
                  placeholder="Short Description of Your Farm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3"
                  rows="3"
                />
                <p className="text-xs text-gray-500 mt-1">Write at least one complete sentence about your farm</p>
              </div>
              <div>
                <p className="mb-2 text-[#8B5E3C] font-medium">What are you selling? (Select at least one)</p>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => {
                    const selected = selectedCategories.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-4 py-2 rounded-md border transition-all duration-200 ${
                          selected
                            ? "bg-[#8B5E3C] text-white border-[#8B5E3C]"
                            : "bg-[#FFF5E1] text-[#8B5E3C] border-[#8B5E3C]"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="mt-6 bg-[#8B5E3C] text-white px-6 py-3 rounded-lg hover:bg-[#6e462b]"
            >
              Register & Continue
            </button>
          </>
        )}

        {/* Step 2: Password */}
       {/* Step 2: Password */}
{step === 2 && (
  <>
    <h2 className="text-xl font-semibold text-[#8B5E3C] mb-6">Create Your Password</h2>
    <div className="space-y-4">
      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Password must be at least 8 characters and include uppercase, lowercase, number, and special character
        </p>
      </div>
      <div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Re-enter your password to confirm</p>
      </div>
    </div>
    <button
      onClick={handleNext}
      disabled={isLoading}
      className="mt-6 bg-[#8B5E3C] text-white px-6 py-3 rounded-lg hover:bg-[#6e462b] disabled:opacity-50"
    >
      {isLoading ? "Processing..." : "Continue"}
    </button>
  </>
)}

        {/* Step 3: Dashboard */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold text-[#8B5E3C] mb-6">You're Almost Done!</h2>
            <p className="text-gray-600 mb-4">Click below to go to your onboarding dashboard.</p>
            <button
              onClick={handleDashboard}
              className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg hover:bg-[#6e462b]"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}



export default SellerForm;

