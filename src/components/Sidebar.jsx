import React from 'react'
import ThemeToggle from './ThemeToggle';
import { FiHome, FiCalendar, FiUsers, FiSettings} from "react-icons/fi";
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <aside className={`fixed inset-y-0 left-0 w-64 p-5 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:w-64`}>
        <button className="md:hidden absolute top-4 right-4" onClick={toggleSidebar}>
          ✖
        </button>
        <nav className="flex flex-col gap-4 mt-6">
          {/* <a href="#" > */}
            <Link to= "/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"><FiHome /> Back to home</Link>
          {/* </a> */}
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiCalendar /> My events
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiUsers /> Attendees
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiSettings /> Settings
          </a>
        </nav>
        <ThemeToggle />
      </aside>
    );
  };

export default Sidebar