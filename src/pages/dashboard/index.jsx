import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";
import Sidebar from "../../components/SideBar";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ events: 0, attendees: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:4050/api/v1/dashboard-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <main className="flex-1 p-15 md:ml-64">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">

          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full rounded-lg shadow-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
            <h3 className="text-xl font-semibold">Total Events</h3>
            <p className="text-4xl font-bold">{stats.events}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
            <h3 className="text-xl font-semibold">Total Attendees</h3>
            <p className="text-4xl font-bold">{stats.attendees}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
            <h3 className="text-xl font-semibold">Revenue</h3>
            <p className="text-4xl font-bold">${stats.revenue}</p>
          </div>
        </div>

        {/* Calendar Placeholder */}
        <div className="mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <p className="text-gray-500 dark:text-gray-400">(Calendar component goes here)</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
