import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FarmSellerOnboarding from '../components/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BecomeSeller from '../pages/BecomeSeller';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import SellerLogin from '../components/SellerLogin';
import AddProduct from '../components/AddProduct';
import Products from '../pages/products';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/become-seller" element={<BecomeSeller />} />
      <Route path="/seller-login" element={<SellerLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/seller-registration" element={<FarmSellerOnboarding />} />
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
          <AddProduct/>
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
      <Route path="/dashboard/products" element={<Products />} />
      <Route path="/products" element={<Products />} />
      {/* Add more dashboard routes here later */}
    </Routes>
  );
};

export default AppRoutes;



