import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";
import Sidebar from "../../components/SideBar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    createdEvents: [],
    attendingEvents: [],
    createdEventsLength: 0,
    attendingEventsLength: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4050/api/v1/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  const filteredCreated = stats.createdEvents.filter(evt =>
    evt.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAttending = stats.attendingEvents.filter(evt =>
    evt.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
   <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
  {/* Sidebar */}
  <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

  {/* Main Content Scrollable */}
  <div className="flex flex-col flex-1 h-full overflow-y-auto p-4 sm:p-6">
    {/* Mobile menu button */}
        <div className="md:hidden mb-4">
          <button
            className="text-3xl text-gray-900 dark:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
            <h3 className="text-lg sm:text-xl font-semibold">Created Events</h3>
            <p className="text-2xl sm:text-3xl font-bold">{stats.createdEventsLength}</p>
          </div>
          <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
            <h3 className="text-lg sm:text-xl font-semibold">Attending Events</h3>
            <p className="text-2xl sm:text-3xl font-bold">{stats.attendingEventsLength}</p>
          </div>
          <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
            <h3 className="text-lg sm:text-xl font-semibold">Total Events</h3>
            <p className="text-2xl sm:text-3xl font-bold">{stats.totalEvents}</p>
          </div>
        </div>

        {/* Created Events Accordion */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Your Created Events</h3>
          {filteredCreated.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No created events found.</p>
          ) : (
            <div className="space-y-3">
              {filteredCreated.map(event => (
                <details
                  key={event._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <summary className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                      More Info
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 animate-fade-in">
                    {event.tickets.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {event.tickets.map((ticket, idx) => (
                          <li key={idx}>
                            {ticket.type}: {ticket.sold} sold
                          </li>
                        ))}
                        <li className="mt-2 font-semibold">
                          Total Tickets Sold: {event.totalSold}
                        </li>
                        <li className="font-semibold">Total Revenue: ${event.revenue}</li>
                      </ul>
                    ) : (
                      <p>No ticket data available.</p>
                    )}
                    <Link
                      to={`/event/${event._id}`}
                      className="block mt-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Attending Events Accordion */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Events You are Attending</h3>
          {filteredAttending.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No attending events found.</p>
          ) : (
            <div className="space-y-3">
              {filteredAttending.map(event => (
                <details
                  key={event._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <summary className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                      More Info
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 animate-fade-in">
                    <p className="mb-2 font-semibold">
                      Ticket Purchased: <span className="font-normal">{event.userTicketType}</span>
                    </p>
                    <p className="mb-1">
                      Date:{" "}
                      <span className="font-medium">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="mb-4">
                      Countdown:{" "}
                      <span className="font-medium">
                        {Math.max(
                          0,
                          Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24))
                        )}{" "}
                        days
                      </span>
                    </p>
                    <Link
                      to={`/event/${event._id}`}
                      className="block text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
