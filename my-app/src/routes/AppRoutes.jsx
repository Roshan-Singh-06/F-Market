import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BecomeSeller from '../pages/BecomeSeller';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/become-seller" element={<BecomeSeller />} />
      <Route 
        path="/admin-dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      {/* Add more dashboard routes here later */}
    </Routes>
  );
};

export default AppRoutes;



