import React from 'react';
import { LogOut, ShoppingCart, Package, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthCOntext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brown-700">
          Welcome, {user?.sellerProfile?.businessName || 'Farmer'}
        </h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-brown-600 text-white px-4 py-2 rounded-xl hover:bg-brown-700 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card icon={<ShoppingCart />} title="Orders" onClick={() => navigate('/dashboard/orders')} />
        <Card icon={<Package />} title="My Products" onClick={() => navigate('/dashboard/products')} />
        <Card icon={<BarChart />} title="Analytics" onClick={() => navigate('/dashboard/analytics')} />
      </div>
    </div>
  );
};

const Card = ({ icon, title, onClick }) => (
  <div 
    className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-4 text-brown-700 text-xl font-semibold">
      {icon}
      {title}
    </div>
    <p className="mt-2 text-sm text-brown-400">View {title.toLowerCase()} details</p>
  </div>
);

export default Dashboard;
