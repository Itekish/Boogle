import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { motion } from "framer-motion";
import { useGetCurrentUser } from "../../../shared/hooks/useGetCurrentUser";
import { Link } from "react-router-dom";

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
      await axios.delete(`http://localhost:4050/api/v1/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is passed
        },
      });
      alert("Event deleted successfully");
      navigate("/"); // Navigate to the homepage after deletion
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
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl mt-10 transition-all duration-300 space-y-6">
      {event.image && (
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full max-h-[500px] object-contain rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}

      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-snug break-words">
          {event.title}
        </h1>

        <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
          <span className="font-semibold text-gray-900 dark:text-white">
            {event.organizer?.firstName} {event.organizer?.lastName}
          </span>{" "}
          • {event.date ? new Date(event.date).toLocaleDateString() : "Date not available"}
        </p>

        <div>
          <span className="inline-block px-4 py-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm font-bold rounded-full">
            {event.category || "Uncategorized"}
          </span>
        </div>
      </div>

      <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed break-words">
        {event.description || "No description available."}
      </p>

      {event.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-sm font-semibold rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        {isOrganizer ? (
          <>
            <button
              onClick={() => navigate(`/event/${eventId}/edit`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-2 px-5 rounded-lg shadow-md transition hover:scale-105"
            >
              Edit Event
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-base py-2 px-5 rounded-lg shadow-md transition hover:scale-105"
            >
              Delete Event
            </button>
          </>
        ) : (
          <Link
            to={`/event/${event._id}/buyTicket`}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold text-base py-2 px-5 rounded-lg shadow-md transition hover:scale-105"
          >
            Buy Ticket
          </Link>

        )}
      </div>
    </div>
  );
};

export default SingleEvent;
