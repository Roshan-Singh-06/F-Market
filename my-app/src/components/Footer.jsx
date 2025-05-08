import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#5C4033] text-[#f5f0e6]">
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        <div>
          <h2 className="text-xl font-bold mb-3 text-[#fff5e6]">Farm Fresh</h2>
          <p>Bringing fresh, organic produce from local farms to your table.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-[#fff5e6]">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-[#ffe4bc]">Home</a></li>
            <li><a href="#" className="hover:text-[#ffe4bc]">Products</a></li>
            <li><a href="#" className="hover:text-[#ffe4bc]">Farmers</a></li>
            <li><a href="#" className="hover:text-[#ffe4bc]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-[#fff5e6]">Customer Service</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-[#ffe4bc]">FAQs</a></li>
            <li><a href="#" className="hover:text-[#ffe4bc]">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-[#ffe4bc]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#ffe4bc]">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-[#fff5e6]">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-[#ffe4bc]"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#ffe4bc]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#ffe4bc]"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs border-t border-[#4d321e] bg-[#2b1810] text-[#f5f0e6]">
        © {new Date().getFullYear()} Farm Fresh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
