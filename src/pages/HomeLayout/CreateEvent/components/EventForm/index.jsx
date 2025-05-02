import { useCreateEvent } from "./hooks/useCreateEvent";
import { motion } from "framer-motion";
import { useState } from "react";

const EventForm = () => {
  const { formData, categories, handleChange, handleSubmit, isLoading, addTicket, error } =
    useCreateEvent();
  const [errorMessages, setErrorMessages] = useState([]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300 overflow-hidden">
      {/* Background Effects */}
      <motion.div className="absolute top-10 left-10 w-72 h-72 bg-[#ff4d6d] rounded-full opacity-20 blur-3xl" />
      <motion.div className="absolute bottom-10 right-10 w-80 h-80 bg-[#ff9f43] rounded-full opacity-20 blur-3xl" />

      {/* Form Card */}
      <div className="relative max-w-3xl w-full p-8 shadow-xl rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Create an Event
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await handleSubmit(e);
            } catch (error) {
              setErrorMessages(["Something went wrong."]);
            }
          }}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Choose a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-3 border rounded-lg"
          />

          {/* Ticket Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Tickets</h3>
            {formData.tickets.map((ticket, index) => (
              <div key={index} className="flex flex-col space-y-3 border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <input
                  type="text"
                  name={`tickets[${index}].type`}
                  placeholder="Type (e.g., VIP, General)"
                  value={ticket.type}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="number"
                  name={`tickets[${index}].price`}
                  placeholder="Price"
                  value={ticket.price}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="number"
                  name={`tickets[${index}].quantity`}
                  placeholder="Quantity"
                  value={ticket.quantity}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTicket}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Ticket
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 transition"
            }`}
          >
            {isLoading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
