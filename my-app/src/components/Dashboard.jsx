import React from 'react';
import { LogOut, ShoppingCart, Package, BarChart ,Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';





const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
 const [activeUsers, setActiveUsers] = useState(0);
 
  useEffect(() => {
    // Fetch active users count from your backend
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/active-count');
        const data = await response.json();
        setActiveUsers(data.count);
      } catch (error) {
        console.error('Error fetching active users:', error);
      }
    };
    fetchActiveUsers();
  }, []);



  return (
    <div className="min-h-screen bg-[#FFF5E1] p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brown-700">
          Welcome, {user?.sellerProfile?.username|| 'Farmer'}
        </h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-brown-600 text-white px-4 py-2 rounded-xl hover:bg-brown-700 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          icon={<Users />} 
          title="Active Users" 
          value={activeUsers}
          onClick={() => {}} 
        />
        <Card 
          icon={<Plus />} 
          title="Add Product" 
          onClick={() => navigate('/dashboard/add-product')} 
        />
        <Card 
          icon={<Package />} 
          title="My Products" 
          onClick={() => navigate('/dashboard/products')} 
        />
      </div>
        

  

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card icon={<ShoppingCart />} title="Orders" onClick={() => navigate('/dashboard/orders')} />
        <Card icon={<Package />} title="My Products" onClick={() => navigate('/dashboard/products')} />
        <Card icon={<BarChart />} title="Analytics" onClick={() => navigate('/dashboard/analytics')} />
      </div>
    </div>
  );
};
const Card = ({ icon, title, value, onClick }) => (
  <div 
    className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer h-[160px] flex flex-col justify-between"
    onClick={onClick}
  >
    <div className="flex items-center gap-4 text-[#5C4033] text-xl font-semibold">
      {icon}
      {title}
    </div>
    <div>
      {value && <p className="text-2xl font-bold text-[#8B5E3C]">{value}</p>}
      <p className="text-sm text-[#8B5E3C]/60">
        {value ? `Total ${title.toLowerCase()}` : `Add new ${title.toLowerCase()}`}
      </p>
    </div>
  </div>
);


export default Dashboard;
