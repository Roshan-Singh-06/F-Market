import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BecomeSeller from '../pages/BecomeSeller';
import SellerLogin from '../components/SellerLogin';
import Dashboard from '../components/Dashboard';
import FarmSellerOnboarding from '../components/Dashboard';
import AddProduct from '../components/AddProduct';
import Products from '../pages/products';
import PrivateRoute from '../components/PrivateRoute';
import FarmerProfile from '../components/FarmerProfile';
import Farmers from '../pages/Farmers';
import Profile from '../pages/profile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/become-seller" element={<BecomeSeller />} />
      <Route path="/seller-login" element={<SellerLogin />} />
      <Route path="/seller-registration" element={<FarmSellerOnboarding />} />
      <Route path="/products" element={<Products />} />
      <Route path="/farmers" element={<Farmers />} />

      {/* Private Routes */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/dashboard/add-product" 
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/dashboard/products" 
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/farmer-profile" element={
      <PrivateRoute>
      <FarmerProfile />
      </PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
    </Routes>
    
  );
};

export default AppRoutes;



