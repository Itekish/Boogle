import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../../../../shared/hooks/useGetCurrentUser";

export const useUpdateEvent = (eventId, initialData = {}) => {
  const { user } = useGetCurrentUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state for pre-fetching
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialData);

  // Fetch event data when the hook mounts
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized: Please log in first.");
        }

        const response = await axios.get(`http://localhost:4050/api/v1/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response,"this is it");
        

        setFormData(response.data); // Pre-fill form with fetched event data
      } catch (fetchError) {
        console.error("Error fetching event data:", fetchError);
        setError(fetchError.response?.data?.error || "Failed to load event data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in first.");
      setIsUpdating(false);
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:4050/api/v1/events/${eventId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        alert("Event updated successfully!");
        navigate("/dashboard"); // Redirect after successful update
      }
    } catch (updateError) {
      console.error("Error updating event:", updateError);
      setError(updateError.response?.data?.error || "Something went wrong while updating.");
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    formData,
    handleChange,
    handleUpdate,
    isLoading,
    isUpdating,
    error,
  };
};
