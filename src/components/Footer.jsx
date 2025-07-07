import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-violet-600 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        {/* Logo / Brand */}
        <Link to='/' className="text-xl font-bold flex items-center gap-2">
          <li className="fa-solid fa-truck-fast"></li>
          <span>Daily Cart</span>
        </Link>

        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} E-Cart. All rights reserved.</p>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
          <a href="#" className="hover:text-violet-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-violet-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-violet-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
