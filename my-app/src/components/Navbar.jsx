import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { BsBox, BsPerson, BsShop } from 'react-icons/bs';
import { FaCarrot } from 'react-icons/fa';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
 const { user, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await response.json();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
     // Check if user is logged in and fetch user data
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data from backend
      fetchUserData(token);
    }
  },[]);
   const handleDashboardClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/seller-login');
    } else {
      navigate('/seller-login');
    }
  };

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <nav className="bg-[#5C4033] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FaCarrot className="text-[#FFFDD0] text-3xl mr-2" />
            <span className="text-[#FFFDD0] text-xl font-bold">F-Market</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">            <NavLink to="/" icon={<AiOutlineHome />} text="Home" />
            <NavLink to="/products" icon={<BsBox />} text="Products" />
            <NavLink to="/farmers" icon={<FaCarrot />} text="Farmers" />
            <NavLink to="/about" icon={<IoInformationCircleOutline />} text="About" />
             {user?.isSeller ? (
          <button 
            onClick={handleDashboardClick}
            className="text-[#FFFDD0] hover:text-[#FFF8DC] transition-colors"
          >
            Admin Dashboard
          </button>
        ) : (
          <Link to="/become-seller" className="text-[#FFFDD0] hover:text-[#FFF8DC] transition-colors">
            Become a Seller
          </Link>
        )}
            

          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="text-[#FFFDD0] hover:text-[#FFF8DC]">
              <AiOutlineHeart className="text-2xl" />
            </Link>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-[#FFFDD0] hover:text-[#FFF8DC] focus:outline-none"
              >
                <BsPerson className="text-2xl" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Helper component for nav links
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center text-[#FFFDD0] hover:text-[#FFF8DC] transition-colors"
  >
    <span className="text-xl mr-1">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default Navbar;