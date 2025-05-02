import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../../../../shared/hooks/useGetCurrentUser";

export const useCreateEvent = () => {
  const { user } = useGetCurrentUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
   image: null, // Expecting a file input
    isPublished: false,
    tickets: [{ type: "", price: 0, quantity: 0 }], // Default ticket structure
  });

  const categories = [
    "Conference",
    "Workshop",
    "Concert",
    "Meetup",
    "Sports",
    "Festival",
    "Networking",
    "Seminar",
    "Webinar",
    "Exhibition",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Handle ticket updates dynamically
    if (name.startsWith("tickets[")) {
      const match = name.match(/\[(\d+)\]\.(\w+)/);
      if (match) {
        const index = Number(match[1]);
        const field = match[2];

        setFormData((prev) => {
          const updatedTickets = [...prev.tickets];
          updatedTickets[index][field] = field === "price" || field === "quantity" ? Number(value) : value;
          return { ...prev, tickets: updatedTickets };
        });
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const addTicket = () => {
    setFormData((prev) => ({
      ...prev,
      tickets: [...prev.tickets, { type: "", price: 0, quantity: 0 }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    if (!formData.category) {
      setError("Please select a category.");
      setIsLoading(false);
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in first.");
      setIsLoading(false);
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("date", new Date(formData.date).toISOString());
    formDataToSend.append("organizer", user._id);
    formDataToSend.append("isPublished", formData.isPublished);
  
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    } else {
      console.error("No Cover Image Selected!");
    }
  
    formDataToSend.append("tickets", JSON.stringify(formData.tickets));
  
    try {
      const url = "http://localhost:4050/api/v1/events/";
      const response = await axios.post(url, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data) {
        alert("Event created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.error || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  

  return { formData, categories, handleChange, handleSubmit, isLoading, error, addTicket };
};
