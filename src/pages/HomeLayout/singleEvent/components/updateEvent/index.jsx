import { useUpdateEvent } from "./hooks/useUpdateEvent"
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const UpdateEventForm = () => {
  const { eventId } = useParams();
  const { formData, isLoading, isUpdating, handleChange, handleUpdate, error } = useUpdateEvent(eventId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-200">Loading event data...</p>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300 overflow-hidden">
      {/* Background Glow Effects */}
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 bg-[#ff4d6d] rounded-full opacity-20 blur-3xl"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-[#ff9f43] rounded-full opacity-20 blur-3xl"
      ></motion.div>
      <motion.div 
        animate={{ x: [0, 30, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#4d9fff] rounded-full opacity-20 blur-3xl"
      ></motion.div>
      <motion.div 
        animate={{ x: [0, -30, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff4dcf] rounded-full opacity-20 blur-3xl"
      ></motion.div>

      <div className="relative max-w-3xl w-full p-8 shadow-xl rounded-2xl backdrop-blur-md transition-colors duration-300 border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Update Event</h2>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] transition-colors duration-300"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description || ""}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] transition-colors duration-300"
            required
          ></textarea>

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] transition-colors duration-300"
            required
          />

          {/* Date & Time */}
          <input
            type="datetime-local"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] transition-colors duration-300"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff4d6d] to-[#ff9f43] text-white font-bold text-lg py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventForm;
