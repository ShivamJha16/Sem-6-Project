import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Grid Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Copyright Text */}
          <p className="text-gray-400">
            © {new Date().getFullYear()} EventPlanner. All rights reserved.
          </p>

          {/* Created By */}
          <p className="text-gray-400">
            Created by <span className="text-yellow-500 font-semibold">EventO</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
