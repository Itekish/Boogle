import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const url = "http://localhost:4050/api/v1/users/register";
      const response = await axios.post(url, formData);
      localStorage.setItem("token", response.data.token);

      if (response.data) {
        alert("Registration successful!");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.response?.data?.error || "An error occurred.");
      alert("An error occurred.");
    }
  };

  return { formData, errorMessage, handleChange, handleSubmit };
};
