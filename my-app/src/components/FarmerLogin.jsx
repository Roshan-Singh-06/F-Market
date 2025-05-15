import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // TODO: Replace with your API login logic
    console.log('Logging in with:', { username, password });

    // On success, navigate to farmer dashboard
    // navigate('/farmer/dashboard');
  };

  const goToRegister = () => {
    navigate('/farmer/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-brown">Farmer Login</h2>
        
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-sm text-brown">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm text-brown">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brown text-white py-2 rounded-lg hover:bg-brown-dark transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-brown">
          Not registered?{' '}
          <span onClick={goToRegister} className="text-blue-600 cursor-pointer underline">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default FarmerLogin;
