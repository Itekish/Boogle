import { useCreateEvent } from "./hooks/useCreateEvent";
import { motion } from "framer-motion";
import { useState } from "react";

const EventForm = () => {
  const { formData, categories, handleChange, handleSubmit, isLoading } =
    useCreateEvent();
  const [errorMessages, setErrorMessages] = useState([]);
  const addTicket = () => {
    handleChange({
      target: { name: "tickets", value: [...formData.tickets, { type: "", price: 0, quantity: 0 }] },
    });
  };

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

      {/* Form Card */}
      <div className="relative max-w-3xl w-full p-8 shadow-xl rounded-2xl backdrop-blur-md transition-colors duration-300 border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Create an Event
        </h2>
        {errorMessages.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errorMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await handleSubmit();
              alert("Event created successfully!");
            } catch (error) {
              if (error.response && error.response.data) {
                setErrorMessages(error.response.data.errors);
              } else {
                setErrorMessages(["Something went wrong."]);
              }
            }
          }}
          className="space-y-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
            required
          ></textarea>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
          >
            <option value="" disabled>
              Choose a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
            required
          />

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
            required
          />

          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
          />

          {formData.tickets.map((ticket, index) => (
            <div key={index} className="space-y-3">
              <input
                type="text"
                name={`tickets[${index}].type`}
                placeholder="Ticket Type"
                value={ticket.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
                required
              />
              <input
                type="number"
                name={`tickets[${index}].price`}
                placeholder="Ticket Price"
                value={ticket.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
                required
              />
              <input
                type="number"
                name={`tickets[${index}].quantity`}
                placeholder="Quantity"
                value={ticket.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTicket}
            className="w-full bg-blue-500 text-white font-bold text-lg py-3 rounded-xl shadow-md hover:scale-105"
          >
            Add Ticket
          </button>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-5 h-5 text-[#ff4d6d]"
            />
            <label className="text-gray-900 dark:text-white text-lg">
              Publish Event
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff4d6d] to-[#ff9f43] text-white font-bold text-lg py-3 rounded-xl shadow-md hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
