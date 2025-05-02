import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { motion } from "framer-motion";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:4050/api/v1/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    [event.title, event.category, event.location, event.description]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#282c36] via-[#1e222a] to-[#12141c] dark:from-gray-900 dark:to-gray-800 px-6 py-10 transition-colors duration-300">
      {/* 🔥 Animated Header */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl sm:text-6xl font-extrabold text-gray-100 dark:text-white text-center drop-shadow-md mt-6 mb-10"
      >
        Discover & Join Events 🎉
      </motion.h1>

      {/* 🔥 Neon Search Input */}
      <motion.input
        type="text"
        placeholder="Search for events..."
        className="w-full max-w-md px-6 py-3 border-none rounded-full shadow-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 text-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#ff4d6d] transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        whileFocus={{ scale: 1.05, boxShadow: "0px 0px 20px #ff4d6d" }}
      />

      {loading ? (
        <Spinner />
      ) : filteredEvents.length === 0 ? (
        <p className="text-center text-gray-100 dark:text-white text-lg mt-6">No events found 😔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4 mt-10">
          {filteredEvents.map((event) => (
            <motion.div
              key={event._id}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-white/30 dark:bg-gray-900/60 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-gray-500 dark:border-gray-700 transition-all duration-300 hover:shadow-neon"
            >
              {/* 🔥 Event Image */}
              {event.image && (
                <Link to={`/event/${event._id}`}>
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-52 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                  />
                </Link>
              )}

              {/* 🔥 Event Title */}
              <h2 className="text-2xl font-bold text-gray-100 dark:text-white mt-4 truncate">
                {event.title}
              </h2>

              {/* 🔥 Description */}
              <p className="text-gray-300 dark:text-gray-300 mt-2 line-clamp-3">
                {event.description}
              </p>

              {/* 🔥 Category & Date */}
              <div className="flex justify-between items-center mt-4 text-sm font-medium text-gray-300 dark:text-gray-300">
                <span className="bg-gray-700 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {event.category}
                </span>
                <span>{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}</span>
              </div>

              {/* 🔥 Location, Attendees & Explore Button */}
              <div className="flex justify-between items-center mt-6 text-sm font-medium text-gray-300 dark:text-gray-300">
                <span>📍 {event.location}</span>
                <span>👥 {event.attendees?.length || 0} Attendees</span>
              </div>
              
              <div className="flex justify-end mt-4">
                <Link
                  to={`/event/${event._id}`}
                  className="bg-[#ff4d6d] hover:bg-[#ff3355] text-white font-semibold px-4 py-2 rounded-lg shadow-neon transition-all duration-300 transform hover:scale-110"
                >
                  Explore →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
