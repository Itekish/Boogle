import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { motion } from "framer-motion";
import { useGetCurrentUser } from "../../../shared/hooks/useGetCurrentUser";

const SingleEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isLoading: userLoading } = useGetCurrentUser(); // Get the logged-in user

  useEffect(() => {
    if (!eventId) {
      setError("Invalid event ID");
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4050/api/v1/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4050/api/v1/events/${eventId}`);
      alert("Event deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event");
    }
  };

  if (loading || userLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  if (!event)
    return <p className="text-center text-gray-500 dark:text-gray-400">Event not found</p>;

  // Check if the logged-in user is the organizer
  const isOrganizer = user && user._id === event.organizer?._id;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-10 transition-all duration-300">
      {event.coverImage && (
        <motion.img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-4 leading-tight break-all">
        {event.title}
      </h1>

      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
        Organized by {event.organizer?.firstName} {event.organizer?.lastName} • {" "}
        {event.date ? new Date(event.date).toLocaleDateString() : "Date not available"}
      </p>

      <div className="mt-4">
        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded">
          {event.category || "Uncategorized"}
        </span>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg break-all">
        {event.description || "No description available."}
      </p>

      {event.tags && event.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-sm rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
        <span>👍 {event.likes || 0} Likes</span>
      </div>

      {/* Edit & Delete or Buy Ticket Buttons */}
      <div className="mt-6 flex gap-4">
        {isOrganizer ? (
          <>
            <button
              onClick={() => navigate(`/event/${eventId}/edit`)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              Edit Event
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              Delete Event
            </button>
          </>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            Buy Ticket
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleEvent;
