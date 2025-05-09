import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthCOntext';


const App = () => {
  return (
    <div className="font-sans">
       <AuthProvider>
      <Navbar />
      <AppRoutes />
      <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;

