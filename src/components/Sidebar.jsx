import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiClipboard, FiCheckCircle } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const linkVariants = {
  hover: { scale: 1.05, opacity: 1 },
  tap: { scale: 0.95 }
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const scrollToSection = (id) => {
    if (pathname !== '/dashboard') {
      navigate('/dashboard');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    toggleSidebar && toggleSidebar();
  };

  const links = [
    { label: 'Back to Home', icon: <FiHome />, onClick: () => navigate('/'), to: '/' },
    { label: 'Create Event', icon: <FiPlusCircle />, onClick: () => navigate('/'), to: '/create-event' },
    { label: 'Created Events', icon: <FiClipboard />, onClick: () => scrollToSection('created-events') },
    { label: 'Attending Events', icon: <FiCheckCircle />, onClick: () => scrollToSection('attending-events') }
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 w-64 p-6 bg-gradient-to-b from-pink-500 via-yellow-400 to-blue-400 text-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:w-64`}>
      <button className="md:hidden absolute top-5 right-5 text-white text-2xl" onClick={toggleSidebar}>✖</button>
      <nav className="flex flex-col gap-4 mt-10">
        {links.map((item, idx) => {
          const isActive = item.to ? pathname === item.to : false;
          const baseClasses = 'flex items-center gap-4 p-3 rounded-xl transition-colors duration-200 group';
          const bgClasses = isActive ? 'bg-white bg-opacity-25' : 'hover:bg-white hover:bg-opacity-20';
          return (
            <motion.div key={idx} variants={linkVariants} whileHover="hover" whileTap="tap" className={baseClasses + ' ' + bgClasses}>
              {item.to ? (
                <Link to={item.to} onClick={item.onClick} className="flex items-center gap-4 w-full">
                  <span className="text-xl text-white group-hover:text-black transition-colors duration-200">{item.icon}</span>
                  <span className="font-semibold text-white group-hover:text-black transition-colors duration-200">{item.label}</span>
                </Link>
              ) : (
                <button onClick={item.onClick} className="flex items-center gap-4 w-full text-left">
                  <span className="text-xl text-white group-hover:text-black transition-colors duration-200">{item.icon}</span>
                  <span className="font-semibold text-white group-hover:text-black transition-colors duration-200">{item.label}</span>
                </button>
              )}
            </motion.div>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 border-t border-white border-opacity-30">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
