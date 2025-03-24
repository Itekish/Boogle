import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../../../../shared/hooks/useGetCurrentUser";

export const useCreateEvent = () => {
  const { user } = useGetCurrentUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // To manage error messages
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    coverImage: "",
    isPublished: false,
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation: Ensure a category is selected
    if (!formData.category) {
      setError("Please select a category for the event.");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in first.");
      setIsLoading(false);
      return;
    }

    const eventData = {
      ...formData,
      organizer: user._id, // Matches backend organizer field
      date: new Date(formData.date).toISOString(),
    };

    try {
      const url = "http://localhost:4050/api/v1/events/";
      const response = await axios.post(url, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  return { formData, categories, handleChange, handleSubmit, isLoading, error };
};
