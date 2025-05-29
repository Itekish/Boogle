// useBuyEvent.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useBuyEvent(eventId, user) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!eventId) return;
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:4050/api/v1/events/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvent(data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handlePurchase = async (ticketType) => {
    if (!user?._id) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:4050/api/v1/events/${eventId}/tickets/${ticketType}`,
        { userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Successfully purchased a ${ticketType} ticket`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Purchase failed:", err);
      toast.error(err.response?.data?.error || "Failed to purchase ticket");
    }
  };

  return { event, loading, error, handlePurchase };
}
