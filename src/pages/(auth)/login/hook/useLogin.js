import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [erorrMessage, seterorrMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    console.log(formData);

    try {
      const url = "http://localhost:4050/api/v1/users/login";
      const response = await axios.post(url, formData);
      console.log(response, "response");
      localStorage.setItem("token", response.data.token);

      if (response.data) {
        alert("Login successful!");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      seterorrMessage(error.response.data.error);
      alert("An error occurred.");
    }
  };

  return { formData, erorrMessage, handleChange, handleSubmit };
};
