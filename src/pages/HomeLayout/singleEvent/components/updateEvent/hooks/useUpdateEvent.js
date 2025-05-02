import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useUpdateEvent = (eventId, initialData = {}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialData);
  const [categories] = useState([
    "Conference","Workshop","Concert","Meetup","Sports",
    "Festival","Networking","Seminar","Webinar","Exhibition","Other",
  ]);
  const [dirty, setDirty] = useState(false);
  const initialRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Unauthorized');
        const { data } = await axios.get(`http://localhost:4050/api/v1/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(data);
        initialRef.current = data;
      } catch (e) {
        toast.error(e.response?.data?.error || e.message);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (!initialRef.current) return;
    const clean = (obj) => ({ ...obj, image: undefined });
    setDirty(JSON.stringify(clean(formData)) !== JSON.stringify(clean(initialRef.current)));
  }, [formData]);

  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    setDirty(true);

    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    const ticketMatch = name.match(/^tickets\[(\d+)\]\.(\w+)$/);
    if (ticketMatch) {
      const [ , idx, key ] = ticketMatch;
      setFormData((prev) => {
        const tickets = [...(prev.tickets || [])];
        tickets[idx] = {
          ...tickets[idx],
          [key]: (key === 'price' || key === 'quantity') ? Number(value) : value
        };
        return { ...prev, tickets };
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addTicket = () => {
    setFormData((prev) => ({
      ...prev,
      tickets: [...(prev.tickets || []), { type: '', price: 0, quantity: 0 }],
    }));
    setDirty(true);
  };

  const removeTicket = (i) => {
    setFormData((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((_, idx) => idx !== i),
    }));
    setDirty(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      // Extract and normalize organizer, omit attendees entirely
      const { organizer, attendees, ...rest } = formData;
      const organizerId = typeof organizer === 'object' ? organizer._id : organizer;

      const payload = new FormData();
      // append other form fields
      Object.entries(rest).forEach(([key, val]) => {
        if (key === 'tickets') {
          payload.append(key, JSON.stringify(val));
        } else if (key === 'image' && val instanceof File) {
          payload.append(key, val);
        } else {
          payload.append(key, val);
        }
      });
      // append only organizer id
      if (organizerId) payload.append('organizer', organizerId);

      await axios.patch(
        `http://localhost:4050/api/v1/events/${eventId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Event updated successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    formData,
    categories,
    isLoading,
    isUpdating,
    error,
    handleChange,
    handleUpdate,
    addTicket,
    removeTicket,
    dirty,
  };
};
