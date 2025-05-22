import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarrot } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  // Add useEffect to navigate after user is set
  useEffect(() => {
    if (user && user.isSeller) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/seller-login', {
        email,
        password
      });
      console.log('Login response:', response.data); // Debug log

      if (response.data && response.data.data) {  // Changed from response.data.user
        const { user, accessToken } = response.data.data;  // Extract from data property

        if (user.isSeller) {
          localStorage.setItem('token', accessToken);
          setUser(user); // navigation will happen in useEffect
        } else {
          setError('Access denied. Only sellers can login here.');
        }
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <FaCarrot className="text-[#8B5E3C] text-4xl mr-2" />
            <span className="text-[#8B5E3C] text-3xl font-bold">F-Market</span>
          </div>
          <h2 className="text-2xl font-semibold text-[#5C4033] mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-[#5C4033]" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#5C4033]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8B5E3C] text-white py-3 rounded-lg hover:bg-[#6e462b] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;